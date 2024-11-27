import { useLayout } from "../hooks/useLayout";

const LayoutSwitcher = () => {
    const { setLayout } = useLayout();

    return (
        <div className="flex gap-4 p-4">
            <button
                onClick={() => setLayout("primary")}
                className="px-4 py-2 rounded text-[#FFFFF0] bg-primary-main hover:bg-primary-button-hover"
            >
                Primary
            </button>
            <button
                onClick={() => setLayout("secondary")}
                className="px-4 py-2 text-[#6096BA] rounded bg-secondary-main hover:bg-secondary-button-hover"
            >
                Secondary
            </button>
            <button
                onClick={() => setLayout("tertiary")}
                className="px-4 py-2 text-[#D7D5D5] rounded bg-tertiary-main hover:bg-tertiary-button-hover"
            >
                Tertiary
            </button>
        </div>
    );
};

export default LayoutSwitcher;
