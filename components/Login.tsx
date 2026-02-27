import React, { useState } from 'react';
import { BRAND_NAME } from '../constants';

interface LoginProps {
    onLogin: (name: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your full name');
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        if (!email.trim().toLowerCase().endsWith('@3dtsi.com')) {
            setError('Access denied. You are not authorized for this system.');
            return;
        }

        onLogin(name.trim(), email.trim().toLowerCase());
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <img
                        src="/3dtsi-logo.png"
                        alt="3D Technology Services"
                        className="mx-auto mb-6"
                        style={{ maxWidth: '280px', height: 'auto' }}
                    />
                    <p className="text-blue-400 text-sm font-bold uppercase tracking-widest mt-2">Technician Evaluation Portal</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Sign In to Begin</h2>
                        <p className="text-slate-500 text-sm mt-1">Enter your details to start your evaluation</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Smith"
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-slate-900 font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-slate-900 font-medium"
                            />
                        </div>

                        {error && (
                            <div className="bg-rose-50 text-rose-600 text-sm font-medium px-4 py-3 rounded-xl border border-rose-200">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] uppercase tracking-wider text-sm"
                        >
                            Start Evaluation
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-xs">
                            Results will be emailed to your supervisor upon completion
                        </p>
                    </div>
                </div>

                <p className="text-center text-slate-500 text-xs mt-6">
                    © {new Date().getFullYear()} 3D Technology Services • All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Login;
