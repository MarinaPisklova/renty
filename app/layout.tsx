import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { MessageProvider } from '@/context/MessageContext';
import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

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
        <AuthProvider>
            <MessageProvider>
                <html lang="ru">
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </MessageProvider>
        </AuthProvider>
    );
}
