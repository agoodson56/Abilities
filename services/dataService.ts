// Cloud data service for technician records
// Uses Cloudflare Pages Functions API, falls back to localStorage

import { Technician, EvaluationResult } from '../types';

const API_BASE = '/api';

// Check if the cloud API is available (are we deployed on Cloudflare?)
let useCloud = true;

async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${url}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    const data = await response.json();
    if (!data.success) {
        throw new Error(data.error || 'API call failed');
    }
    return data;
}

// ── Load all technicians ──
export async function loadTechnicians(): Promise<Technician[]> {
    try {
        const data = await apiCall<{ success: boolean; technicians: Technician[] }>('/technicians');
        useCloud = true;
        return data.technicians;
    } catch (err) {
        console.warn('Cloud API unavailable, falling back to localStorage:', err);
        useCloud = false;
        // Fallback to localStorage
        const saved = localStorage.getItem('3dts_technicians');
        if (saved) {
            try { return JSON.parse(saved); } catch { return []; }
        }
        return [];
    }
}

// ── Create a new technician ──
export async function createTechnician(name: string, email: string = ''): Promise<Technician> {
    if (useCloud) {
        const data = await apiCall<{ success: boolean; technician: Technician }>('/technicians', {
            method: 'POST',
            body: JSON.stringify({ name, email }),
        });
        return data.technician;
    }

    // localStorage fallback
    const newTech: Technician = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email,
        results: [],
        certifications: [],
        joinedDate: new Date().toISOString(),
        lastEvaluated: null,
    };
    const existing = JSON.parse(localStorage.getItem('3dts_technicians') || '[]');
    existing.push(newTech);
    localStorage.setItem('3dts_technicians', JSON.stringify(existing));
    return newTech;
}

// ── Delete a technician ──
export async function deleteTechnician(id: string): Promise<void> {
    if (useCloud) {
        await apiCall(`/technicians/${id}`, { method: 'DELETE' });
        return;
    }

    // localStorage fallback
    const existing = JSON.parse(localStorage.getItem('3dts_technicians') || '[]');
    const updated = existing.filter((t: Technician) => t.id !== id);
    localStorage.setItem('3dts_technicians', JSON.stringify(updated));
}

// ── Update a technician (e.g., add certifications) ──
export async function updateTechnician(id: string, updates: Partial<Technician>): Promise<void> {
    if (useCloud) {
        await apiCall(`/technicians/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
        return;
    }

    // localStorage fallback
    const existing = JSON.parse(localStorage.getItem('3dts_technicians') || '[]');
    const updated = existing.map((t: Technician) => t.id === id ? { ...t, ...updates, id } : t);
    localStorage.setItem('3dts_technicians', JSON.stringify(updated));
}

// ── Save an evaluation result to a technician ──
export async function saveResult(techId: string, result: EvaluationResult): Promise<void> {
    if (useCloud) {
        await apiCall(`/technicians/${techId}/results`, {
            method: 'POST',
            body: JSON.stringify(result),
        });
        return;
    }

    // localStorage fallback
    const existing = JSON.parse(localStorage.getItem('3dts_technicians') || '[]');
    const updated = existing.map((t: Technician) => {
        if (t.id === techId) {
            return {
                ...t,
                lastEvaluated: new Date().toISOString(),
                results: [result, ...t.results],
            };
        }
        return t;
    });
    localStorage.setItem('3dts_technicians', JSON.stringify(updated));
}
