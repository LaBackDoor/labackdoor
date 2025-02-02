import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback, useRef } from 'react';

import { GROUP_PAGE, PROJECTS_PAGE } from '../../resources/paths';
import { useLayout } from '../../hooks/useLayout';
import { BackIcon } from '../../resources/icons';
import { AboutOverlay } from '../../pages/About';
import Footer from '../Footer';
import Logo from '../Logo';


interface IUnifiedNavigation {
    navType: 'group' | 'projects';
    className?: string;
}

const UnifiedNavigation: React.FC<IUnifiedNavigation> = ({ navType, className = '' }) => {
    const [showFloatingLogo, setShowFloatingLogo] = useState(false);
    const [showBottomNavLogo, setShowBottomNavLogo] = useState(false);
    const [logoPosition, setLogoPosition] = useState(0);
    const [isTopNavVisible, setIsTopNavVisible] = useState(true);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    // const previousScrollY = useRef(0);
    const { layout } = useLayout();

    const easeInOutCubic = useCallback((t: number): number => {
        const t2 = t * t;
        const t3 = t2 * t;
        return t < 0.5 ? 4 * t3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }, []);

    const getNavTextStyles = useCallback(() => {
        switch (layout) {
            case 'primary':
                return "text-[#C2A87A]";
            case 'secondary':
                return "text-[#71717A]";
            case 'tertiary':
                return "text-[#DDCECD]";
            default:
                return "text-[#71717A]";
        }
    }, [layout]);

    const toggleAbout = () => {
        setIsAboutOpen(!isAboutOpen);
        document.body.classList.toggle('overflow-hidden');
    };

    const handleScroll = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            if (!contentRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

            if (scrollPercentage > 85) {
                setIsTopNavVisible(false);
                setShowFloatingLogo(true);

                const startPosition = 0;
                const finalPosition = window.innerHeight - 100;
                const progress = Math.min((scrollPercentage - 85) / 15, 1);
                const easedProgress = easeInOutCubic(progress);
                const currentPosition = startPosition + (finalPosition - startPosition) * easedProgress;

                setLogoPosition(currentPosition);
                setShowBottomNavLogo(progress >= 0.9);
            } else {
                setIsTopNavVisible(true);
                setShowFloatingLogo(false);
                setShowBottomNavLogo(false);
            }
        });
    }, [easeInOutCubic]);

    const handleResize = useCallback(
        debounce(() => {
            handleScroll();
        }, 150),
        [handleScroll]
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            handleResize.cancel();
        };
    }, [handleScroll, handleResize]);

    const renderNavigationContent = () => {
        const commonClasses = `hidden md:flex items-start justify-start gap-12 mx-5 mt-0.5 text-sm ${getNavTextStyles()}`;

        return (
            <div className={commonClasses}>
                <div className="flex flex-col">
                    <p className="font-extralight">
                        Research Lab of <span className="font-bold">
                            <a href="https://www.linkedin.com/in/abaniseorojo/">Abanisenioluwa Orojo</a>
                        </span> & <br />
                        <span className="font-bold">
                            <a href="https://www.linkedin.com/in/webster-elumelu/">Webster Elumelu</a>
                        </span>
                    </p>
                </div>

                <div className="flex flex-col ml-2">
                    <span>USA</span>
                    <span>
                        <a href="mailto:hello@labackdoor.com">hello@labackdoor.com</a>
                    </span>
                </div>

                <div className="flex items-center ml-4">
                    <Link
                        to={navType === 'group' ? PROJECTS_PAGE : GROUP_PAGE}
                        className="hover:opacity-80"
                    >
                        {navType === 'group' ? 'projects' : 'group'}
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div ref={contentRef} className="min-h-screen relative">
            {/* Top Navigation */}
            <nav
                className={`fixed top-0 left-0 w-full bg-transparent z-50 py-4 
                transition-all duration-300 ${className}
                ${isTopNavVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="flex justify-between items-center mx-5">
                    <div className="flex items-center gap-28">
                        <div className="font-drukcond">
                            <Logo />
                        </div>
                        <div className={`grid gap-1 font-normal text-sm ${getNavTextStyles()}`}>
                            <button
                                onClick={toggleAbout}
                                className="hover:opacity-80 font-bold text-left"
                            >
                                about
                            </button>
                            <Link
                                to={navType === 'group' ? GROUP_PAGE : PROJECTS_PAGE}
                                className="hover:opacity-80 font-bold text-left"
                            >
                                {navType}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link to="/" className="hover:opacity-80 px-14">
                            <BackIcon className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Floating Logo */}
            {showFloatingLogo && (
                <div
                    className="fixed left-1/2 transform -translate-x-1/2 transition-all"
                    style={{
                        top: logoPosition,
                        opacity: showBottomNavLogo ? 0 : 1,
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <Logo />
                </div>
            )}

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full">
                <nav className={`transition-opacity duration-300 ${showBottomNavLogo ? 'opacity-100' : 'opacity-0'}`}>
                    {renderNavigationContent()}
                </nav>
                <div className="mt-5">
                    <Footer />
                </div>
            </div>

            <AboutOverlay
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />
        </div>
    );
};

export default UnifiedNavigation;