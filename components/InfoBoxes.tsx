import InfoBox from './InfoBox';

export default function InfoBoxes() {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox
                        title="Для арендаторов"
                        buttonInfo={{
                            text: 'Просмотреть недвижимость',
                            link: '/properties',
                        }}
                    >
                        Найдите свою идеальную арендуемую недвижимость. Добавьте недвижимость в
                        закладки и свяжитесь с владельцами.
                    </InfoBox>

                    <InfoBox
                        title="Для владельцев"
                        backgroundColor="bg-emerald-100"
                        buttonInfo={{
                            text: 'Добавить недвижимость',
                            link: '/properties/add',
                            backgroundColor: 'bg-emerald-500',
                        }}
                    >
                        Разместите свои объекты и привлеките потенциальных арендаторов. Сдавайте на
                        короткий или на длительный срок.
                    </InfoBox>
                </div>
            </div>
        </section>
    );
}
