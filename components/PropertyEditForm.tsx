import { Property } from '@/app/properties/types';
import SubmitButton from './SubmitButton';
import updateProperty from '@/app/actions/updateProperty';

interface IPropertyEditFormProps {
    property: Property;
}

export default function PropertyEditForm({ property }: IPropertyEditFormProps) {
    const updatePropertyById = updateProperty.bind(null, property._id);

    return (
        <form action={updatePropertyById}>
            <h2 className="text-3xl text-center font-semibold mb-6">Редактировать объявление</h2>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                    Тип недвижимости
                </label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    required
                    defaultValue={property.type}
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
                <label className="block text-gray-700 font-bold mb-2">Заголовок объявления</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="например, Красивая квартира в Сочи"
                    required
                    defaultValue={property.name}
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
                    defaultValue={property.description}
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
                    defaultValue={property.location.street}
                />
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Город"
                    required
                    defaultValue={property.location.city}
                />
                <input
                    type="text"
                    id="state"
                    name="location.state"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Страна"
                    required
                    defaultValue={property.location.state}
                />
                <input
                    type="text"
                    id="zipcode"
                    name="location.zipcode"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Индекс"
                    defaultValue={property.location.zipcode}
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
                        defaultValue={property.beds}
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
                        defaultValue={property.baths}
                    />
                </div>
                <div className="w-full sm:w-1/3 pl-2">
                    <label htmlFor="square_meter" className="block text-gray-700 font-bold mb-2">
                        Площадь, кв.м
                    </label>
                    <input
                        type="number"
                        id="square_meter"
                        name="square_meter"
                        className="border rounded w-full py-2 px-3"
                        required
                        defaultValue={property.square_meter}
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
                            defaultChecked={property.amenities.includes('Wifi')}
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
                            defaultChecked={property.amenities.includes('Кухня')}
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
                            defaultChecked={property.amenities.includes(
                                'Стиральная машина и сушилка',
                            )}
                        />
                        <label htmlFor="amenity_washer_dryer">Стиральная машина и сушилка</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="amenity_free_parking"
                            name="amenities"
                            value="Парковка"
                            className="mr-2"
                            defaultChecked={property.amenities.includes('Парковка')}
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
                            defaultChecked={property.amenities.includes('Бассейн')}
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
                            defaultChecked={property.amenities.includes('Джакузи')}
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
                            defaultChecked={property.amenities.includes('Круглосуточная охрана')}
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
                            defaultChecked={property.amenities.includes(
                                'Доступно для инвалидных колясок',
                            )}
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
                            defaultChecked={property.amenities.includes('Лифт')}
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
                            defaultChecked={property.amenities.includes('Посудомоечная машина')}
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
                            defaultChecked={property.amenities.includes(
                                'Тренажерный зал/Фитнес-центр',
                            )}
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
                            defaultChecked={property.amenities.includes('Кондиционер')}
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
                            defaultChecked={property.amenities.includes('Балкон')}
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
                            defaultChecked={property.amenities.includes('Smart TV')}
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
                            defaultChecked={property.amenities.includes('Кофемашинаr')}
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
                            defaultValue={property.rates.weekly}
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
                            defaultValue={property.rates.monthly}
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
                            defaultValue={property.rates.nightly}
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
                    defaultValue={property.seller_info.name}
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
                    defaultValue={property.seller_info.email}
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
                    defaultValue={property.seller_info.phone}
                />
            </div>

            <div>
                <SubmitButton pendingText="Сохраняем изменения..." text="Сохранить изменения" />
            </div>
        </form>
    );
}
