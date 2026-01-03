import nodemailer from "nodemailer";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface AppointmentEmailData {
  patientName: string;
  patientEmail: string;
  date: Date;
  timeSlot: string;
  cancelToken: string;
  language: string;
}

const translations = {
  de: {
    subject: "Terminanfrage erhalten - Praxis Amara",
    greeting: "Sehr geehrte/r",
    confirmation: "Ihre Terminanfrage ist bei uns eingegangen. Wir werden sie zeitnah bestätigen.",
    details: "Termindetails",
    date: "Datum",
    time: "Uhrzeit",
    address: "Adresse",
    cancelText: "Falls Sie den Termin absagen möchten, klicken Sie bitte auf folgenden Link:",
    cancelLink: "Termin stornieren",
    reminder: "Bitte denken Sie daran, Ihre Versichertenkarte und ggf. Überweisungen mitzubringen.",
    regards: "Mit freundlichen Grüßen",
    team: "Ihr Praxis Amara Team",
  },
  en: {
    subject: "Appointment Request Received - Praxis Amara",
    greeting: "Dear",
    confirmation: "Your appointment request has been received. We will confirm it shortly.",
    details: "Appointment Details",
    date: "Date",
    time: "Time",
    address: "Address",
    cancelText: "If you need to cancel your appointment, please click the following link:",
    cancelLink: "Cancel Appointment",
    reminder: "Please remember to bring your insurance card and any referrals.",
    regards: "Best regards",
    team: "Your Praxis Amara Team",
  },
};

