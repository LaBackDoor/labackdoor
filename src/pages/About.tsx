import { useEffect } from 'react';

import { useLayout } from '../hooks/useLayout';
import Button from '../components/Button';
// import Button from '../components/Button';


interface IAbout {
    isOpen?: boolean;
    onClose?: () => void;
}

export function AboutOverlay({ isOpen, onClose }: IAbout) {
    const { layout } = useLayout();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const getBgColor = () => {
        switch (layout) {
            case 'primary':
                return 'bg-primary-main/95';
            case 'secondary':
                return 'bg-secondary-main/95';
            case 'tertiary':
                return 'bg-tertiary-main/95';
            default:
                return 'bg-primary-main/95';
        }
    };

    return (
        <div
            className={`fixed font-akzidenz inset-0 z-50 transition-all duration-500 ease-in-out ${getBgColor()}
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`h-full w-full transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                {/* <button
                    onClick={onClose}
                    className="absolute p-2 text-current transition-opacity top-8 right-8 hover:opacity-70"
                    aria-label="Close overlay"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button> */}
                <Button
                    variant='close'
                    onClick={onClose}
                    className="absolute p-2 text-current transition-opacity top-8 right-8 hover:opacity-70"
                />


                <div className="container h-screen px-4 py-16 mx-auto overflow-y-auto">
                    <div className="grid gap-8 md:grid-cols-3 md:gap-12">
                        {/* Column 1 - Main Brief */}
                        <div className="space-y-6">
                            <h2 className="mb-8 text-3xl font-bold">
                                Specializing in the layfication of academic findings in cybersecurity, computer science, and data analytics.
                            </h2>
                            <p className="text-lg">
                                We bridge the gap between complex academic research and practical understanding, making cutting-edge insights accessible to all.
                            </p>
                            <p className="text-lg">
                                Our focus lies in translating sophisticated technical concepts into clear, engaging content that maintains academic integrity while ensuring broad accessibility.
                            </p>
                        </div>

                        {/* Column 2 - Availability & Services */}
                        <div>
                            <div className="mb-12">
                                <h3 className="mb-4 text-xl font-semibold">Availability</h3>
                                <p className="text-lg">January 2025 &#8211;&#8211;&#8211;</p>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xl font-semibold">Services</h3>
                                <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Column 3 - Reserved for future content */}
                        <div className="w-full h-full bg-white rounded-lg bg-opacity-10"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

<div className="container h-full px-4 py-16 mx-auto overflow-y-auto">
    <div className="grid gap-8 text-current md:grid-cols-3 md:gap-12">
        {/* Your columns content... */}
    </div>
</div>



{/*
     <p className="text-lg">January 2025 &#8211;&#8211;&#8211;</p>      
*/}

