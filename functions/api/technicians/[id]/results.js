// Cloudflare Pages Function: /api/technicians/:id/results
// POST: Save a new evaluation result to a technician's record

export async function onRequestPost(context) {
    const { request, env, params } = context;
    const techId = params.id;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        if (!env.TECHNICIAN_DATA) {
            return new Response(JSON.stringify({ success: false, error: 'KV namespace not bound.' }), {
                status: 500, headers: corsHeaders
            });
        }

        const result = await request.json();
        const existing = await env.TECHNICIAN_DATA.get('technicians', 'json') || [];
        let found = false;

        const updated = existing.map(t => {
            if (t.id === techId) {
                found = true;
                return {
                    ...t,
                    lastEvaluated: new Date().toISOString(),
                    results: [result, ...t.results]
                };
            }
            return t;
        });

        if (!found) {
            return new Response(JSON.stringify({ success: false, error: 'Technician not found.' }), {
                status: 404, headers: corsHeaders
            });
        }

        await env.TECHNICIAN_DATA.put('technicians', JSON.stringify(updated));

        return new Response(JSON.stringify({ success: true }), {
            status: 200, headers: corsHeaders
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500, headers: corsHeaders
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
