import Link from 'next/link';

interface IPaginationProps {
    page: number;
    pageSize: number;
    totalItems: number;
}

export default function Pagination({ page, pageSize, totalItems }: IPaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <section className="container mx-auto flex justify-center items-center my-8">
            {page > 1 ? (
                <Link
                    className="mr-2 px-2 py-1 border border-gray-300 rounded"
                    href={`/properties?page=${page - 1}`}
                >
                    Предыдущая
                </Link>
            ) : null}
            <span className="mx-2">
                Страница {page} из {totalPages}
            </span>
            {page < totalPages ? (
                <Link
                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                    href={`/properties?page=${page + 1}`}
                >
                    Следующая
                </Link>
            ) : null}
        </section>
    );
}
