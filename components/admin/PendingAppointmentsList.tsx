"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CheckCircle, XCircle, Mail, Phone, RefreshCw, Calendar, Clock, PartyPopper } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

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

interface PendingAppointmentsListProps {
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export default function PendingAppointmentsList({
    open,
    onClose,
    onUpdate,
}: PendingAppointmentsListProps) {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);

    const fetchPendingAppointments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/appointments?status=PENDING");
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            }
        } catch {
            toast.error("Fehler beim Laden der ausstehenden Termine");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchPendingAppointments();
        }
    }, [open]);

    const updateStatus = async (id: string, status: "CONFIRMED" | "CANCELLED") => {
        try {
            const response = await fetch(`/api/admin/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                toast.success(status === "CONFIRMED" ? "Termin bestätigt" : "Termin storniert");
                // Remove from local list immediately
                setAppointments(prev => prev.filter(a => a.id !== id));
                // Update parent stats
                onUpdate();
            } else {
                toast.error("Fehler beim Aktualisieren");
            }
        } catch {
            toast.error("Fehler beim Aktualisieren");
        }
    };

    const handleConfirm = (appointment: Appointment) => {
        updateStatus(appointment.id, "CONFIRMED");
    };

    const handleCancelClick = (appointment: Appointment) => {
        setAppointmentToCancel(appointment);
        setCancelDialogOpen(true);
    };

    const handleCancelConfirm = () => {
        if (appointmentToCancel) {
            updateStatus(appointmentToCancel.id, "CANCELLED");
            setCancelDialogOpen(false);
            setAppointmentToCancel(null);
        }
    };

    return (
        <>
            <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
                <SheetContent className="sm:max-w-2xl w-full overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Ausstehende Termine
                        </SheetTitle>
                        <SheetDescription className="flex items-center justify-between">
                            <span>{appointments.length} Termine zu bestätigen</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={fetchPendingAppointments}
                                disabled={isLoading}
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                Aktualisieren
                            </Button>
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6">
                        {isLoading ? (
                            <div className="text-center py-12 text-muted-foreground">
                                Lade ausstehende Termine...
                            </div>
                        ) : appointments.length > 0 ? (
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-2">
                                                {/* Date & Time */}
                                                <div className="flex items-center gap-3">
                                                    <Badge variant="outline" className="gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {format(new Date(appointment.date), "EEE, d. MMM", { locale: de })}
                                                    </Badge>
                                                    <Badge variant="secondary" className="gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {appointment.timeSlot} Uhr
                                                    </Badge>
                                                </div>

                                                {/* Patient Info */}
                                                <div>
                                                    <p className="font-medium text-lg">{appointment.patientName}</p>
                                                    {appointment.reason && (
                                                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                                                    )}
                                                </div>

                                                {/* Contact */}
                                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                    {appointment.patientEmail && (
                                                        <a
                                                            href={`mailto:${appointment.patientEmail}`}
                                                            className="flex items-center gap-1 hover:text-primary"
                                                        >
                                                            <Mail className="h-3 w-3" />
                                                            {appointment.patientEmail}
                                                        </a>
                                                    )}
                                                    <a
                                                        href={`tel:${appointment.patientPhone}`}
                                                        className="flex items-center gap-1 hover:text-primary"
                                                    >
                                                        <Phone className="h-3 w-3" />
                                                        {appointment.patientPhone}
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 sm:flex-col">
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 flex-1"
                                                    onClick={() => handleConfirm(appointment)}
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Bestätigen
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="flex-1"
                                                    onClick={() => handleCancelClick(appointment)}
                                                >
                                                    <XCircle className="h-4 w-4 mr-2" />
                                                    Ablehnen
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <PartyPopper className="h-12 w-12 mx-auto text-green-500 mb-4" />
                                <p className="text-lg font-medium text-foreground">Alles erledigt!</p>
                                <p className="text-muted-foreground">
                                    Keine ausstehenden Termine zu bestätigen
                                </p>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Termin ablehnen?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Möchten Sie den Termin von <strong>{appointmentToCancel?.patientName}</strong> am{" "}
                            <strong>
                                {appointmentToCancel &&
                                    format(new Date(appointmentToCancel.date), "d. MMMM yyyy", { locale: de })}
                            </strong>{" "}
                            um <strong>{appointmentToCancel?.timeSlot} Uhr</strong> wirklich ablehnen?
                            <br /><br />
                            Der Patient wird per E-Mail benachrichtigt.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancelConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Termin ablehnen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
