"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/layout";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle,
  LogOut,
  RefreshCw,
  Mail,
  Phone,
  Newspaper,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import CreateAppointmentDialog from "./CreateAppointmentDialog";
import BlockSlotsDialog from "./BlockSlotsDialog";
import NewsEditor from "./NewsEditor";

interface Appointment {
  id: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

interface DashboardStats {
  todayAppointments: number;
  pendingAppointments: number;
  weekAppointments: number;
  totalPatients: number;
}

interface NewsPost {
  id: string;
  titleDe: string;
  titleEn: string;
  contentDe: string;
  contentEn: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function DashboardContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // News state
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
    router.refresh();
  };

  const fetchAppointments = async (date: Date) => {
    try {
      const response = await fetch(
        `/api/admin/appointments?date=${format(date, "yyyy-MM-dd")}`
      );
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
    } catch {
      toast.error("Fehler beim Laden der Termine");
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchNews = async () => {
    setIsNewsLoading(true);
    try {
      const response = await fetch("/api/admin/news");
      if (response.ok) {
        const data = await response.json();
        setNewsPosts(data.posts);
      }
    } catch {
      toast.error("Fehler beim Laden der News");
    } finally {
      setIsNewsLoading(false);
    }
  };

  const fetchMessages = async () => {
    setIsMessagesLoading(true);
    try {
      const response = await fetch("/api/admin/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch {
      toast.error("Fehler beim Laden der Nachrichten");
    } finally {
      setIsMessagesLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAppointments(selectedDate), fetchStats()]);
      setIsLoading(false);
    };
    loadData();
  }, [selectedDate]);

