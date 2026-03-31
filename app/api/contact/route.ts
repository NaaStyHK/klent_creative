import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Escape HTML pour éviter les injections
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validation email serveur
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, project, message } = body;

    // Validation présence des champs
    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: "Champs manquants." },
        { status: 400 }
      );
    }

    // Validation types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof project !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Format invalide." }, { status: 400 });
    }

    // Validation longueurs
    if (name.length > 100 || email.length > 200 || project.length > 100 || message.length > 2000) {
      return NextResponse.json({ error: "Champ trop long." }, { status: 400 });
    }

    // Validation email
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    // Échappement HTML
    const safeName    = escapeHtml(name.trim());
    const safeEmail   = escapeHtml(email.trim());
    const safeProject = escapeHtml(project.trim());
    const safeMessage = escapeHtml(message.trim());

    await resend.emails.send({
      from: "Contact Klent Creative <contact@klentcreative.com>",
      to: "contact@klentcreative.com",
      replyTo: email.trim(),
      subject: `[Klent Creative] Nouveau message de ${safeName} — ${safeProject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">Nouveau message de contact</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Email :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Type de projet :</strong> ${safeProject}</p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-line; color: #333;">${safeMessage}</p>
          <hr style="border: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Envoyé depuis klentcreative.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}
