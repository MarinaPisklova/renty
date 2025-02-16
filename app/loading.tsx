'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100px auto',
};

export default function LoadingPage() {
    return (
        <ClipLoader
            color="#047857"
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    );
}
