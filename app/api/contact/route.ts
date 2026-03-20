import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, project, message } = await req.json();

    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: "Champs manquants." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Contact Klent Creative <contact@klentcreative.com>", // ← change quand tu auras ton domaine vérifié
      to: "contact@klentcreative.com",                        // ← ton adresse de réception
      replyTo: email,
      subject: `[Klent Creative] Nouveau message de ${name} — ${project}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">Nouveau message de contact</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Type de projet :</strong> ${project}</p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-line; color: #333;">${message}</p>
          <hr style="border: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Envoyé depuis klentcreative.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}