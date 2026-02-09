
export type ServiceType = 'airtime' | 'data' | 'electricity' | 'cable';
export type UserRole = 'customer' | 'reseller';

interface PricingResult {
    costPrice: number;
    sellingPrice: number;
    profit: number;
    appliedRole: UserRole;
}

/**
 * Calculates the final selling price based on service type and user role.
 * 
 * Rules:
 * - Airtime: Cost * 1.03 (3% Profit)
 * - Data: Cost + 50 (Fixed Profit)
 * - Bills (Cable/Power): Cost + 100 (Service Fee)
 * 
 * Reseller Discount:
 * - 20% off the PROFIT margin.
 */
export function calculateVtuPrice(costPrice: number, type: ServiceType, role: UserRole = 'customer'): PricingResult {
    let baseSellingPrice = 0;

    // 1. Calculate Base Selling Price (Standard Customer Price)
    switch (type) {
        case 'airtime':
            baseSellingPrice = costPrice * 1.03;
            break;
        case 'data':
            baseSellingPrice = costPrice + 50;
            break;
        case 'electricity':
        case 'cable':
            baseSellingPrice = costPrice + 100;
            break;
        default:
            baseSellingPrice = costPrice; // Fallback
    }

    // Ensure integer for clean UI (optional, but standard for Naira)
    // baseSellingPrice = Math.ceil(baseSellingPrice); 

    // 2. Calculate Standard Profit
    const standardProfit = baseSellingPrice - costPrice;

    // 3. Apply Reseller Discount if applicable
    let finalProfit = standardProfit;
    if (role === 'reseller') {
        const discount = standardProfit * 0.20; // 20% of profit
        finalProfit = standardProfit - discount;
    }

    const finalSellingPrice = costPrice + finalProfit;

    return {
        costPrice,
        sellingPrice: Number(finalSellingPrice.toFixed(2)),
        profit: Number(finalProfit.toFixed(2)),
        appliedRole: role
    };
}
