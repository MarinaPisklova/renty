import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { fetchProperties } from '@/utils/requests';

export default async function HomeProperties() {
    const data = await fetchProperties();

    const recentProperties = data?.properties
        ?.sort(() => Math.random() - Math.random())
        .slice(0, 3);

    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-emerald-500 mb-6 text-center">
                        Новые объекты недвижимости
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {!recentProperties || recentProperties.length === 0 ? (
                            <p>Недвижимость не найдена</p>
                        ) : (
                            recentProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/properties"
                    className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >
                    Вся недвижимость
                </Link>
            </section>
        </>
    );
}
