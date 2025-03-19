import PropertyEditForm from '@/components/PropertyEditForm';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { Property as PropertyType } from '@/app/properties/types';

export default async function PropertyEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectDB();

    const propertyDoc = await Property.findById(id).lean<PropertyType>();

    const property = propertyDoc && convertToSerializableObject(propertyDoc);

    if (!property) {
        return <h1 className="text-center text-2xl font-bold mt-10">Недвижимость не найдена</h1>;
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <PropertyEditForm property={property} />
                </div>
            </div>
        </section>
    );
}
