"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Eye, EyeOff } from "lucide-react";

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

interface NewsEditorProps {
  post: NewsPost | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewsEditor({ post, open, onClose, onSuccess }: NewsEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titleDe: "",
    titleEn: "",
    contentDe: "",
    contentEn: "",
    slug: "",
    published: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        titleDe: post.titleDe,
        titleEn: post.titleEn,
        contentDe: post.contentDe,
        contentEn: post.contentEn,
        slug: post.slug,
        published: post.published,
      });
    } else {
      setFormData({
        titleDe: "",
        titleEn: "",
        contentDe: "",
        contentEn: "",
        slug: "",
        published: false,
      });
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[äÄ]/g, "ae")
      .replace(/[öÖ]/g, "oe")
      .replace(/[üÜ]/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      titleDe: title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titleDe || !formData.contentDe || !formData.slug) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = post ? `/api/admin/news/${post.id}` : "/api/admin/news";
      const method = post ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(post ? "Beitrag aktualisiert" : "Beitrag erstellt");
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.error || "Fehler beim Speichern");
      }
    } catch {
      toast.error("Fehler beim Speichern");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post ? "Beitrag bearbeiten" : "Neuen Beitrag erstellen"}
          </DialogTitle>
          <DialogDescription>
            Erstellen oder bearbeiten Sie einen News-Beitrag in Deutsch und Englisch.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="slug">URL-Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="mein-beitrag"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published" className="flex items-center gap-2">
                {formData.published ? (
                  <>
                    <Eye className="h-4 w-4 text-green-600" />
                    Veröffentlicht
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    Entwurf
                  </>
                )}
              </Label>
            </div>
          </div>

          <Tabs defaultValue="de" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="de">🇩🇪 Deutsch</TabsTrigger>
              <TabsTrigger value="en">🇬🇧 Englisch</TabsTrigger>
            </TabsList>

            <TabsContent value="de" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="titleDe">Titel (Deutsch) *</Label>
                <Input
                  id="titleDe"
                  value={formData.titleDe}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Titel des Beitrags"
                />
              </div>
              <div>
                <Label htmlFor="contentDe">Inhalt (Deutsch) *</Label>
                <Textarea
                  id="contentDe"
                  value={formData.contentDe}
                  onChange={(e) => setFormData({ ...formData, contentDe: e.target.value })}
                  placeholder="Inhalt des Beitrags..."
                  rows={8}
                />
              </div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="titleEn">Titel (Englisch)</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="Title of the post"
                />
              </div>
              <div>
                <Label htmlFor="contentEn">Inhalt (Englisch)</Label>
                <Textarea
                  id="contentEn"
                  value={formData.contentEn}
                  onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                  placeholder="Content of the post..."
                  rows={8}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Wird gespeichert..." : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

