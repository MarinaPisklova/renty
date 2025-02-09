import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

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

// DELETE /api/properties/:id
export const DELETE = async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const propertyId = (await params).id;
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;

        await connectDB();

        const property = await Property.findById(propertyId);

        if (!property) return new Response('Property Not Found', { status: 404 });

        if (property.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        await property.deleteOne();

        return new Response('Property Deleted', {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};

// PUT /api/properties/:id
export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const id = (await params).id;
        const { userId } = sessionUser;

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');
        const existingProperty = await Property.findById(id);

        if (!existingProperty) {
            return new Response('Property does not exist', { status: 404 });
        }

        if (existingProperty.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_meter: formData.get('square_meter'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly.'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        };

        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

        return new Response(JSON.stringify(updatedProperty), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to add property', { status: 500 });
    }
};