export async function sendAppointmentConfirmation(data: AppointmentEmailData) {
  const t = translations[data.language as keyof typeof translations] || translations.de;
  const locale = data.language === "en" ? enUS : de;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const cancelUrl = `${baseUrl}/${data.language}/termin/stornieren?token=${data.cancelToken}`;

  const formattedDate = format(data.date, "EEEE, d. MMMM yyyy", { locale });

  const html = `
    <!DOCTYPE html>
    <html lang="${data.language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1E3A5F; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1E3A5F; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 400; }
        .content { padding: 30px; }
        .details-box { background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 20px 0; }
        .details-box h3 { margin-top: 0; color: #1E3A5F; }
        .detail-row { display: flex; margin: 10px 0; }
        .detail-label { font-weight: 600; width: 100px; }
        .cancel-section { background-color: #fff8e1; border: 1px solid #ffcc02; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .cancel-link { color: #d32f2f; }
        .reminder { background-color: #e8f5e9; padding: 15px; border-radius: 4px; margin: 20px 0; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 14px; color: #666; }
        .button { display: inline-block; background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Praxis Amara</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Internistische Hausarztpraxis</p>
        </div>
        <div class="content">
          <p>${t.greeting} ${data.patientName},</p>
          <p>${t.confirmation}</p>
          
          <div class="details-box">
            <h3>${t.details}</h3>
            <p><strong>${t.date}:</strong> ${formattedDate}</p>
            <p><strong>${t.time}:</strong> ${data.timeSlot} Uhr</p>
            <p><strong>${t.address}:</strong> Eidelstedter Platz 6a, 22523 Hamburg</p>
          </div>
          
          <div class="reminder">
            <p style="margin: 0;">${t.reminder}</p>
          </div>
          
          <div class="cancel-section">
            <p style="margin: 0 0 10px 0;">${t.cancelText}</p>
            <a href="${cancelUrl}" class="cancel-link">${t.cancelLink}</a>
          </div>
          
          <p>${t.regards},<br><strong>${t.team}</strong></p>
        </div>
        <div class="footer">
          <p>Praxis Amara | Eidelstedter Platz 6a | 22523 Hamburg<br>
          Tel: 040 576061 | E-Mail: int.hausarzt.eidelstedt@gmx.de</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Praxis Amara" <${process.env.SMTP_USER}>`,
      to: data.patientEmail,
      subject: t.subject,
      html,
    });

    // Also notify admin
    await transporter.sendMail({
      from: `"Praxis Amara System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Neuer Termin: ${data.patientName} - ${formattedDate} ${data.timeSlot}`,
      html: `
        <h2>Neuer Termin gebucht</h2>
        <p><strong>Patient:</strong> ${data.patientName}</p>
        <p><strong>E-Mail:</strong> ${data.patientEmail}</p>
        <p><strong>Datum:</strong> ${formattedDate}</p>
        <p><strong>Uhrzeit:</strong> ${data.timeSlot} Uhr</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

export async function sendCancellationConfirmation(data: {
  patientName: string;
  patientEmail: string;
  date: Date;
  timeSlot: string;
  language: string;
}) {
  const isGerman = data.language === "de";
  const locale = isGerman ? de : enUS;
  const formattedDate = format(data.date, "EEEE, d. MMMM yyyy", { locale });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1E3A5F; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1E3A5F; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Praxis Amara</h1>
        </div>
        <div style="padding: 20px;">
          <p>${isGerman ? "Sehr geehrte/r" : "Dear"} ${data.patientName},</p>
          <p>${isGerman 
            ? "Ihr Termin wurde erfolgreich storniert." 
            : "Your appointment has been successfully cancelled."}</p>
          <p><strong>${isGerman ? "Stornierter Termin" : "Cancelled Appointment"}:</strong><br>
          ${formattedDate}, ${data.timeSlot} Uhr</p>
          <p>${isGerman 
            ? "Falls Sie einen neuen Termin vereinbaren möchten, besuchen Sie bitte unsere Website oder rufen Sie uns an." 
            : "If you would like to book a new appointment, please visit our website or call us."}</p>
          <p>${isGerman ? "Mit freundlichen Grüßen" : "Best regards"},<br>
          <strong>${isGerman ? "Ihr Praxis Amara Team" : "Your Praxis Amara Team"}</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Praxis Amara" <${process.env.SMTP_USER}>`,
      to: data.patientEmail,
      subject: isGerman ? "Terminabsage bestätigt - Praxis Amara" : "Appointment Cancellation Confirmed - Praxis Amara",
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

export async function sendStatusChangeEmail(data: {
  patientName: string;
  patientEmail: string;
  date: Date;
  timeSlot: string;
  language: string;
  status: "CONFIRMED" | "CANCELLED";
}) {
  const isGerman = data.language === "de";
  const locale = isGerman ? de : enUS;
  const formattedDate = format(data.date, "EEEE, d. MMMM yyyy", { locale });

  const isConfirmed = data.status === "CONFIRMED";

  const content = {
    de: {
      confirmed: {
        subject: "Termin bestätigt - Praxis Amara",
        title: "Ihr Termin wurde bestätigt",
        message: "Wir freuen uns, Ihnen mitteilen zu können, dass Ihr Termin bestätigt wurde.",
        color: "#22c55e",
      },
      cancelled: {
        subject: "Termin storniert - Praxis Amara",
        title: "Ihr Termin wurde storniert",
        message: "Leider müssen wir Ihnen mitteilen, dass Ihr Termin storniert wurde. Bitte kontaktieren Sie uns, um einen neuen Termin zu vereinbaren.",
        color: "#ef4444",
      },
    },
    en: {
      confirmed: {
        subject: "Appointment Confirmed - Praxis Amara",
        title: "Your appointment has been confirmed",
        message: "We are pleased to inform you that your appointment has been confirmed.",
        color: "#22c55e",
      },
      cancelled: {
        subject: "Appointment Cancelled - Praxis Amara",
        title: "Your appointment has been cancelled",
        message: "Unfortunately, we must inform you that your appointment has been cancelled. Please contact us to schedule a new appointment.",
        color: "#ef4444",
      },
    },
  };

  const lang = isGerman ? "de" : "en";
  const statusContent = isConfirmed ? content[lang].confirmed : content[lang].cancelled;

  const html = `
    <!DOCTYPE html>
    <html lang="${data.language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1E3A5F; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1E3A5F; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 400; }
        .content { padding: 30px; }
        .status-box { background-color: ${statusContent.color}15; border-left: 4px solid ${statusContent.color}; padding: 20px; margin: 20px 0; }
        .status-box h3 { margin-top: 0; color: ${statusContent.color}; }
        .details-box { background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 20px 0; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Praxis Amara</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Internistische Hausarztpraxis</p>
        </div>
        <div class="content">
          <p>${isGerman ? "Sehr geehrte/r" : "Dear"} ${data.patientName},</p>
          
          <div class="status-box">
            <h3>${statusContent.title}</h3>
            <p style="margin: 0;">${statusContent.message}</p>
          </div>
          
          <div class="details-box">
            <h3>${isGerman ? "Termindetails" : "Appointment Details"}</h3>
            <p><strong>${isGerman ? "Datum" : "Date"}:</strong> ${formattedDate}</p>
            <p><strong>${isGerman ? "Uhrzeit" : "Time"}:</strong> ${data.timeSlot} Uhr</p>
            <p><strong>${isGerman ? "Adresse" : "Address"}:</strong> Eidelstedter Platz 6a, 22523 Hamburg</p>
          </div>
          
          ${isConfirmed ? `
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0;">${isGerman 
              ? "Bitte denken Sie daran, Ihre Versichertenkarte und ggf. Überweisungen mitzubringen."
              : "Please remember to bring your insurance card and any referrals."}</p>
          </div>
          ` : ""}
          
          <p>${isGerman ? "Mit freundlichen Grüßen" : "Best regards"},<br>
          <strong>${isGerman ? "Ihr Praxis Amara Team" : "Your Praxis Amara Team"}</strong></p>
        </div>
        <div class="footer">
          <p>Praxis Amara | Eidelstedter Platz 6a | 22523 Hamburg<br>
          Tel: 040 576061 | E-Mail: int.hausarzt.eidelstedt@gmx.de</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Praxis Amara" <${process.env.SMTP_USER}>`,
      to: data.patientEmail,
      subject: statusContent.subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const html = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>E-Mail:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ""}
    <p><strong>Nachricht:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Praxis Amara Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: data.email,
      subject: `Kontaktanfrage von ${data.name}`,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

