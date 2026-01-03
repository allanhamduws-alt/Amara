# Praxis Amara - Internistische Hausarztpraxis

Moderne Website für die internistische Hausarztpraxis Amara in Hamburg-Eidelstedt.

## Features

- Mehrsprachig (Deutsch/Englisch)
- Online-Terminbuchung mit E-Mail-Bestätigung
- Admin-Dashboard zur Terminverwaltung
- Responsive Design
- SEO-optimiert

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Datenbank:** PostgreSQL
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **i18n:** next-intl
- **E-Mail:** Nodemailer

## Entwicklung

### Voraussetzungen

- Node.js 20+
- PostgreSQL
- npm

### Installation

```bash
# Dependencies installieren
npm install

# Umgebungsvariablen einrichten
cp .env.example .env
# .env Datei anpassen

# Datenbank migrieren
npm run db:push

# Admin-User erstellen
npm run db:seed

# Entwicklungsserver starten
npm run dev
```

### Umgebungsvariablen

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@praxis.de"
```

## Deployment

### Mit Docker

```bash
docker-compose up -d
```

### Mit Coolify

1. Repository in Coolify verbinden
2. Build Command: `npm run build`
3. Start Command: `npm start`
4. Umgebungsvariablen setzen
5. PostgreSQL-Datenbank hinzufügen

## Projektstruktur

```
├── app/
│   ├── [locale]/          # Öffentliche Seiten (i18n)
│   ├── admin/             # Admin-Bereich
│   └── api/               # API-Routen
├── components/
│   ├── ui/                # shadcn/ui Komponenten
│   ├── layout/            # Header, Footer
│   ├── home/              # Startseite
│   ├── booking/           # Terminbuchung
│   └── admin/             # Admin-Komponenten
├── lib/                   # Utilities
├── messages/              # Übersetzungen
├── prisma/                # Datenbankschema
└── public/                # Statische Dateien
```

## Seiten

| Route | Beschreibung |
|-------|-------------|
| `/` | Startseite |
| `/leistungen` | Alle Leistungen |
| `/team` | Ärzte & Personal |
| `/ueber-uns` | Über die Praxis |
| `/aktuelles` | News |
| `/kontakt` | Kontaktformular |
| `/termin` | Online-Terminbuchung |
| `/admin` | Admin-Login |
| `/admin/dashboard` | Terminverwaltung |

## Lizenz

Privat - Alle Rechte vorbehalten
