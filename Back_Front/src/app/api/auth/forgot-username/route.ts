import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendUsernameEmail(toEmail: string, username: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"PyLearn" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '👤 Recuperación de usuario - PyLearn',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tu nombre de usuario en PyLearn</title>
      </head>
      <body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
        <div style="max-width:580px;margin:40px auto;background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#3b82f6,#6366f1);padding:36px;text-align:center;">
            <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:rgba(255,255,255,0.15);border-radius:12px;margin-bottom:12px;">
              <span style="font-size:24px;font-weight:900;color:#fff;">Py</span>
            </div>
            <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;">PyLearn Platform</h1>
          </div>

          <!-- Body -->
          <div style="padding:36px;">
            <h2 style="color:#f1f5f9;margin:0 0 12px;font-size:20px;">¡Hola! 👋 Aquí está tu usuario</h2>
            <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px;">
              Recibimos una solicitud para recuperar el nombre de usuario asociado a esta dirección de correo electrónico en
              <strong style="color:#60a5fa;">PyLearn</strong>.
              Si no realizaste esta solicitud, puedes ignorar este mensaje.
            </p>

            <!-- Username Box -->
            <div style="background:#0f172a;border:2px solid #3b82f6;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
              <p style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Tu nombre de usuario es</p>
              <p style="color:#f1f5f9;font-size:28px;font-weight:800;font-family:monospace;margin:0;letter-spacing:1px;">
                ${username}
              </p>
            </div>

            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Ya puedes iniciar sesión en PyLearn usando este nombre de usuario junto con tu contraseña.
            </p>

            <!-- CTA Button -->
            <div style="text-align:center;margin:24px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login"
                 style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:16px;font-weight:700;letter-spacing:0.3px;box-shadow:0 4px 20px rgba(59,130,246,0.4);">
                → Ir al Inicio de Sesión
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#0f172a;padding:20px 36px;text-align:center;border-top:1px solid #1e293b;">
            <p style="color:#475569;font-size:12px;margin:0;">© ${new Date().getFullYear()} PyLearn. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'El correo electrónico es requerido.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Buscar el usuario por correo
    const { data: user, error: userError } = await supabaseAdmin
      .from('auth_user')
      .select('id, username, password')
      .eq('email', trimmedEmail)
      .single();

    // Respuesta genérica por seguridad (evita enumeración de correos)
    if (userError || !user) {
      return NextResponse.json({
        success: true,
        message: 'Si el correo está registrado, recibirás tu nombre de usuario en breve.',
      });
    }

    // Detectar cuentas de Google
    if (user.password.includes('$google$')) {
      return NextResponse.json({
        isGoogle: true,
        message: 'Tu cuenta está registrada con Google. Tu usuario de Google es tu nombre de usuario en PyLearn.',
      });
    }

    // Enviar correo con el username
    try {
      await sendUsernameEmail(trimmedEmail, user.username);
      console.log(`✅ Correo de recuperación de usuario enviado a: ${trimmedEmail}`);
    } catch (emailError: any) {
      console.error('⚠️ Error al enviar correo de usuario:', emailError.message);
      console.log('\n========================================');
      console.log('👤 RECUPERACIÓN DE USUARIO (fallback consola)');
      console.log(`Correo: ${trimmedEmail}`);
      console.log(`Usuario: ${user.username}`);
      console.log('========================================\n');
    }

    return NextResponse.json({
      success: true,
      message: 'Si el correo está registrado, recibirás tu nombre de usuario en breve.',
    });
  } catch (error: any) {
    console.error('Error en forgot-username route:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
