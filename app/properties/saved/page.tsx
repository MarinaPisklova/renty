import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { Property } from '@/app/properties/types';

export default async function SavedPage() {
    await connectDB();

    const sessionUser = await getSessionUser();
    const user = await User.findById(sessionUser?.userId)
        .populate('bookmarks')
        .lean<{ bookmarks: Property[] }>();

    const properties = user?.bookmarks;

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Избранное</h1>
                {!properties || properties.length === 0 ? (
                    <p>У вас нет сохраненных объявлений</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
