import { useEffect, useRef, useState } from 'react';

import { Navbar2 } from '../components/Navbar2';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

const Group = () => {
    const [showFloatingLogo, setShowFloatingLogo] = useState(false);
    const [logoPosition, setLogoPosition] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

                if (scrollPercentage > 85) {
                    setShowFloatingLogo(true);
                    // start position at the top of the viewport
                    const startPosition = 0;
                    const finalPosition = window.innerHeight - 100;
                    // normalize progress for smoother animation
                    const progress = Math.min((scrollPercentage - 85) / 15, 1);
                    // Use easing function for smoother animation
                    const easedProgress = easeInOutCubic(progress);
                    const currentPosition = startPosition + (finalPosition - startPosition) * easedProgress;
                    setLogoPosition(currentPosition);
                } else {
                    setShowFloatingLogo(false);
                }
            }
        };

        // easing function for smooth animation
        const easeInOutCubic = (x: number): number => {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={contentRef} className="min-h-screen relative">
            <Navbar2 />

            {/* main content */}
            <div className="pt-24 pb-48">
                {/* add placeholder to enable scrolling */}
                <div className="h-screen"></div>
                <div className="h-screen"></div>
            </div>

            {/* floating logo */}
            {showFloatingLogo && (
                <div
                    className="fixed left-1/2 transform -translate-x-1/2 transition-all"
                    style={{
                        top: logoPosition,
                        transition: 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <Logo />
                </div>
            )}

            {/* bottom navigation */}
            <div className="fixed bottom-0 left-0 w-full">
                <Navbar className="bottom-navbar" />
                <Footer />
            </div>
        </div>
    );
};

export default Group;
