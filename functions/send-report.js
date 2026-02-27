// Cloudflare Pages Function to send evaluation results via Resend
export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // Safely parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid request body. Expected JSON.' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const { technicianName, technicianEmail, category, score, percentage, level, breakdown, analysis, questions } = body;

    // Validate required fields
    if (!technicianName || !category || percentage === undefined || !breakdown || !questions) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields.',
        received: Object.keys(body || {})
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Build the email HTML — with safe fallbacks
    const breakdownEntries = breakdown && typeof breakdown === 'object' ? Object.entries(breakdown) : [];
    const breakdownHtml = breakdownEntries
      .map(([diff, data]) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${diff}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${data.correct} / ${data.total}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0}%</td>
        </tr>
      `).join('');

    const safeQuestions = Array.isArray(questions) ? questions : [];
    const questionsHtml = safeQuestions.map((q, i) => `
      <div style="margin-bottom: 16px; padding: 16px; background: ${q.isCorrect ? '#f0fdf4' : '#fef2f2'}; border-radius: 8px; border-left: 4px solid ${q.isCorrect ? '#22c55e' : '#ef4444'};">
        <p style="margin: 0 0 8px 0; font-weight: bold; color: #1e293b;">Q${i + 1}: ${q.text}</p>
        <p style="margin: 0; font-size: 12px; color: ${q.isCorrect ? '#166534' : '#991b1b'};">
          ${q.isCorrect ? '✓ Correct' : '✗ Incorrect'} | Difficulty: ${q.difficulty} | Topic: ${q.topic}
        </p>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b; font-style: italic;">${q.explanation}</p>
      </div>
    `).join('');

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Technician Evaluation Report</title>
    </head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
      <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: #1e293b; color: white; padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800;">3D Technology Services</h1>
          <p style="margin: 8px 0 0 0; color: #60a5fa; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Technician Evaluation Report</p>
        </div>

        <!-- Technician Info -->
        <div style="padding: 24px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0;">
          <table style="width: 100%;">
            <tr>
              <td><strong>Technician:</strong> ${technicianName}</td>
              <td><strong>Email:</strong> ${technicianEmail || 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>Category:</strong> ${category}</td>
              <td><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
          </table>
        </div>

        <!-- Score Summary -->
        <div style="padding: 32px; text-align: center; border-bottom: 1px solid #e2e8f0;">
          <div style="font-size: 64px; font-weight: 800; color: ${percentage >= 70 ? '#22c55e' : '#f59e0b'};">${percentage}%</div>
          <div style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 2px;">Overall Score</div>
          <div style="margin-top: 16px; display: inline-block; padding: 8px 24px; background: ${percentage >= 75 ? '#dcfce7' : percentage >= 50 ? '#fef3c7' : '#fee2e2'}; color: ${percentage >= 75 ? '#166534' : percentage >= 50 ? '#92400e' : '#991b1b'}; border-radius: 9999px; font-weight: 700; text-transform: uppercase; font-size: 12px;">
            ${level || 'N/A'}
          </div>
        </div>

        <!-- Breakdown Table -->
        <div style="padding: 24px;">
          <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">Proficiency Breakdown</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="padding: 12px 8px; text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b;">Difficulty</th>
                <th style="padding: 12px 8px; text-align: center; font-size: 12px; text-transform: uppercase; color: #64748b;">Score</th>
                <th style="padding: 12px 8px; text-align: center; font-size: 12px; text-transform: uppercase; color: #64748b;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${breakdownHtml}
            </tbody>
          </table>
        </div>

        <!-- AI Analysis -->
        <div style="padding: 24px; background: #f8fafc; border-top: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">AI Strategic Assessment</h3>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155;">
            ${analysis || 'Analysis not available.'}
          </div>
        </div>

        <!-- Question Details -->
        <div style="padding: 24px; border-top: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #64748b;">Detailed Question Review (${score || 0}/${safeQuestions.length} Correct)</h3>
          ${questionsHtml}
        </div>

        <!-- Footer -->
        <div style="background: #1e293b; color: #94a3b8; padding: 24px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} 3D Technology Services</p>
          <p style="margin: 8px 0 0 0;">This is an automated evaluation report from the Technician Assessment Portal</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Check for API key
    if (!env || !env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured. env keys:', env ? Object.keys(env) : 'env is undefined');
      return new Response(JSON.stringify({
        success: false,
        error: 'Email service not configured. RESEND_API_KEY is missing from Cloudflare environment variables.'
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // Send via Resend API — try custom domain first, fallback to Resend shared domain
    const fromAddresses = [
      'Evaluations <evaluations@3dtsi.com>',
      '3D Tech Evaluations <onboarding@resend.dev>'
    ];

    let lastError = null;
    for (const fromAddr of fromAddresses) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromAddr,
            to: ['agoodson56@gmail.com'],
            subject: `[Evaluation] ${technicianName} - ${category} - ${percentage}% (${level || 'N/A'})`,
            html: emailHtml
          })
        });

        const resendResult = await resendResponse.text();

        if (resendResponse.ok) {
          return new Response(JSON.stringify({ success: true, message: 'Report sent successfully' }), {
            status: 200,
            headers: corsHeaders
          });
        }

        lastError = resendResult;
        console.error(`Resend error with ${fromAddr}: ${resendResponse.status} - ${resendResult}`);
      } catch (fetchErr) {
        lastError = fetchErr.message;
        console.error(`Fetch error with ${fromAddr}:`, fetchErr.message);
      }
    }

    return new Response(JSON.stringify({ success: false, error: `Email send failed: ${lastError}` }), {
      status: 500,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Function error:', error.message, error.stack);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Unknown server error' }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

// Handle GET requests gracefully (e.g., browser navigation)
export async function onRequestGet() {
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'Email endpoint is active. Use POST to send reports.'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
