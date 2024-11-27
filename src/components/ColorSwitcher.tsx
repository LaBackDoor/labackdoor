import { useState, useEffect } from 'react';

import { Olive, Gun, Snow } from '../resources/icons';
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
            setLayout('tertiary');
        } else if (body.classList.contains('ultra-mode')) {
            setMode('ultra');
            setLayout('primary');
        } else {
            setMode('light');
            setLayout('secondary');
        }
    }, [setLayout]);

    const toggleMode = () => {
        const body = document.body;
        if (mode === 'light') {
            setMode('night');
            setLayout('tertiary');
            body.classList.remove('light-mode', 'ultra-mode');
            body.classList.add('night-mode');
        } else if (mode === 'night') {
            setMode('ultra');
            setLayout('primary');
            body.classList.remove('light-mode', 'night-mode');
            body.classList.add('ultra-mode');
        } else {
            setMode('light');
            setLayout('secondary');
            body.classList.remove('night-mode', 'ultra-mode');
            body.classList.add('light-mode');
        }
    };

    const getButtonStyles = () => {
        const baseStyles = "p-4 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";

        switch (layout) {
            case 'primary':
                return `${baseStyles} text-[#FFFFF0] bg-primary-main hover:bg-primary-button-hover focus:ring-primary-main`;
            case 'secondary':
                return `${baseStyles} text-[#6096BA] bg-secondary-main hover:bg-secondary-button-hover focus:ring-secondary-main`;
            case 'tertiary':
                return `${baseStyles} text-[#D7D5D5] bg-tertiary-main hover:bg-tertiary-button-hover focus:ring-tertiary-main`;
            default:
                return baseStyles;
        }
    };

    const getNextIcon = () => {
        switch (mode) {
            case 'light':
                return <Gun className="w-4 h-4" />;
            case 'night':
                return <Olive className="w-4 h-4" />;
            case 'ultra':
                return <Snow className="w-4 h-4" />;
        }
    };

    // const getNextModeName = () => {
    //     switch (mode) {
    //         case 'light':
    //             return 'Night';
    //         case 'night':
    //             return 'Ultra';
    //         case 'ultra':
    //             return 'Light';
    //     }
    // };

    return (
        <div className={`${className}`}>
            <button
                onClick={toggleMode}
                className={getButtonStyles()}
            // aria-label={`Switch to ${mode === 'light' ? 'Night' : mode === 'night' ? 'Ultra' : 'Light'} Mode`}
            >
                {getNextIcon()}
                {/* <span className="ml-2">
                    {mode === 'light' ? 'Night' : mode === 'night' ? 'Ultra' : 'Light'}
                </span> */}
            </button>
        </div>
    );
};

export default ColorSwitch;