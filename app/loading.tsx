'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100px auto',
};

export default function LoadingPage({ loading }: { loading: boolean }) {
    return (
        <ClipLoader
            color="#047857"
            cssOverride={override}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
        />
    );
}
