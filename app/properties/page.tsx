import Properties from '@/components/Properties';
import PropertySearchForm from '@/components/PropertySearchForm';
import Property from '@/models/Property';
import connectDB from '@/config/database';

export default async function PropertiesPage({
    searchParams,
}: {
    searchParams: Promise<{ pageSize: number; page: number }>;
}) {
    const { pageSize = 6, page = 1 } = await searchParams;

    await connectDB();

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    return (
        <>
            <section className="bg-emerald-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            <Properties properties={properties} total={total} page={page} pageSize={pageSize} />
        </>
    );
}
