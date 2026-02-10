
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../../components/DashboardHeader';
import { NETWORKS } from '@/lib/isquare';
import { ArrowLeft, Check, ChevronRight, Loader2, Phone, ShieldCheck, Smartphone, Wallet } from 'lucide-react';

export default function BuyAirtimePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Form State
    const [formData, setFormData] = useState({
        network_id: '',
        amount: '',
        phone: '',
        pin: ''
    });

    // Computed Logic
    const amount = Number(formData.amount) || 0;

    const handleNetworkSelect = (id: string) => {
        setFormData(prev => ({ ...prev, network_id: id }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        if (step === 1) {
            if (!formData.network_id || !formData.amount || !formData.phone) {
                setMessage({ type: 'error', text: 'Please fill all fields' });
                return;
            }
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // We send the 'amount' (Face Value)
            const res = await fetch('/api/vtu/airtime', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Transaction failed');

            // Success Step
            setStep(3);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            <DashboardHeader />

            <div className="max-w-xl mx-auto p-4 pt-8">

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 px-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {step > s ? <Check size={16} /> : s}
                            </div>
                            <span className="text-[10px] mt-1 text-gray-500 uppercase tracking-wider font-semibold">
                                {s === 1 ? 'Details' : s === 2 ? 'Confirm' : 'Done'}
                            </span>
                        </div>
                    ))}
                    {/* Lines */}
                    <div className="absolute left-0 w-full h-0.5 bg-gray-200 -z-10 hidden"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Header */}
                    <div className="bg-blue-600 p-6 text-white text-center">
                        <h1 className="text-xl font-bold">Buy Airtime</h1>
                        <p className="text-blue-100 text-sm mt-1">Instant top-up for all networks</p>
                    </div>

                    <div className="p-6">
                        {message.text && (
                            <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {message.text}
                            </div>
                        )}

                        {/* STEP 1: DETAILS */}
                        {step === 1 && (
                            <form onSubmit={handleNext} className="space-y-6">
                                {/* Network Grid */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Select Network</label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {NETWORKS.map((net) => (
                                            <button
                                                key={net.id}
                                                type="button"
                                                onClick={() => handleNetworkSelect(net.id)}
                                                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.network_id === net.id
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-gray-100 hover:border-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                <Smartphone size={20} strokeWidth={2.5} />
                                                <span className="text-[10px] font-bold">{net.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Amount & Phone */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount (₦)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={formData.amount}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-800 text-lg"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Phone size={18} /></span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500/20 font-medium text-gray-800"
                                                placeholder="080..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-transform active:scale-95 shadow-lg shadow-blue-600/20">
                                    Next Step <ChevronRight size={18} />
                                </button>
                            </form>
                        )}


                        {/* STEP 2: CONFIRM & PIN */}
                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="text-center space-y-2">
                                    <div className="text-gray-400 text-sm font-medium uppercase tracking-widest">Confirm Transaction</div>
                                    <div className="text-3xl font-black text-gray-800">₦{amount.toFixed(2)}</div>
                                    <div className="text-sm text-gray-500">Airtime Top-up • {NETWORKS.find(n => n.id === formData.network_id)?.name}</div>
                                </div>

                                <div className="bg-blue-50 p-5 rounded-2xl space-y-3 font-medium">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Recipient Number</span>
                                        <span className="font-bold text-gray-800">{formData.phone}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Network</span>
                                        <span className="font-bold text-gray-800">{NETWORKS.find(n => n.id === formData.network_id)?.name}</span>
                                    </div>
                                    <div className="h-px bg-blue-200"></div>
                                    <div className="flex justify-between text-lg">
                                        <span className="text-blue-800 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                                        <span className="font-black text-blue-800">₦{amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Enter Transaction PIN</label>
                                    <div className="relative max-w-[200px] mx-auto">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><ShieldCheck size={18} /></span>
                                        <input
                                            type="password"
                                            name="pin"
                                            value={formData.pin}
                                            onChange={handleChange}
                                            maxLength={4}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-2 focus:border-blue-500 focus:ring-0 text-center font-bold tracking-[0.5em] text-gray-800"
                                            placeholder="••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" onClick={handleBack} className="py-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <><Wallet size={20} /> Pay Now</>}
                                    </button>
                                </div>
                            </form>
                        )}


                        {/* STEP 3: SUCCESS */}
                        {step === 3 && (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <Check size={40} strokeWidth={3} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Successful!</h2>
                                <p className="text-gray-500 mb-8">Your airtime top-up has been processed.</p>

                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-colors"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
