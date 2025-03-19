'use client';

import { Property as PropertyType } from '@/app/properties/types';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

interface IProfilePropertiesProps {
    properties: PropertyType[];
}

export default function ProfileProperties({
    properties: initialProperties,
}: IProfilePropertiesProps) {
    const [properties, setProperties] = useState(initialProperties);

    const handleDeleteProperty = async (propertyId: string) => {
        const confirmed = window.confirm('Вы уверены, что хотите удалить объявление?');

        if (!confirmed) return;

        await deleteProperty(propertyId);

        toast.success('Объявление удалено');

        const updatedProperties = properties.filter((property) => property._id !== propertyId);

        setProperties(updatedProperties);
    };

    return properties.map((property) => (
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
                    Адрес: {property.location.street} {property.location.city}{' '}
                    {property.location.state}
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
    ));
}
