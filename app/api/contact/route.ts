import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract standard string fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Extract quote/cart data
    const requestedModel = formData.get('requested_model') as string;
    const requestedStock = formData.get('requested_stock') as string;
    const requestedOptions = formData.get('requested_options') as string;
    const cartDataString = formData.get('cart_data') as string;

    // Handle File Attachment
    const attachment = formData.get('attachment') as File | null;
    let resendAttachments = [];

    if (attachment) {
      const bytes = await attachment.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      resendAttachments.push({
        filename: attachment.name,
        content: buffer,
      });
    }

    // ==========================================
    // DESIGN THE HTML EMAIL
    // ==========================================
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #333;">
        <h2 style="color: #EA580C; border-bottom: 2px solid #EA580C; padding-bottom: 10px;">New Website Inquiry</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong> ${firstName} ${lastName}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #EA580C;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong> ${phone || 'Not provided'}</td></tr>
        </table>

        <h3 style="color: #444; margin-top: 20px;">Customer Message:</h3>
        <p style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; font-style: italic; white-space: pre-wrap; line-height: 1.5;">${message}</p>
    `;

    // Format the Cart Data into a Beautiful Table
    if (cartDataString) {
      try {
        const cartItems = JSON.parse(cartDataString);
        
        if (cartItems && cartItems.length > 0) {
          htmlContent += `
            <h3 style="color: #EA580C; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Requested Quote (Cart Items)</h3>
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <thead>
                <tr style="background-color: #222; color: #fff;">
                  <th style="padding: 12px; border: 1px solid #444;">Build / Model</th>
                  <th style="padding: 12px; border: 1px solid #444;">Selected Options</th>
                  <th style="padding: 12px; border: 1px solid #444;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
          `;

          let grandTotal = 0;
          cartItems.forEach((item: any) => {
            grandTotal += item.total || 0;
            
            // Format item options into a bulleted list
            let optionsHtml = '<span style="color: #888; font-style: italic;">Standard Build (No add-ons)</span>';
            if (Array.isArray(item.options) && item.options.length > 0) {
              optionsHtml = `<ul style="margin: 0; padding-left: 15px; color: #555;">` + 
                item.options.map((opt: any) => `<li style="margin-bottom: 4px;">${opt.label} <strong style="color:#333;">(+$${opt.price})</strong></li>`).join('') + 
                `</ul>`;
            } else if (typeof item.options === 'string' && item.options.length > 0) {
              optionsHtml = `<span style="color: #555;">${item.options}</span>`;
            }

            htmlContent += `
              <tr>
                <td style="padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                  <strong style="font-size: 15px;">${item.model}</strong><br/>
                  <span style="font-size: 12px; color: #888; display: inline-block; margin-top: 4px; padding: 2px 6px; background: #eee; border-radius: 4px;">Stock #: ${item.stock || 'N/A'}</span>
                </td>
                <td style="padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                  ${optionsHtml}
                </td>
                <td style="padding: 12px; border: 1px solid #ddd; vertical-align: top; font-weight: bold; color: #EA580C;">
                  $${(item.total || 0).toLocaleString()}
                </td>
              </tr>
            `;
          });

          htmlContent += `
              </tbody>
              <tfoot>
                <tr style="background-color: #fff9f5;">
                  <td colspan="2" style="padding: 15px 12px; border: 1px solid #ddd; text-align: right; font-weight: bold; text-transform: uppercase;">Grand Total Estimate:</td>
                  <td style="padding: 15px 12px; border: 1px solid #ddd; font-weight: 900; color: #EA580C; font-size: 18px;">$${grandTotal.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          `;
        }
      } catch (e) {
        // Fallback just in case parsing fails
        htmlContent += `<hr/><h3 style="color: #EA580C;">Raw Cart Data:</h3><pre>${cartDataString}</pre>`;
      }
    } else if (requestedModel) {
      // Direct URL fallback styling
      htmlContent += `
        <h3 style="color: #EA580C; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Direct Quote Request</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9; width: 120px;"><strong>Model:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${requestedModel}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Stock #:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${requestedStock || 'N/A'}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Options:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${requestedOptions || 'Standard Build'}</td></tr>
        </table>
      `;
    }

    htmlContent += `</div>`; // Close wrapper div

// ==========================================
    // SEND THE EMAIL (Bulletproof Configuration)
    // ==========================================
    
    // Build the payload dynamically
    const emailPayload: any = {
      from: 'PITMAKER Website <onboarding@resend.dev>', // Keep as onboarding until domain is verified
      to: 'david.herascu@gmail.com', // <--- REPLACE THIS
      replyTo: email || 'noreply@pitmaker.com',
      subject: `Contact From / Quote: ${firstName} ${lastName}`,
      html: htmlContent,
    };

    // Only attach the file property if a file was actually uploaded
    if (resendAttachments.length > 0) {
      emailPayload.attachments = resendAttachments;
    }

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });

  } catch (error: any) {
    console.error("Internal API Route Error:", error);
    return NextResponse.json({ error: error?.message || 'Failed to process request' }, { status: 500 });
  }
}