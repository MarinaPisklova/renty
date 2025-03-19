import { Property } from '@/app/properties/types';
import PropertyCard from '@/components/PropertyCard';
import Pagination from './Pagination';

interface IProperties {
    properties: Property[];
    total: number;
    page: number;
    pageSize: number;
}

export default function Properties({ properties, total, page, pageSize }: IProperties) {
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {!properties || properties.length === 0 ? (
                    <p>Недвижимость не найдена</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property, index) => (
                                <PropertyCard property={property} key={index} />
                            ))}
                        </div>
                        <Pagination page={page} pageSize={pageSize} totalItems={total} />
                    </>
                )}
            </div>
        </section>
    );
}
