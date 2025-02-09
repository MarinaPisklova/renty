import PropertySearchForm from './PropertySearchForm';

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

                <PropertySearchForm />
            </div>
        </section>
    );
}
