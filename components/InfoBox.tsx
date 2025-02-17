import Link from 'next/link';

interface IInfoBoxProps {
    title: string;
    backgroundColor?: string;
    textColor?: string;
    buttonInfo: {
        link: string;
        backgroundColor?: string;
        text: string;
    };
    children: React.ReactNode;
}

export default function InfoBox({
    title,
    backgroundColor = 'bg-gray-100',
    textColor = 'text-gray-800',
    buttonInfo,
    children,
}: IInfoBoxProps) {
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
            <p className={`${textColor} mt-2 mb-4`}>{children}</p>
            <Link
                href={buttonInfo.link}
                className={`inline-block ${
                    buttonInfo.backgroundColor ?? 'bg-black'
                } text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
                {buttonInfo.text}
            </Link>
        </div>
    );
}
