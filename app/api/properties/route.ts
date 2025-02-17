import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

//GET /api/properties
export const GET = async (request: Request) => {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const pageSize = Number(searchParams.get('pageSize')) || 6;

        const skip = (page - 1) * pageSize;

        const total = await Property.countDocuments({});
        const properties = await Property.find({}).skip(skip).limit(pageSize);

        const result = {
            total,
            properties,
        };

        return new Response(JSON.stringify(result), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return Response.json('Failed to fetch properties', {
            status: 500,
        });
    }
};

//POST /api/properties
export const POST = async (request: Request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return Response.json('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');
        const images = (formData.getAll('images') as File[]).filter((image) => image.name !== '');

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
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
            images: [] as string[],
        };

        const imageUrls = [];

        for (const imageFile of images) {
            const imageBuffer = await imageFile.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            const imageBase64 = imageData.toString('base64');

            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                {
                    folder: 'renty',
                },
            );

            imageUrls.push(result.secure_url);
        }

        propertyData.images = imageUrls;

        const newProperty = new Property(propertyData);
        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (error) {
        console.log(error);
        return Response.json('Failed to add property', { status: 500 });
    }
};
