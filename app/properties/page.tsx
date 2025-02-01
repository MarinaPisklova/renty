import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';

export default async function PropertiesPage() {
    const properties = await fetchProperties();

    properties?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {!properties || properties.length === 0 ? (
                    <p>Недвижимость не найдена</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property, index) => (
                            <PropertyCard property={property} key={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
