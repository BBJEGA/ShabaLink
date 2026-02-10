
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { isquare } from '@/lib/isquare';
import { calculateVtuPrice, ServiceType, UserTier } from '@/utils/pricing';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as ServiceType;
    const serviceId = searchParams.get('service_id');

    if (!['data', 'cable', 'electricity'].includes(type)) {
        return NextResponse.json({ error: 'Invalid service type' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Get User Tier
    let userTier: UserTier = 'smart';

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('tier')
            .eq('id', user.id)
            .single();

        if (profile?.tier) {
            userTier = profile.tier as UserTier;
        }
    }

    try {
        // 2. Fetch Base Plans from Provider V2 Variations
        const apiType = type === 'cable' ? 'tv' : (type as any);
        const response = await isquare.getVariations(apiType, serviceId || undefined);
        const plans = Array.isArray(response) ? response : (response.data || response.variations || []);

        // 3. Apply Pricing Logic
        const pricedPlans = plans.map((plan: Record<string, unknown>) => {
            const cost = Number(plan.amount || plan.price || plan.cost) || 0;
            if (cost === 0) return plan;

            const pricing = calculateVtuPrice(cost, type, userTier);

            return {
                ...plan,
                id: plan.id || plan.variation_id || plan.variation_code,
                name: plan.name || plan.variation_name,
                amount: pricing.sellingPrice,
                original_amount: pricing.costPrice,
                tier_applied: pricing.appliedTier
            };
        });

        return NextResponse.json({
            success: true,
            data: pricedPlans,
            debug_raw: response
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch plans' }, { status: 500 });
    }
}
