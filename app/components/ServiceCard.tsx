
import Link from 'next/link';
import { ReactNode } from 'react';

interface ServiceCardProps {
    title: string;
    icon: ReactNode;
    href: string;
    colorClass?: string;
}

export default function ServiceCard({ title, icon, href, colorClass = "bg-blue-50 text-blue-600" }: ServiceCardProps) {
    return (
        <Link href={href} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow active:scale-95 duration-200">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${colorClass}`}>
                {icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{title}</span>
        </Link>
    );
}
