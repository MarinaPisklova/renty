import { Property as PropertyType } from '@/app/properties/types';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/ProfileProperties';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import Image from 'next/image';

export default async function ProfilePage() {
    await connectDB();

    const sessionUser = await getSessionUser();
    const userId = sessionUser?.userId;

    if (!userId) {
        throw new Error('Вы должны войти');
    }

    const propertiesDocs = await Property.find({ owner: userId }).lean<PropertyType[]>();
    const properties = propertiesDocs.map(convertToSerializableObject);

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
                                    src={sessionUser.user.image || profileDefault}
                                    width={200}
                                    height={200}
                                    alt="User"
                                />
                            </div>
                            <h2 className="text-2xl mb-4">
                                <span className="font-bold block">Имя: </span>{' '}
                                {sessionUser.user.name}
                            </h2>
                            <h2 className="text-2xl">
                                <span className="font-bold block">Email: </span>{' '}
                                {sessionUser.user.email}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Мои объявления</h2>
                            {properties.length === 0 ? (
                                <p>У вас нет объявлений</p>
                            ) : (
                                <ProfileProperties properties={properties} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