  useEffect(() => {
    if (activeTab === "news" && newsPosts.length === 0) {
      fetchNews();
    } else if (activeTab === "messages" && messages.length === 0) {
      fetchMessages();
    }
  }, [activeTab, newsPosts.length, messages.length]);

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success("Status aktualisiert");
        fetchAppointments(selectedDate);
        fetchStats();
      } else {
        toast.error("Fehler beim Aktualisieren");
      }
    } catch {
      toast.error("Fehler beim Aktualisieren");
    }
  };

  const deleteNewsPost = async (id: string) => {
    if (!confirm("Möchten Sie diesen Beitrag wirklich löschen?")) return;
    
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Beitrag gelöscht");
        fetchNews();
      } else {
        toast.error("Fehler beim Löschen");
      }
    } catch {
      toast.error("Fehler beim Löschen");
    }
  };

  const toggleMessageRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });

      if (response.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, read } : m));
      }
    } catch {
      toast.error("Fehler beim Aktualisieren");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Möchten Sie diese Nachricht wirklich löschen?")) return;
    
    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Nachricht gelöscht");
        setMessages(messages.filter(m => m.id !== id));
      } else {
        toast.error("Fehler beim Löschen");
      }
    } catch {
      toast.error("Fehler beim Löschen");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary">Ausstehend</Badge>;
      case "CONFIRMED":
        return <Badge className="bg-green-500">Bestätigt</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Storniert</Badge>;
      case "COMPLETED":
        return <Badge className="bg-blue-500">Abgeschlossen</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Praxisverwaltung</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Heute</CardDescription>
              <CardTitle className="text-3xl">{stats?.todayAppointments || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Termine
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ausstehend</CardDescription>
              <CardTitle className="text-3xl">{stats?.pendingAppointments || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Zu bestätigen
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Diese Woche</CardDescription>
              <CardTitle className="text-3xl">{stats?.weekAppointments || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-1" />
                Termine
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Patienten</CardDescription>
              <CardTitle className="text-3xl">{stats?.totalPatients || 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                Gesamt
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="appointments" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Termine</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2 relative">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Nachrichten</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Kalender
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    locale={de}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Appointments Table */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>
                        Termine am {format(selectedDate, "d. MMMM yyyy", { locale: de })}
                      </CardTitle>
                      <CardDescription>
                        {appointments.length} Termine gefunden
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <CreateAppointmentDialog 
                        onSuccess={() => {
                          fetchAppointments(selectedDate);
                          fetchStats();
                        }} 
                      />
                      <BlockSlotsDialog onSuccess={() => fetchAppointments(selectedDate)} />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => fetchAppointments(selectedDate)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Lade Termine...
                    </div>
                  ) : appointments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Zeit</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Kontakt</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aktion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              {appointment.timeSlot}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{appointment.patientName}</p>
                                {appointment.reason && (
                                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                    {appointment.reason}
                                  </p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <a
                                  href={`mailto:${appointment.patientEmail}`}
                                  className="flex items-center text-xs text-muted-foreground hover:text-primary"
                                >
                                  <Mail className="h-3 w-3 mr-1" />
                                  {appointment.patientEmail}
                                </a>
                                <a
                                  href={`tel:${appointment.patientPhone}`}
                                  className="flex items-center text-xs text-muted-foreground hover:text-primary"
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  {appointment.patientPhone}
                                </a>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                            <TableCell>
                              <Select
                                value={appointment.status}
                                onValueChange={(value) =>
                                  updateAppointmentStatus(appointment.id, value)
                                }
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PENDING">Ausstehend</SelectItem>
                                  <SelectItem value="CONFIRMED">Bestätigt</SelectItem>
                                  <SelectItem value="COMPLETED">Abgeschlossen</SelectItem>
                                  <SelectItem value="CANCELLED">Storniert</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Keine Termine an diesem Tag
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Newspaper className="h-5 w-5" />
                      News-Beiträge
                    </CardTitle>
                    <CardDescription>
                      Verwalten Sie Ihre News und Aktuelles
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => { setEditingPost(null); setIsEditorOpen(true); }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Neuer Beitrag
                    </Button>
                    <Button variant="outline" size="icon" onClick={fetchNews}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isNewsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Lade Beiträge...
                  </div>
                ) : newsPosts.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Titel</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Erstellt</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newsPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            {post.published ? (
                              <Badge className="bg-green-500">
                                <Eye className="h-3 w-3 mr-1" />
                                Veröffentlicht
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Entwurf
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{post.titleDe}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            /{post.slug}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {format(new Date(post.createdAt), "dd.MM.yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => { setEditingPost(post); setIsEditorOpen(true); }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => deleteNewsPost(post.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Keine News-Beiträge vorhanden
                  </div>
                )}
              </CardContent>
            </Card>
            
            <NewsEditor
              post={editingPost}
              open={isEditorOpen}
              onClose={() => { setIsEditorOpen(false); setEditingPost(null); }}
              onSuccess={fetchNews}
            />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Kontaktanfragen
                    </CardTitle>
                    <CardDescription>
                      {unreadCount > 0 
                        ? `${unreadCount} ungelesene Nachricht${unreadCount > 1 ? 'en' : ''}`
                        : 'Alle Nachrichten gelesen'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon" onClick={fetchMessages}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isMessagesLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Lade Nachrichten...
                  </div>
                ) : messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card 
                        key={message.id} 
                        className={`${!message.read ? 'border-primary bg-primary/5' : ''}`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {!message.read && (
                                  <span className="w-2 h-2 bg-primary rounded-full" />
                                )}
                                {message.name}
                              </CardTitle>
                              <CardDescription className="flex flex-col sm:flex-row sm:gap-4">
                                <a href={`mailto:${message.email}`} className="hover:text-primary">
                                  {message.email}
                                </a>
                                {message.phone && (
                                  <a href={`tel:${message.phone}`} className="hover:text-primary">
                                    {message.phone}
                                  </a>
                                )}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(message.createdAt), "dd.MM.yyyy HH:mm")}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleMessageRead(message.id, !message.read)}
                                title={message.read ? "Als ungelesen markieren" : "Als gelesen markieren"}
                              >
                                {message.read ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteMessage(message.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Keine Kontaktanfragen vorhanden
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
