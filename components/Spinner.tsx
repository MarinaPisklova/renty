'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100px auto',
};

export default function Spinner({ loading }: { loading?: boolean }) {
    return (
        <ClipLoader
            color="#047857"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    );
}
