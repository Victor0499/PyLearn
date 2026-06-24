import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Crear el transporter de Nodemailer usando variables de entorno
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true solo para puerto 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendResetEmail(toEmail: string, username: string, resetUrl: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"PyLearn" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🔑 Recuperación de contraseña - PyLearn',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recupera tu contraseña</title>
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
            <h2 style="color:#f1f5f9;margin:0 0 12px;font-size:20px;">¡Hola, ${username}! 👋</h2>
            <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong style="color:#60a5fa;">PyLearn</strong>. 
              Si no realizaste esta solicitud, puedes ignorar este mensaje con total tranquilidad.
            </p>

            <!-- CTA Button -->
            <div style="text-align:center;margin:32px 0;">
              <a href="${resetUrl}" 
                 style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#6366f1);color:#fff;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:16px;font-weight:700;letter-spacing:0.3px;box-shadow:0 4px 20px rgba(59,130,246,0.4);">
                🔑 Restablecer contraseña
              </a>
            </div>

            <!-- Warning -->
            <div style="background:#0f172a;border:1px solid #334155;border-radius:10px;padding:16px;margin-top:24px;">
              <p style="color:#64748b;font-size:13px;margin:0;line-height:1.5;">
                ⏱️ <strong style="color:#94a3b8;">Este enlace expira en 1 hora.</strong><br>
                Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
              </p>
              <p style="color:#3b82f6;font-size:12px;word-break:break-all;margin:8px 0 0;font-family:monospace;">${resetUrl}</p>
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

    // 1. Buscar el usuario
    const { data: user, error: userError } = await supabaseAdmin
      .from('auth_user')
      .select('id, password, username')
      .eq('email', trimmedEmail)
      .single();

    // Si no existe, devolvemos un mensaje genérico por seguridad (para evitar enumeración de correos)
    if (userError || !user) {
      return NextResponse.json({ success: true, message: 'Si el correo está registrado, recibirás un enlace de recuperación.' });
    }

    // 2. Verificar si es una cuenta de Google
    if (user.password.includes('$google$')) {
      return NextResponse.json({
        isGoogle: true,
        message: 'Tu cuenta está registrada con Google. Inicia sesión directamente con Google.'
      });
    }

    // 3. Generar token de recuperación
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hora de expiración

    // 4. Limpiar tokens anteriores e insertar el nuevo
    await supabaseAdmin
      .from('api_passwordresettoken')
      .delete()
      .eq('user_id', user.id);

    const { error: insertError } = await supabaseAdmin
      .from('api_passwordresettoken')
      .insert([{ user_id: user.id, token, expires_at: expiresAt.toISOString() }]);

    if (insertError) {
      console.error('Error al insertar token de recuperación:', insertError);
      return NextResponse.json({ error: 'Error interno al procesar la solicitud.' }, { status: 500 });
    }

    // 5. Construir enlace y enviar correo con Nodemailer
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;

    try {
      await sendResetEmail(trimmedEmail, user.username, resetUrl);
      console.log(`✅ Correo de recuperación enviado a: ${trimmedEmail}`);
    } catch (emailError: any) {
      // Si el envío falla, lo logueamos pero no fallamos toda la request.
      // En desarrollo puede fallar por credenciales no configuradas.
      console.error('⚠️ Error al enviar el correo (verifica EMAIL_USER y EMAIL_PASS en .env.local):', emailError.message);
      console.log('\n========================================');
      console.log('🔑 ENLACE DE RECUPERACIÓN (fallback consola)');
      console.log(`Usuario: ${user.username}`);
      console.log(`Enlace: ${resetUrl}`);
      console.log('========================================\n');
    }

    return NextResponse.json({ success: true, message: 'Si el correo está registrado, recibirás un enlace de recuperación.' });
  } catch (error: any) {
    console.error('Error en forgot-password route:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
