import { setRequestLocale } from "next-intl/server";

interface ImpressumPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata = {
  title: "Impressum",
};

export default async function ImpressumPage({ params }: ImpressumPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-serif text-foreground mb-8">Impressum</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="text-muted-foreground">
              <strong>Jwan Amara</strong><br />
              Facharzt für Innere Medizin<br />
              Eidelstedter Platz 6a<br />
              22523 Hamburg
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">Kontakt</h2>
            <p className="text-muted-foreground">
              Telefon: 040 576061<br />
              Fax: 040 576046<br />
              E-Mail: int.hausarzt.eidelstedt@gmx.de
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Berufsbezeichnung und berufsrechtliche Regelungen
            </h2>
            <p className="text-muted-foreground">
              <strong>Berufsbezeichnung:</strong> Facharzt für Innere Medizin<br />
              <strong>Verliehen in:</strong> Deutschland<br />
              <strong>Zuständige Kammer:</strong> Ärztekammer Hamburg<br />
              Weidestraße 122b, 22083 Hamburg<br />
              <a href="https://www.aerztekammer-hamburg.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                www.aerztekammer-hamburg.org
              </a>
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>Berufsrechtliche Regelungen:</strong><br />
              Berufsordnung der Ärztekammer Hamburg<br />
              Heilberufsgesetz des Landes Hamburg
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Aufsichtsbehörde
            </h2>
            <p className="text-muted-foreground">
              Kassenärztliche Vereinigung Hamburg<br />
              Humboldtstraße 56, 22083 Hamburg<br />
              <a href="https://www.kvhh.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                www.kvhh.net
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Haftungsausschluss (Disclaimer)
            </h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">Haftung für Inhalte</h3>
            <p className="text-muted-foreground mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
              Tätigkeit hinweisen.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">Haftung für Links</h3>
            <p className="text-muted-foreground mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
              der Seiten verantwortlich.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2">Urheberrecht</h3>
            <p className="text-muted-foreground">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

