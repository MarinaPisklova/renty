'use client';

import { Property } from '@/app/properties/types';
import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import Spinner from './Spinner';

interface IPropertyMapProps {
    property: Property;
}

const mapState = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: [],
};

export default function PropertyMap({ property }: IPropertyMapProps) {
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [savedYmaps, setSavedYmaps] = useState<YMapsApi>();
    const location = property.location;
    const addressString = `${location.street}, ${location.city}, ${location.state}, ${location.zipcode}`;

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                setLoading(true);
                const result = await savedYmaps?.geocode(addressString, {
                    provider: 'yandex#map',
                });
                const newCoords = result?.geoObjects?.get(0)?.geometry?.getBounds()?.[0];
                const precision = result?.geoObjects
                    ?.get(0)
                    ?.properties?.get('metaDataProperty.GeocoderMetaData.precision', {})
                    .toString();

                if (newCoords) {
                    if (precision !== 'exact') {
                        setError('Данные о местоположении не найдены');
                        setLoading(false);
                    } else {
                        setCoordinates([newCoords[0], newCoords[1]]);
                        setLoading(false);
                    }
                } else {
                    if (savedYmaps) setError('Данные о местоположении не найдены');
                    setLoading(false);
                }

                return null;
            } catch (error) {
                setError(`Ошибка геокодирования: ${error}`);
                setLoading(false);
                return null;
            }
        };

        fetchCoords();
    }, [addressString, savedYmaps]);

    if (error) {
        return <div className="text-xl">{error}</div>;
    }

    return (
        <>
            <YMaps
                query={{
                    apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY,
                    load: 'package.full',
                }}
            >
                {loading && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white z-10 opacity-50">
                        <Spinner loading={loading} />
                    </div>
                )}
                <Map
                    state={coordinates ? { ...mapState, center: coordinates } : mapState}
                    width="100%"
                    height="400px"
                    onLoad={(ymaps) => {
                        setSavedYmaps(ymaps);
                    }}
                >
                    {coordinates && <Placemark geometry={coordinates} />}
                </Map>
            </YMaps>
        </>
    );
}
