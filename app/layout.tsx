import type { Metadata } from 'next';
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';

interface IRootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Renty',
    description: 'Renty — удобное приложение для поиска и аренды недвижимости.',
    keywords: 'аренда квартир, аренда недвижимости, жильё, недвижимость',
};

export default function RootLayout({ children }: IRootLayoutProps) {
    return (
        <html lang="ru">
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}
