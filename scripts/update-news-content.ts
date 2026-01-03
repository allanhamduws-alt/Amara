import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ausführliche Artikel-Inhalte
const websiteContentDe = `## Herzlich Willkommen!

Wir freuen uns sehr, Ihnen unsere neue, moderne Website präsentieren zu können. Mit diesem digitalen Neustart möchten wir Ihnen einen noch besseren Service bieten und die Kommunikation zwischen Ihnen und unserer Praxis vereinfachen.

## Neue Features im Überblick

Unsere neue Website bietet Ihnen zahlreiche Vorteile:

- **Online-Terminbuchung**: Buchen Sie Ihren Wunschtermin bequem von zu Hause aus – 24 Stunden am Tag, 7 Tage die Woche
- **Digitales Kontaktformular**: Senden Sie uns Ihre Anfragen direkt über die Website
- **Aktuelle Informationen**: Bleiben Sie über Neuigkeiten aus unserer Praxis informiert
- **Übersichtliche Leistungsdarstellung**: Erfahren Sie mehr über unser umfangreiches diagnostisches Angebot

## So buchen Sie Ihren Termin online

Die Online-Terminbuchung ist ganz einfach:

1. Klicken Sie auf "Termin buchen" in der Navigation
2. Wählen Sie Ihren gewünschten Tag im Kalender
3. Suchen Sie sich eine passende Uhrzeit aus den verfügbaren Terminen
4. Geben Sie Ihre Kontaktdaten ein
5. Bestätigen Sie Ihre Buchung

Sie erhalten anschließend eine Bestätigung per E-Mail. Sollten Sie den Termin nicht wahrnehmen können, können Sie ihn über den Link in der E-Mail einfach stornieren.

## Vorteile der digitalen Services

Mit unseren neuen digitalen Services sparen Sie Zeit und können uns flexibel erreichen:

- **Keine Warteschleifen**: Buchen Sie Termine ohne Telefonwarteschleife
- **Flexible Planung**: Vereinbaren Sie Termine auch außerhalb unserer Sprechzeiten
- **Übersichtlichkeit**: Sehen Sie auf einen Blick alle verfügbaren Termine
- **Erinnerung**: Erhalten Sie eine Terminbestätigung per E-Mail

## Wir sind für Sie da

Selbstverständlich stehen wir Ihnen auch weiterhin telefonisch zur Verfügung. Bei dringenden medizinischen Anliegen erreichen Sie uns wie gewohnt unter unserer Praxisnummer.

Wir freuen uns auf Ihren Besuch – ob digital oder persönlich in unserer Praxis am Eidelstedter Platz!`;

const websiteContentEn = `## Welcome!

We are very pleased to present our new, modern website to you. With this digital fresh start, we want to offer you even better service and simplify communication between you and our practice.

## New Features at a Glance

Our new website offers you numerous advantages:

- **Online appointment booking**: Book your desired appointment conveniently from home – 24 hours a day, 7 days a week
- **Digital contact form**: Send us your inquiries directly through the website
- **Current information**: Stay informed about news from our practice
- **Clear service presentation**: Learn more about our comprehensive diagnostic offerings

## How to Book Your Appointment Online

Online appointment booking is simple:

1. Click on "Book Appointment" in the navigation
2. Select your desired day in the calendar
3. Choose a suitable time from the available appointments
4. Enter your contact details
5. Confirm your booking

You will then receive a confirmation by email. If you cannot attend the appointment, you can easily cancel it via the link in the email.

## Benefits of Digital Services

With our new digital services, you save time and can reach us flexibly:

- **No waiting queues**: Book appointments without waiting on hold
- **Flexible planning**: Schedule appointments even outside our office hours
- **Clarity**: See all available appointments at a glance
- **Reminder**: Receive an appointment confirmation by email

## We Are Here for You

Of course, we are still available by phone. For urgent medical matters, you can reach us as usual at our practice number.

We look forward to your visit – whether digital or in person at our practice at Eidelstedter Platz!`;

