import { NextResponse } from 'next/server';
import { isquare } from '@/lib/isquare';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, ...params } = body;

        if (!type) {
            return NextResponse.json({ error: 'Verification type required' }, { status: 400 });
        }

        let data;
        if (type === 'electricity' || type === 'cable') {
            const apiType = type === 'cable' ? 'tv' : type;
            data = await isquare.verifyCustomer({
                service_id: params.disco_id || params.cable_id,
                customer_id: params.meter_number || params.smartcard,
                type: apiType
            });
        } else {
            return NextResponse.json({ error: 'Invalid verification type' }, { status: 400 });
        }

        // ISquare usually returns { name: "Customer Name", ... } or throws error
        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Verification failed',
            success: false
        }, { status: 500 });
    }
}
