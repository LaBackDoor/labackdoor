import { useEffect, useRef, useState } from 'react';

import UnifiedNavigation from '../components/Nav/UnifiedNavigation';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const Group = () => {
    const [showBottomNavLogo, setShowBottomNavLogo] = useState(false);
    const [showFloatingLogo, setShowFloatingLogo] = useState(false);
    const [logoPosition, setLogoPosition] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    // easing function for smooth animation
    const easeInOutCubic = (x: number): number => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

                if (scrollPercentage > 85) {
                    setShowFloatingLogo(true);
                    // calculate logo position
                    const startPosition = 0;
                    const finalPosition = window.innerHeight - 100;
                    const progress = Math.min((scrollPercentage - 85) / 15, 1);
                    const easedProgress = easeInOutCubic(progress);
                    const currentPosition = startPosition + (finalPosition - startPosition) * easedProgress;
                    setLogoPosition(currentPosition);

                    // show bottom nav logo when floating logo reaches bottom
                    setShowBottomNavLogo(progress >= 0.9);
                } else {
                    setShowFloatingLogo(false);
                    setShowBottomNavLogo(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={contentRef} className="min-h-screen relative">
            {/* <Navbar2 /> */}
            <UnifiedNavigation navType='group'/>

            {/* main content */}
            <div className="pt-24 pb-48">
                <div className="h-screen"></div>
                <div className="h-screen"></div>
            </div>

            {/* floating logo */}
            {showFloatingLogo && (
                <div
                    className="fixed left-1/2 transform -translate-x-1/2 transition-all"
                    style={{
                        top: logoPosition,
                        transition: 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: showBottomNavLogo ? 0 : 1
                    }}
                >
                    <Logo />
                </div>
            )}

            {/* bottom navigation */}
            <div className="fixed bottom-0 left-0 w-full">
                {/* <Navbar
                    className="bottom-navbar"
                    showLogo={showBottomNavLogo}
                /> */}
                <Footer />
            </div>
        </div>
    );
};

export default Group;
