'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { Property } from '../properties/types';
import { RentySession } from '@/utils/authOptions';
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const { data: session } = useSession();
    const profileImage = session?.user?.image;
    const profileName = session?.user?.name;
    const profileEmail = session?.user?.email;

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProperties = async (userId: string) => {
            if (!userId) {
                return;
            }

            try {
                const res = await fetch(`/api/properties/user/${userId}`);

                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const userId = (session as RentySession)?.user?.id;
        if (userId) {
            fetchUserProperties(userId);
        }
    }, [session]);

    const handleDeleteProperty = async (propertyId: string) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить объявление?');

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
            });

            if (res.status === 200) {
                const updatedProperties = properties.filter(
                    (property) => property._id !== propertyId,
                );

                setProperties(updatedProperties);

                toast.success('Объявление удалено');
            } else {
                toast.error('Не удалось удалить объявление');
            }
        } catch (error) {
            console.log(error);
            toast.error('Не удалось удалить объявление');
        }
    };

    return (
        <section>
            <div className="container m-auto py-24">
                <div className=" px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 bg-blue-50">
                    <h1 className="text-3xl font-bold mb-4">Мой профиль</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefault}
                                    width={200}
                                    height={200}
                                    alt="User"
                                />
                            </div>
                            <h2 className="text-2xl mb-4">
                                <span className="font-bold block">Имя: </span> {profileName}
                            </h2>
                            <h2 className="text-2xl">
                                <span className="font-bold block">Email: </span> {profileEmail}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Мои объявления</h2>
                            {!loading && properties.length === 0 && <p>У вас нет объявлений</p>}
                            {loading ? (
                                <Spinner loading={loading} />
                            ) : (
                                properties.map((property) => (
                                    <div key={property._id} className="mb-10">
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt=""
                                                width={500}
                                                height={100}
                                                priority={true}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg font-semibold">{property.name}</p>
                                            <p className="text-gray-600">
                                                Адрес: {property.location.street}{' '}
                                                {property.location.city} {property.location.state}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <Link
                                                href={`/properties/${property._id}/edit`}
                                                className="bg-emerald-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-emerald-600"
                                            >
                                                Редактировать
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProperty(property._id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
