'use client';
import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import Pagination from './Pagination';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 6;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setProperties(data.properties);
                setTotalItems(data.total);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [page, pageSize]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return loading ? (
        <Spinner />
    ) : (
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
                        <Pagination
                            page={page}
                            pageSize={pageSize}
                            totalItems={totalItems}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </section>
    );
}
