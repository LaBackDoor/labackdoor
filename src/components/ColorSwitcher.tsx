import { useState, useEffect } from 'react';

import { LAYOUT_VALUES, LayoutType } from '../resources/constants';
import { Gun, Rasp, Snow } from '../resources/icons';
import { useLayout } from '../hooks/useLayout';


type Mode = 'light' | 'night' | 'ultra';

interface IColorSwitch {
    className?: string;
};

const ColorSwitch: React.FC<IColorSwitch> = ({
    className = ''
}) => {
    const [mode, setMode] = useState<Mode>('light');
    const { layout, setLayout } = useLayout();

    useEffect(() => {
        const body = document.body;
        if (body.classList.contains('night-mode')) {
            setMode('night');
            setLayout(LAYOUT_VALUES.TERTIARY);
        } else if (body.classList.contains('ultra-mode')) {
            setMode('ultra');
            setLayout(LAYOUT_VALUES.PRIMARY);
        } else {
            setMode('light');
            setLayout(LAYOUT_VALUES.SECONDARY);
        }
    }, [setLayout]);

    const toggleMode = () => {
        const body = document.body;
        if (mode === 'light') {
            setMode('night');
            setLayout(LAYOUT_VALUES.TERTIARY as LayoutType);
            body.classList.remove('light-mode', 'ultra-mode');
            body.classList.add('night-mode');
        } else if (mode === 'night') {
            setMode('ultra');
            setLayout(LAYOUT_VALUES.PRIMARY as LayoutType);
            body.classList.remove('light-mode', 'night-mode');
            body.classList.add('ultra-mode');
        } else {
            setMode('light');
            setLayout(LAYOUT_VALUES.SECONDARY as LayoutType);
            body.classList.remove('night-mode', 'ultra-mode');
            body.classList.add('light-mode');
        }
    };

    const getButtonStyles = () => {
        const baseStyles = "p-4 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

        switch (layout) {
            case 'primary':
                return `${baseStyles} text-[#F5E9E2] bg-primary-main hover:bg-[#6096BA] focus:ring-primary-main`;
            case 'secondary':
                return `${baseStyles} text-[#000017] bg-secondary-main hover:bg-[#3626A7] focus:ring-primary-main`;
            case 'tertiary':
                return `${baseStyles} text-[#B8336A] bg-tertiary-main hover:bg-[#F5E9E2] focus:ring-primary-main`;
            default:
                return baseStyles;
        }
    };

    const getNextIcon = () => {
        switch (mode) {
            case 'light':
                return <Gun className="w-4 h-4" />;
            case 'night':
                return <Rasp className="w-4 h-4" />;
            case 'ultra':
                return <Snow className="w-4 h-4" />;
        }
    };


    return (
        <div className={`${className}`}>
            <button
                onClick={toggleMode}
                className={getButtonStyles()}
            >
                {getNextIcon()}
            </button>
        </div>
    );
};

export default ColorSwitch;