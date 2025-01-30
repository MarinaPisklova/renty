import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl">Добро пожаловать</h1>
            <Link href="/properties">Недвижимость</Link>
        </div>
    );
}
