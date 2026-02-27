// Cloudflare Pages Function: /api/technicians/:id
// Handles DELETE (remove technician) and PUT (update technician)

export async function onRequestDelete(context) {
    const { env, params } = context;
    const techId = params.id;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        if (!env.TECHNICIAN_DATA) {
            return new Response(JSON.stringify({ success: false, error: 'KV namespace not bound.' }), {
                status: 500, headers: corsHeaders
            });
        }

        const existing = await env.TECHNICIAN_DATA.get('technicians', 'json') || [];
        const updated = existing.filter(t => t.id !== techId);

        if (updated.length === existing.length) {
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

export async function onRequestPut(context) {
    const { request, env, params } = context;
    const techId = params.id;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        if (!env.TECHNICIAN_DATA) {
            return new Response(JSON.stringify({ success: false, error: 'KV namespace not bound.' }), {
                status: 500, headers: corsHeaders
            });
        }

        const body = await request.json();
        const existing = await env.TECHNICIAN_DATA.get('technicians', 'json') || [];
        let found = false;

        const updated = existing.map(t => {
            if (t.id === techId) {
                found = true;
                return { ...t, ...body, id: techId }; // preserve id
            }
            return t;
        });

        if (!found) {
            return new Response(JSON.stringify({ success: false, error: 'Technician not found.' }), {
                status: 404, headers: corsHeaders
            });
        }

        await env.TECHNICIAN_DATA.put('technicians', JSON.stringify(updated));

        return new Response(JSON.stringify({ success: true, technician: updated.find(t => t.id === techId) }), {
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
            'Access-Control-Allow-Methods': 'DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
