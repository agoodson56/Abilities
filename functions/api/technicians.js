// Cloudflare Pages Function: /api/technicians
// Handles GET (list all) and POST (create new technician)

export async function onRequestGet(context) {
    const { env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        if (!env.TECHNICIAN_DATA) {
            return new Response(JSON.stringify({ success: false, error: 'KV namespace TECHNICIAN_DATA not bound.' }), {
                status: 500, headers: corsHeaders
            });
        }

        const data = await env.TECHNICIAN_DATA.get('technicians', 'json');
        return new Response(JSON.stringify({ success: true, technicians: data || [] }), {
            status: 200, headers: corsHeaders
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500, headers: corsHeaders
        });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        if (!env.TECHNICIAN_DATA) {
            return new Response(JSON.stringify({ success: false, error: 'KV namespace TECHNICIAN_DATA not bound.' }), {
                status: 500, headers: corsHeaders
            });
        }

        const body = await request.json();
        const { name, email } = body;

        if (!name || !name.trim()) {
            return new Response(JSON.stringify({ success: false, error: 'Name is required.' }), {
                status: 400, headers: corsHeaders
            });
        }

        const existing = await env.TECHNICIAN_DATA.get('technicians', 'json') || [];

        const newTech = {
            id: crypto.randomUUID(),
            name: name.trim(),
            email: email || '',
            results: [],
            certifications: [],
            joinedDate: new Date().toISOString(),
            lastEvaluated: null
        };

        existing.push(newTech);
        await env.TECHNICIAN_DATA.put('technicians', JSON.stringify(existing));

        return new Response(JSON.stringify({ success: true, technician: newTech }), {
            status: 201, headers: corsHeaders
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
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
