import { Navbar2 } from "../components/Nav/Navbar2";

function Group() {

    const researchers = [
        {
            name: "Albanisenioluwa Kolawole Orojo",
            description: "dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds k kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds ki kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj sfni dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj",
        },
        {
            name: "Webster Chiedozie Elumelu",
            description: "dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds k kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds ki kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj sfni dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj",
        },
    ];

    const sections = [
        {
            title: "Publications",
            content: "dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds k kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds ki kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj sfni dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj",
        },
        {
            title: "Ongoing Work",
            content: "dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds k kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds ki kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj sfni dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj",
        },
        {
            title: "Under Review",
            content: "dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds k kds s dkkds hds k jdsjvn dfs jds o sdo jsd js j sj o dsvcnsdj dsjsd . sdsdd sds odsj sd sdj ohsd kds hds ki kdss",
        },
    ];

    return (
        <>
            <div className="min-h-screen mt-24 flex flex-col">
            <Navbar2 />
            {/* Main content with top margin for separation */}
            <div className="flex-1 p-8 mt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Researchers Section */}
                    <div className="space-y-16 mb-16">
                        {researchers.map((researcher, index) => (
                            <div key={index} className="flex items-start gap-8">
                                {/* Image placeholder - adjust size as needed */}
                                <div className="w-64 h-64 bg-teal-500 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <h1 className="text-5xl font-black mb-6 leading-tight">
                                        {researcher.name}
                                    </h1>
                                    <p className="text-lg leading-relaxed">
                                        {researcher.description}
                                    </p>
                                </div>
                                {/* Add right image for Webster's section */}
                                {index === 1 && (
                                    <div className="w-64 h-64 bg-teal-500 flex-shrink-0"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Publications and Work Sections */}
                    <div className="grid grid-cols-2 gap-16 mb-16">
                        {sections.slice(0, 2).map((section, index) => (
                            <div key={index}>
                                <h2 className="text-4xl font-black mb-6">{section.title}</h2>
                                <p className="text-lg leading-relaxed">{section.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Under Review Section */}
                    <div>
                        <h2 className="text-4xl font-black mb-6">{sections[2].title}</h2>
                        <p className="text-lg leading-relaxed">{sections[2].content}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Group;
