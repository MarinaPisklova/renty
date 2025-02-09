'use client';

import { PropertyFields } from '@/app/properties/types';
import { fetchProperty } from '@/utils/requests';
import { useParams, useRouter } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function PropertyEditForm() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [fields, setFields] = useState<PropertyFields>({
        type: '',
        name: '',
        description: '',
        location: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
        },
        beds: 0,
        baths: 0,
        square_meter: 0,
        amenities: [],
        rates: {
            weekly: 0,
            monthly: 0,
            nightly: 0,
        },
        seller_info: {
            name: '',
            email: '',
            phone: '',
        },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);

        // Fetch property data for form
        const fetchPropertyData = async () => {
            if (!id) return;
            try {
                const propertyData = await fetchProperty(id);
                if (!propertyData) return;

                if (propertyData && propertyData.rates) {
                    const defaultRates = { ...propertyData.rates };
                    for (const rate in defaultRates) {
                        const ind = rate as keyof typeof defaultRates;
                        if (defaultRates[ind] === null) {
                            defaultRates[ind] = 0;
                        }
                    }
                    propertyData.rates = defaultRates;
                }

                setFields(propertyData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFields((prevFields) => {
            if (name.includes('.')) {
                const [outerKey, innerKey] = name.split('.') as [keyof PropertyFields, string];

                if (typeof prevFields[outerKey] === 'object' && prevFields[outerKey] !== null) {
                    return {
                        ...prevFields,
                        [outerKey]: {
                            ...prevFields[outerKey],
                            [innerKey]: value,
                        },
                    };
                }
            } else {
                return {
                    ...prevFields,
                    [name]: value,
                };
            }

            return prevFields;
        });
    };
    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        const updatedAmenites = [...fields.amenities];

        if (checked) {
            updatedAmenites.push(value);
        } else {
            const index = updatedAmenites.indexOf(value);

            if (index !== -1) {
                updatedAmenites.splice(index, 1);
            }
        }

        setFields((prevFields) => ({
            ...prevFields,
            amenities: updatedAmenites,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);

            const res = await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (res.status === 200) {
                router.push(`/properties/${id}`);
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Доступ запрещен');
            } else {
                toast.error('Что-то пошло не так');
            }
        } catch (error) {
            console.log(error);
            toast.error('Что-то пошло не так');
        }
    };

    return (
        mounted &&
        !loading && (
            <form onSubmit={handleSubmit}>
                <h2 className="text-3xl text-center font-semibold mb-6">
                    Редактировать объявление
                </h2>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                        Тип недвижимости
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="border rounded w-full py-2 px-3"
                        required
                        value={fields.type}
                        onChange={handleChange}
                    >
                        <option value="Apartment">Апартаменты</option>
                        <option value="House">Дом</option>
                        <option value="CabinOrCottage">Коттедж</option>
                        <option value="Room">Комната</option>
                        <option value="Studio">Студия</option>
                        <option value="Other">Другое</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Заголовок объявления
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="например, Красивая квартира в Сочи"
                        required
                        value={fields.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="border rounded w-full py-2 px-3"
                        rows={4}
                        placeholder="Добавьте дополнительное описание вашей недвижимости"
                        value={fields.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-4 bg-blue-50 p-4">
                    <label className="block text-gray-700 font-bold mb-2">Расположение</label>
                    <input
                        type="text"
                        id="street"
                        name="location.street"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Улица"
                        value={fields.location.street}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="city"
                        name="location.city"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Город"
                        required
                        value={fields.location.city}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="state"
                        name="location.state"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Страна"
                        required
                        value={fields.location.state}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        id="zipcode"
                        name="location.zipcode"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Индекс"
                        value={fields.location.zipcode}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4 flex flex-wrap">
                    <div className="w-full sm:w-1/3 pr-2">
                        <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
                            Количество спальных мест
                        </label>
                        <input
                            type="number"
                            id="beds"
                            name="beds"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={fields.beds}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full sm:w-1/3 px-2">
                        <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
                            Количество ванных комнат
                        </label>
                        <input
                            type="number"
                            id="baths"
                            name="baths"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={fields.baths}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full sm:w-1/3 pl-2">
                        <label
                            htmlFor="square_meter"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Площадь, кв.м
                        </label>
                        <input
                            type="number"
                            id="square_meter"
                            name="square_meter"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={fields.square_meter}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Удобства</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_wifi"
                                name="amenities"
                                value="Wifi"
                                className="mr-2"
                                checked={fields.amenities.includes('Wifi')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_wifi">Wifi</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_kitchen"
                                name="amenities"
                                value="Кухня"
                                className="mr-2"
                                checked={fields.amenities.includes('Кухня')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_kitchen">Кухня</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_washer_dryer"
                                name="amenities"
                                value="Стиральная машина и сушилка"
                                className="mr-2"
                                checked={fields.amenities.includes('Стиральная машина и сушилка')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_washer_dryer">
                                Стиральная машина и сушилка
                            </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_free_parking"
                                name="amenities"
                                value="Парковка"
                                className="mr-2"
                                checked={fields.amenities.includes('Парковка')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_free_parking">Парковка</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_pool"
                                name="amenities"
                                value="Бассейн"
                                className="mr-2"
                                checked={fields.amenities.includes('Бассейн')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_pool">Бассейн</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_hot_tub"
                                name="amenities"
                                value="Джакузи"
                                className="mr-2"
                                checked={fields.amenities.includes('Джакузи')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_hot_tub">Джакузи</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_24_7_security"
                                name="amenities"
                                value="Круглосуточная охрана"
                                className="mr-2"
                                checked={fields.amenities.includes('Круглосуточная охрана')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_24_7_security">Круглосуточная охрана</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_wheelchair_accessible"
                                name="amenities"
                                value="Доступно для инвалидных колясок"
                                className="mr-2"
                                checked={fields.amenities.includes(
                                    'Доступно для инвалидных колясок',
                                )}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_wheelchair_accessible">
                                Доступно для инвалидных колясок
                            </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_elevator_access"
                                name="amenities"
                                value="Лифт"
                                className="mr-2"
                                checked={fields.amenities.includes('Лифт')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_elevator_access">Лифт</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_dishwasher"
                                name="amenities"
                                value="Посудомоечная машина"
                                className="mr-2"
                                checked={fields.amenities.includes('Посудомоечная машина')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_dishwasher">Посудомоечная машина</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_gym_fitness_center"
                                name="amenities"
                                value="Тренажерный зал/Фитнес-центр"
                                className="mr-2"
                                checked={fields.amenities.includes('Тренажерный зал/Фитнес-центр')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_gym_fitness_center">
                                Тренажерный зал/Фитнес-центр
                            </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_air_conditioning"
                                name="amenities"
                                value="Кондиционер"
                                className="mr-2"
                                checked={fields.amenities.includes('Кондиционер')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_air_conditioning">Кондиционер</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_balcony_patio"
                                name="amenities"
                                value="Балкон"
                                className="mr-2"
                                checked={fields.amenities.includes('Балкон')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_balcony_patio">Балкон</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_smart_tv"
                                name="amenities"
                                value="Smart TV"
                                className="mr-2"
                                checked={fields.amenities.includes('Smart TV')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_smart_tv">Smart TV</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="amenity_coffee_maker"
                                name="amenities"
                                value="Кофемашинаr"
                                className="mr-2"
                                checked={fields.amenities.includes('Кофемашинаr')}
                                onChange={handleAmenitiesChange}
                            />
                            <label htmlFor="amenity_coffee_maker">Кофемашина</label>
                        </div>
                    </div>
                </div>

                <div className="mb-4 bg-blue-50 p-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Тарифы (Оставьте пустым, если нет необходимости)
                    </label>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center">
                            <label htmlFor="weekly_rate" className="mr-2">
                                за неделю
                            </label>
                            <input
                                type="number"
                                id="weekly_rate"
                                name="rates.weekly"
                                className="border rounded w-full py-2 px-3"
                                value={fields.rates.weekly}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="monthly_rate" className="mr-2">
                                за месяц
                            </label>
                            <input
                                type="number"
                                id="monthly_rate"
                                name="rates.monthly"
                                className="border rounded w-full py-2 px-3"
                                value={fields.rates.monthly}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="nightly_rate" className="mr-2">
                                посуточно
                            </label>
                            <input
                                type="number"
                                id="nightly_rate"
                                name="rates.nightly"
                                className="border rounded w-full py-2 px-3"
                                value={fields.rates.nightly}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="seller_name" className="block text-gray-700 font-bold mb-2">
                        Собственник
                    </label>
                    <input
                        type="text"
                        id="seller_name"
                        name="seller_info.name."
                        className="border rounded w-full py-2 px-3"
                        placeholder="Имя"
                        value={fields.seller_info.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="seller_email" className="block text-gray-700 font-bold mb-2">
                        Электронная почта
                    </label>
                    <input
                        type="email"
                        id="seller_email"
                        name="seller_info.email"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Email"
                        required
                        value={fields.seller_info.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="seller_phone" className="block text-gray-700 font-bold mb-2">
                        Телефон
                    </label>
                    <input
                        type="tel"
                        id="seller_phone"
                        name="seller_info.phone"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Номер телефона"
                        value={fields.seller_info.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Сохранить изменения
                    </button>
                </div>
            </form>
        )
    );
}