const ultrasoundContentDe = `## Investition in Ihre Gesundheit

Wir freuen uns, Ihnen mitteilen zu können, dass wir in modernste Ultraschallgeräte investiert haben. Diese Investition ermöglicht uns, Ihnen eine noch präzisere und komfortablere Diagnostik anzubieten.

## Modernste Technologie für beste Bildqualität

Die neuen Ultraschallgeräte der neuesten Generation bieten zahlreiche Vorteile:

- **Hochauflösende Bildgebung**: Kristallklare Bilder für eine präzise Diagnosestellung
- **Schnellere Untersuchungen**: Moderne Prozessoren ermöglichen kürzere Untersuchungszeiten
- **Schonende Diagnostik**: Ultraschall ist völlig schmerzfrei und ohne Strahlenbelastung
- **Sofortige Ergebnisse**: Befunde können direkt während der Untersuchung besprochen werden

## Unsere Ultraschall-Leistungen

Mit den neuen Geräten können wir folgende Untersuchungen noch präziser durchführen:

### Abdomen-Sonographie
Untersuchung der Bauchorgane wie Leber, Gallenblase, Bauchspeicheldrüse, Milz und Nieren. Wichtig zur Früherkennung von Erkrankungen und zur Verlaufskontrolle.

### Schilddrüsen-Ultraschall
Präzise Darstellung der Schilddrüse zur Erkennung von Knoten, Vergrößerungen oder Entzündungen. Besonders wichtig bei Schilddrüsenfunktionsstörungen.

### Gefäßdiagnostik
- **Karotis-Doppler**: Untersuchung der Halsschlagadern zur Schlaganfall-Prävention
- **Thrombose-Diagnostik**: Schnelle und zuverlässige Erkennung von Blutgerinnseln
- **pAVK-Untersuchung**: Diagnostik bei Durchblutungsstörungen der Beine

### Herz-Ultraschall
Beurteilung der Herzfunktion, Herzklappen und Herzmuskelbewegung. Wichtig bei Verdacht auf Herzerkrankungen.

## Vorteile für Sie als Patient

Die modernen Geräte bedeuten für Sie:

- **Kürzere Wartezeiten**: Schnellere Untersuchungen bedeuten mehr verfügbare Termine
- **Höhere Diagnosesicherheit**: Bessere Bildqualität ermöglicht präzisere Befunde
- **Angenehmes Untersuchungserlebnis**: Moderne Geräte sind leiser und komfortabler
- **Sofortige Besprechung**: Wir können die Bilder direkt mit Ihnen besprechen

## Termine für Ultraschall-Untersuchungen

Ultraschall-Untersuchungen bieten wir sowohl im Rahmen der Kassenleistungen als auch als individuelle Gesundheitsleistungen (IGeL) an. Vereinbaren Sie gerne einen Termin über unsere Online-Buchung oder telefonisch.

Wir freuen uns, Sie in unserer Praxis begrüßen zu dürfen!`;

const ultrasoundContentEn = `## Investing in Your Health

We are pleased to announce that we have invested in state-of-the-art ultrasound equipment. This investment enables us to offer you even more precise and comfortable diagnostics.

## Latest Technology for Best Image Quality

The new generation ultrasound devices offer numerous advantages:

- **High-resolution imaging**: Crystal clear images for precise diagnosis
- **Faster examinations**: Modern processors enable shorter examination times
- **Gentle diagnostics**: Ultrasound is completely painless and radiation-free
- **Immediate results**: Findings can be discussed directly during the examination

## Our Ultrasound Services

With the new equipment, we can perform the following examinations even more precisely:

### Abdominal Sonography
Examination of abdominal organs such as liver, gallbladder, pancreas, spleen, and kidneys. Important for early detection of diseases and follow-up monitoring.

### Thyroid Ultrasound
Precise imaging of the thyroid gland to detect nodules, enlargements, or inflammation. Particularly important for thyroid function disorders.

### Vascular Diagnostics
- **Carotid Doppler**: Examination of carotid arteries for stroke prevention
- **Thrombosis diagnostics**: Quick and reliable detection of blood clots
- **PAD examination**: Diagnostics for circulatory disorders of the legs

### Cardiac Ultrasound
Assessment of heart function, heart valves, and heart muscle movement. Important when heart disease is suspected.

## Benefits for You as a Patient

The modern devices mean for you:

- **Shorter waiting times**: Faster examinations mean more available appointments
- **Higher diagnostic accuracy**: Better image quality enables more precise findings
- **Pleasant examination experience**: Modern devices are quieter and more comfortable
- **Immediate discussion**: We can discuss the images directly with you

## Appointments for Ultrasound Examinations

We offer ultrasound examinations both as part of statutory health insurance services and as individual health services (IGeL). Please schedule an appointment through our online booking or by phone.

We look forward to welcoming you to our practice!`;

