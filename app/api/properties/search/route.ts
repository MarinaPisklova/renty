import connectDB from '@/config/database';
import Property from '@/models/Property';

type PropertyQuery = {
    $or: { [key: string]: RegExp }[];
    type?: RegExp;
};

// GET /api/properties/search
export const GET = async (request: Request) => {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location') as string;
        const propertyType = searchParams.get('propertyType');

        const locationPattern = new RegExp(location, 'i');

        const query: PropertyQuery = {
            $or: [
                { name: locationPattern },
                { description: locationPattern },
                { 'location.street': locationPattern },
                { 'location.city': locationPattern },
                { 'location.state': locationPattern },
                { 'location.zipcode': locationPattern },
            ],
        };

        if (propertyType && propertyType !== 'All') {
            const typePattern = new RegExp(propertyType, 'i');
            query.type = typePattern;
        }

        const properties = await Property.find(query);

        return Response.json(properties);
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};
