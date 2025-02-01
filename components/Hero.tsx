export default function Hero() {
    return (
        <section className="bg-emerald-700 py-20 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                        Найдите идеальный вариант аренды
                    </h1>
                    <p className="my-4 text-xl text-white">
                        Найдите идеальную недвижимость, которая соответствует вашим потребностям.
                    </p>
                </div>

                <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                        <label htmlFor="location" className="sr-only">
                            Расположение
                        </label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Введите местоположение (город, район, почтовый индекс и т.д.)"
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-emerald-500"
                        />
                    </div>
                    <div className="w-full md:w-2/5 md:pl-2">
                        <label htmlFor="property-type" className="sr-only">
                            Тип недвижимости
                        </label>
                        <select
                            id="property-type"
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-emerald-500"
                        >
                            <option value="All">Все</option>
                            <option value="Apartment">Квартира</option>
                            <option value="Studio">Студия</option>
                            <option value="Condo">Кондо</option>
                            <option value="House">Дом</option>
                            <option value="Cabin Or Cottage">Домик или коттедж</option>
                            <option value="Loft">Лофт</option>
                            <option value="Room">Комната</option>
                            <option value="Other">Другое</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-500"
                    >
                        Поиск
                    </button>
                </form>
            </div>
        </section>
    );
}
