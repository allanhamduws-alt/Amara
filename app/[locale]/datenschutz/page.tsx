import { setRequestLocale } from "next-intl/server";

interface DatenschutzPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata = {
  title: "Datenschutzerklärung",
};

export default async function DatenschutzPage({ params }: DatenschutzPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-serif text-foreground mb-8">Datenschutzerklärung</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">Allgemeine Hinweise</h3>
            <p className="text-muted-foreground mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">Datenerfassung auf dieser Website</h3>
            <p className="text-muted-foreground mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
              Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann 
              es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer 
              Terminbuchung angeben.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              2. Verantwortliche Stelle
            </h2>
            <p className="text-muted-foreground">
              Jwan Amara<br />
              Eidelstedter Platz 6a<br />
              22523 Hamburg<br /><br />
              Telefon: 040 576061<br />
              E-Mail: int.hausarzt.eidelstedt@gmx.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="text-xl font-semibold text-foreground mb-2">Kontaktformular</h3>
            <p className="text-muted-foreground mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
              wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">Terminbuchung</h3>
            <p className="text-muted-foreground mb-4">
              Bei der Online-Terminbuchung werden folgende Daten erhoben: Name, E-Mail-Adresse, 
              Telefonnummer und ggf. der Grund Ihres Besuchs. Diese Daten werden ausschließlich zur 
              Terminverwaltung und Kontaktaufnahme verwendet und nach Ablauf der gesetzlichen 
              Aufbewahrungsfristen gelöscht.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">Server-Log-Dateien</h3>
            <p className="text-muted-foreground mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:<br />
              - Browsertyp und Browserversion<br />
              - verwendetes Betriebssystem<br />
              - Referrer URL<br />
              - Hostname des zugreifenden Rechners<br />
              - Uhrzeit der Serveranfrage<br />
              - IP-Adresse<br /><br />
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              4. Ihre Rechte
            </h2>
            <p className="text-muted-foreground mb-4">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung 
              sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren 
              Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>
            <p className="text-muted-foreground">
              <strong>Recht auf Einschränkung der Verarbeitung:</strong> Sie haben das Recht, die 
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.<br /><br />
              <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Daten, die wir 
              auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert 
              verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format 
              aushändigen zu lassen.<br /><br />
              <strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung:</strong> Viele 
              Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. 
              Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              5. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <p className="text-muted-foreground">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
              Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber 
              senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie 
              daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an 
              dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              6. Ärztliche Schweigepflicht
            </h2>
            <p className="text-muted-foreground">
              Als Arztpraxis unterliegen wir der ärztlichen Schweigepflicht. Alle patientenbezogenen 
              Daten werden streng vertraulich behandelt und nur im Rahmen der medizinischen Versorgung 
              verwendet. Eine Weitergabe an Dritte erfolgt nur mit Ihrer ausdrücklichen Einwilligung 
              oder wenn wir gesetzlich dazu verpflichtet sind.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

