import { FaBed, FaBath, FaRulerCombined, FaTimes, FaCheck, FaMapMarker } from 'react-icons/fa';
import { Property } from '@/app/properties/types';
import PropertyMap from './PropertyMap';

const propertyTypeMap = {
    House: 'Дом',
    Apartment: 'Апартаменты',
    CabinOrCottage: 'Коттедж',
    Room: 'Комната',
    Studio: 'Студия',
    Other: 'Другое',
};

export default function PropertyDetails({ property }: { property: Property }) {
    return (
        <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">
                    {propertyTypeMap[property.type as keyof typeof propertyTypeMap]}{' '}
                </div>
                <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className="text-lg text-orange-700 mr-2" />
                    <p className="text-orange-700">
                        {property.location.street}, {property.location.city}{' '}
                        {property.location.state}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                    Тарифы и опции
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Посуточно</div>
                        <div className="text-2xl font-bold text-emerald-500">
                            {property.rates.nightly ? (
                                `${property.rates.nightly.toLocaleString()} руб`
                            ) : (
                                <FaTimes className="text-red-700" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">За неделю</div>
                        <div className="text-2xl font-bold text-emerald-500">
                            {property.rates.weekly ? (
                                `${property.rates.weekly.toLocaleString()} руб`
                            ) : (
                                <FaTimes className="text-red-700" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">за месяц</div>
                        <div className="text-2xl font-bold text-emerald-500">
                            {property.rates.monthly ? (
                                `${property.rates.monthly.toLocaleString()} руб`
                            ) : (
                                <FaTimes className="text-red-700" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Описание и детали</h3>
                <div className="flex justify-center gap-4 text-emerald-500 mb-4 text-xl space-x-9">
                    <p>
                        <FaBed className="inline-block mr-2" /> {property.beds}{' '}
                        <span className="hidden sm:inline">Спальни</span>
                    </p>
                    <p>
                        <FaBath className="inline-block mr-2" /> {property.baths}{' '}
                        <span className="hidden sm:inline">Ванные комнаты</span>
                    </p>
                    <p>
                        <i className="fa-solid fa-ruler-combined"></i>
                        <FaRulerCombined className="inline-block mr-2" />
                        {property.square_meter} <span className="hidden sm:inline">кв.м</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4 text-center">{property.description}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Удобства</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none gap-y-2 gap-x-4">
                    {property.amenities.map((amenity, index) => (
                        <li key={index}>
                            <FaCheck className="inline-block text-green-600 mr-2" /> {amenity}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6 relative">
                <PropertyMap property={property} />
            </div>
        </main>
    );
}