const teamContentDe = `## Herzlich Willkommen im Team!

Mit großer Freude dürfen wir Ihnen mitteilen, dass unser Ärzteteam Verstärkung bekommen hat. Frau Khakan Amara ist ab sofort als Ärztin für Allgemeinmedizin Teil unserer Praxis.

## Über Frau Khakan Amara

Frau Khakan Amara bringt umfangreiche Erfahrung in der hausärztlichen Versorgung mit und ergänzt unser Team ideal. Als Ärztin für Allgemeinmedizin liegt ihr Fokus auf der ganzheitlichen Betreuung unserer Patientinnen und Patienten.

### Qualifikationen und Fachgebiete

- Ärztin für Allgemeinmedizin
- Umfassende Erfahrung in der hausärztlichen Versorgung
- Besonderes Interesse an präventiver Medizin
- Einfühlsame Patientenbetreuung

## Was bedeutet das für Sie?

Mit der Erweiterung unseres Teams können wir Ihnen noch mehr bieten:

- **Mehr Terminmöglichkeiten**: Kürzere Wartezeiten auf Ihren Wunschtermin
- **Erweiterte Sprechzeiten**: Mehr Flexibilität bei der Terminvereinbarung
- **Persönliche Betreuung**: Ausreichend Zeit für Ihre Anliegen
- **Kontinuität**: Aufbau einer langfristigen Arzt-Patienten-Beziehung

## Unsere Praxisphilosophie

In unserer Praxis legen wir großen Wert auf eine vertrauensvolle Arzt-Patienten-Beziehung. Wir nehmen uns Zeit für Sie und Ihre Anliegen. Mit Frau Amara als neuem Teammitglied können wir dieser Philosophie noch besser gerecht werden.

## Unser Gesamtteam

Mit der Verstärkung durch Frau Amara besteht unser Team nun aus:

- **Herr Jwan Amara** – Facharzt für Innere Medizin, Praxisinhaber
- **Frau Khakan Amara** – Ärztin für Allgemeinmedizin
- **Frau Brügmann** – Medizinische Fachangestellte, Praxismanagerin
- **Frau Dziachan** – Medizinische Fachangestellte

Gemeinsam sind wir für Sie da und freuen uns, Sie in unserer Praxis begrüßen zu dürfen.

## Terminvereinbarung

Termine bei Frau Amara können Sie wie gewohnt über unsere Online-Terminbuchung oder telefonisch vereinbaren. Wir freuen uns auf Sie!

Herzliche Grüße,
Ihr Praxisteam Amara`;

const teamContentEn = `## Welcome to the Team!

We are very pleased to announce that our medical team has received reinforcement. Ms. Khakan Amara has joined our practice as a general practitioner.

## About Ms. Khakan Amara

Ms. Khakan Amara brings extensive experience in general practice care and ideally complements our team. As a general practitioner, her focus is on the holistic care of our patients.

### Qualifications and Specialties

- General practitioner
- Comprehensive experience in primary care
- Special interest in preventive medicine
- Compassionate patient care

## What Does This Mean for You?

With the expansion of our team, we can offer you even more:

- **More appointment options**: Shorter waiting times for your desired appointment
- **Extended consultation hours**: More flexibility when scheduling appointments
- **Personal care**: Sufficient time for your concerns
- **Continuity**: Building a long-term doctor-patient relationship

## Our Practice Philosophy

In our practice, we place great value on a trusting doctor-patient relationship. We take time for you and your concerns. With Ms. Amara as a new team member, we can fulfill this philosophy even better.

## Our Complete Team

With Ms. Amara joining, our team now consists of:

- **Mr. Jwan Amara** – Specialist in Internal Medicine, Practice Owner
- **Ms. Khakan Amara** – General Practitioner
- **Ms. Brügmann** – Medical Assistant, Practice Manager
- **Ms. Dziachan** – Medical Assistant

Together, we are here for you and look forward to welcoming you to our practice.

## Making an Appointment

Appointments with Ms. Amara can be scheduled as usual through our online booking or by phone. We look forward to seeing you!

Best regards,
Your Praxis Amara Team`;

async function main() {
  console.log("Updating news content...");

  // Update Website article
  const websiteUpdate = await prisma.newsPost.updateMany({
    where: { slug: "willkommen-neue-website" },
    data: {
      contentDe: websiteContentDe,
      contentEn: websiteContentEn,
    },
  });
  console.log(`Updated website article: ${websiteUpdate.count} record(s)`);

  // Update Ultrasound article
  const ultrasoundUpdate = await prisma.newsPost.updateMany({
    where: { slug: "neue-ultraschallgeraete" },
    data: {
      contentDe: ultrasoundContentDe,
      contentEn: ultrasoundContentEn,
    },
  });
  console.log(`Updated ultrasound article: ${ultrasoundUpdate.count} record(s)`);

  // Update Team article
  const teamUpdate = await prisma.newsPost.updateMany({
    where: { slug: "team-erweiterung-khakan-amara" },
    data: {
      contentDe: teamContentDe,
      contentEn: teamContentEn,
    },
  });
  console.log(`Updated team article: ${teamUpdate.count} record(s)`);

  console.log("News content update completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

