import connectDB from '@/config/database';
import Property from '@/models/Property';

//GET /api/properties/:id
export const GET = async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDB();

        const id = (await params).id;
        const property = await Property.findById(id);

        if (!property) {
            return new Response('Property not found', {
                status: 404,
            });
        }

        return new Response(JSON.stringify(property), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch property', {
            status: 500,
        });
    }
};
