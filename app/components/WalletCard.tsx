
import Link from 'next/link';

export default function WalletCard() {
    return (
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-indigo-100 text-sm font-medium mb-1">Wallet Balance</p>
                <h2 className="text-3xl font-bold mb-6">₦ 0.00</h2>

                <div className="flex gap-4">
                    <button className="flex-1 bg-white text-indigo-600 py-2.5 px-4 rounded-xl font-semibold text-sm shadow-sm hover:bg-indigo-50 transition-colors">
                        + Fund Wallet
                    </button>
                    <button className="flex-1 bg-indigo-500/50 text-white py-2.5 px-4 rounded-xl font-semibold text-sm backdrop-blur-sm hover:bg-indigo-500/70 transition-colors">
                        History
                    </button>
                </div>
            </div>

            {/* Decorative background circles */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
    );
}
