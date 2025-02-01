import { Property } from '@/app/properties/types';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties(): Promise<Property[] | undefined> {
    try {
        if (!apiDomain) {
            return [];
        }

        const res = await fetch(`${apiDomain}/properties`);
        if (!res.ok) {
            throw new Error('Failed to fetch properties');
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}
