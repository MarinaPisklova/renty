'use client';

import BookmarkButton from '@/components/BookmarkButton';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import PropertyHeaderImage from '@/components/ProperyHeaderImage';
import ShareButtons from '@/components/ShareButtons';
import Spinner from '@/components/Spinner';
import { fetchProperty } from '@/utils/requests';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Property } from '../types';
import PropertyContactForm from '@/components/PropertyContactForm';

export default function PropertyPage() {
    const { id } = useParams<{ id: string }>();

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;
            try {
                const property = await fetchProperty(id);
                setProperty(property);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };

        if (property === null) {
            fetchPropertyData();
        }
    }, [id, property]);

    if (!property && !loading) {
        return <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>;
    }

    return (
        <>
            {loading && <Spinner loading={loading} />}
            {!loading && property && (
                <>
                    <PropertyHeaderImage image={property.images[0]} />
                    <section>
                        <div className="container m-auto py-6 px-6">
                            <Link
                                href="/properties"
                                className="text-emerald-600 hover:text-emerald-700 flex items-center"
                            >
                                <FaArrowLeft className="mr-2" /> Вернуться к списку
                            </Link>
                        </div>
                    </section>

                    <section className="bg-blue-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                <PropertyDetails property={property} />
                                <aside className="space-y-4">
                                    <BookmarkButton propertyId={property._id} />
                                    <ShareButtons property={property} />
                                    <PropertyContactForm property={property} />
                                </aside>
                            </div>
                        </div>
                    </section>
                    <PropertyImages images={property.images} />
                </>
            )}
        </>
    );
}
