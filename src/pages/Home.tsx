import LayoutSwitcher from "../components/LayoutSwitcher";
import Layout from "../layouts";


export function Home() {
    return (
        // <h1 className="p-4 text-4xl">Vite Project</h1>
        <Layout>
            <LayoutSwitcher />
            <div className="p-4">
                <h1 className="text-4xl">LABACKDOOR Project</h1>
                <p className="mt-4 text-lg">
                    text will dynamically adapt to the current layout's text color.
                </p>
            </div>
        </Layout>
    );
}