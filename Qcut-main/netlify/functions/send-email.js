export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { 
      barberName, 
      barberEmail, 
      clientName, 
      clientPhone, 
      appointmentDate,
      autoAccepted 
    } = JSON.parse(event.body || '{}');

    if (!barberEmail) {
      return { statusCode: 400, body: 'Missing barberEmail' };
    }

    // Formatear fecha
    const date = new Date(appointmentDate);
    const formattedDate = date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const statusText = autoAccepted 
      ? 'confirmada automáticamente' 
      : 'pendiente de confirmación';

    // Construir el email
    const emailSubject = autoAccepted
      ? `Nueva Cita Confirmada - ${clientName}`
      : `Nueva Cita Pendiente - ${clientName}`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fafafa;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Qcut</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Sistema de Gestión de Citas</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
          <h2 style="color: #1a1a1a; margin-top: 0;">
          ${autoAccepted ? 'Nueva Cita Confirmada' : 'Nueva Cita Pendiente'}
          
          <p style="color: #6b6b6b; font-size: 16px;">
            Hola <strong>${barberName}</strong>,
          </p>
          
          <p style="color: #6b6b6b; font-size: 16px;">
            ${autoAccepted 
              ? 'Has recibido una nueva cita que ha sido <strong style="color: #34c759;">confirmada automáticamente</strong>:'
              : 'Has recibido una nueva solicitud de cita que requiere tu confirmación:'}
          </p>
          
          <div style="background: #fafafa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${autoAccepted ? '#34c759' : '#ff9500'};">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b6b6b; font-weight: 600;">Cliente:</td>
                <td style="padding: 8px 0; color: #1a1a1a; text-align: right;">${clientName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6b6b; font-weight: 600;">Teléfono:</td>
                <td style="padding: 8px 0; color: #1a1a1a; text-align: right;">${clientPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6b6b; font-weight: 600;">Fecha:</td>
                <td style="padding: 8px 0; color: #1a1a1a; text-align: right;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6b6b; font-weight: 600;">Hora:</td>
                <td style="padding: 8px 0; color: #1a1a1a; text-align: right;">${formattedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b6b6b; font-weight: 600;">Estado:</td>
                <td style="padding: 8px 0; text-align: right;">
                  <span style="background: ${autoAccepted ? '#34c759' : '#ff9500'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                    ${statusText.toUpperCase()}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          
          ${!autoAccepted ? `
            <p style="color: #6b6b6b; font-size: 16px;">
              Por favor, <strong>ingresa al dashboard</strong> para confirmar o cancelar esta cita.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.URL || 'https://qcutcr.netlify.app'}/dashboard" 
                 style="background: linear-gradient(135deg, #d4af37 0%, #c19b2f 100%); 
                        color: #1a1a1a; 
                        padding: 14px 32px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: 600; 
                        display: inline-block;
                        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);">
                Ir al Dashboard
              </a>
            </div>
          ` : `
            <p style="color: #34c759; font-size: 16px; font-weight: 600; text-align: center; margin: 20px 0;">
              ✓ Esta cita ya está confirmada y aparece en tu calendario.
            </p>
          `}
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
          
          <p style="color: #6b6b6b; font-size: 14px; text-align: center; margin: 0;">
            Este es un email automático de Qcut. No respondas a este mensaje.
          </p>
        </div>
      </div>
    `;

    // Aquí usaremos un servicio de email como SendGrid, Mailgun, o Resend
    // Por ahora, simularemos el envío exitoso
    // En producción, deberías configurar un servicio de email real

    const emailApiKey = process.env.EMAIL_API_KEY;
    const emailService = process.env.EMAIL_SERVICE || 'sendgrid'; // sendgrid, mailgun, resend

    if (!emailApiKey) {
      console.warn('EMAIL_API_KEY not configured. Email would be sent to:', barberEmail);
      return {
        statusCode: 503,
        body: JSON.stringify({
          success: false,
          error: 'Email API not configured',
          wouldSendTo: barberEmail
        })
      };
    }

    // Ejemplo con SendGrid (descomentar y configurar según tu servicio)
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(emailApiKey);
    
    await sgMail.send({
      to: barberEmail,
      from: 'noreply@qcut.com', // Debe ser un email verificado en SendGrid
      subject: emailSubject,
      html: emailBody,
    });
    */

    // Ejemplo con Resend (más simple y moderno)
    if (emailService === 'resend') {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Qcut <onboarding@resend.dev>', // Cambiar por tu dominio verificado
          to: [barberEmail],
          subject: emailSubject,
          html: emailBody
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error sending email:', data);
        return { 
          statusCode: response.status, 
          body: JSON.stringify(data) 
        };
      }

      return { 
        statusCode: 200, 
        body: JSON.stringify({ success: true, data }) 
      };
    }

    console.warn('EMAIL_SERVICE not configured to send (no matching branch after API key check)');
    return {
      statusCode: 501,
      body: JSON.stringify({
        success: false,
        error: 'Email service not configured (set EMAIL_SERVICE=resend or implement send branch)',
        recipient: barberEmail
      })
    };

  } catch (error) {
    console.error('Error processing email:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
}
