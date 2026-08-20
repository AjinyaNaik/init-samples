interface ReceiptItem {
  name: string;
  price: number;
  samples?: { name: string }[];
}

interface OrderReceiptProps {
  username: string;
  orderId: string;
  items: ReceiptItem[];
  totalAmount: number;
  dashboardUrl: string;
}

export const generateOrderReceiptHtml = ({
  username,
  orderId,
  items,
  totalAmount,
  dashboardUrl,
}: OrderReceiptProps) => {
  const itemsListHtml = items
    .map((item) => {
      const samplesHtml =
        item.samples && item.samples.length > 0
          ? item.samples
              .map(
                (sample) => `
                <tr>
                  <td colspan="2" style="padding: 4px 0 4px 16px; color: #a1a1aa; font-size: 13px;">
                    &bull; ${sample.name}
                  </td>
                </tr>
              `
              )
              .join("")
          : "";

      return `
        <!-- Main Item Row -->
        <tr>
          <td style="padding: 14px 0 4px 0; border-bottom: ${item.samples && item.samples.length > 0 ? 'none' : '1px solid rgba(82, 82, 91, 0.4)'}; color: #f4f4f5; font-size: 15px; font-weight: 600;">
            ${item.name}
          </td>
          <td style="padding: 14px 0 4px 0; border-bottom: ${item.samples && item.samples.length > 0 ? 'none' : '1px solid rgba(82, 82, 91, 0.4)'}; color: #d8b4fe; text-align: right; font-weight: 600; font-size: 15px;">
            $${item.price.toFixed(2)}
          </td>
        </tr>
        <!-- Included Samples Sub-List (No Price) -->
        ${samplesHtml}
        <!-- Closing Border for Item Row if it had samples -->
        ${
          item.samples && item.samples.length > 0
            ? `<tr><td colspan="2" style="padding-bottom: 10px; border-bottom: 1px solid rgba(82, 82, 91, 0.4);"></td></tr>`
            : ""
        }
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Receipt - Init Samples</title>
      </head>
      <body style="background-color: #09090b; color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 40px 20px;">
        
        <!-- Outer Wrapper Table for Email Client Centering -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid rgba(82, 82, 91, 0.3); border-radius: 24px; overflow: hidden;">
          
          <!-- Header Section -->
          <tr>
            <td style="padding: 48px 40px 24px 40px; text-align: center;">
              <!-- Brand Eyebrow -->
              <span style="font-size: 16px; font-weight: 500; color: #f4f4f5; letter-spacing: -0.01em; display: inline-block; margin-bottom: 16px;">
                Init Samples
              </span>
              
              <!-- Pre-rendered Neon Image Header -->
              <table align="center" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <img src="https://naxqhdcoiedkdsebuazw.supabase.co/storage/v1/object/public/email-media/order-confirmed.png" alt="ORDER CONFIRMED" width="280" style="display: block; max-width: 100%; height: auto; border: 0;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              
              <!-- Greeting Paragraph -->
              <p style="font-size: 16px; color: #d4d4d8; line-height: 1.5; margin-bottom: 28px; text-align: center;">
                Thanks for grabbing your sounds, <strong>${username}</strong>. Your files are fully processed and ready to use in your studio.
              </p>

              <!-- Receipt Container Box (zinc-900 style backdrop) -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(24, 24, 27, 0.6); border: 1px solid rgba(82, 82, 91, 0.3); border-radius: 16px; padding: 24px;">
                
                <!-- Receipt Metadata / Order ID Header -->
                <tr>
                  <td colspan="2" style="padding-bottom: 16px; border-bottom: 2px solid rgba(168, 85, 247, 0.4);">
                    <span style="font-size: 12px; font-weight: 700; color: #a855f7; text-transform: uppercase; letter-spacing: 0.08em;">
                      Receipt &bull; Order #${orderId}
                    </span>
                  </td>
                </tr>

                <!-- Dynamic Item Rows -->
                ${itemsListHtml}

                <!-- Total Row -->
                <tr>
                  <td style="padding: 24px 0 0 0; font-size: 16px; font-weight: bold; color: #f4f4f5;">
                    Total Paid
                  </td>
                  <td style="padding: 24px 0 0 0; font-size: 20px; font-weight: bold; color: #34d399; text-align: right;">
                    $${totalAmount.toFixed(2)}
                  </td>
                </tr>
              </table>

              <!-- Action Button Container -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 36px;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" target="_blank" style="display: inline-block; padding: 16px 36px; background-color: #f4f4f5; color: #09090b; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 9999px; box-shadow: 0 0 25px rgba(168, 85, 247, 0.4); transition: all 0.3s ease;">
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; border-top: 1px solid rgba(82, 82, 91, 0.2); background-color: rgba(9, 9, 11, 0.4);">
              <p style="font-size: 13px; color: #a1a1aa; line-height: 1.5; margin: 0 0 12px 0;">
                High-quality, <strong>ROYALTY-FREE</strong> audio samples and loops.<br>
                <strong>NO AI SAMPLES.</strong> 100% human-recorded.
              </p>
              <p style="font-size: 12px; color: #a1a1aa; margin: 0 0 12px 0;">
                Questions? Reach out to us at <a href="mailto:initsamples@gmail.com" style="color: #d8b4fe; text-decoration: underline;">initsamples@gmail.com</a>
              </p>
              <p style="font-size: 12px; color: #71717a; margin: 0;">
                &copy; ${new Date().getFullYear()} Init Samples. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </body>
    </html>
  `;
};