import { Navbar2 } from "../components/Nav/Navbar2";

function Group() {

    const researchers = [
        {
            name: "Abanisenioluwa Kolawole Orojo",
            description: "Cybersecurity Researcher and Engineer | PhD Candidate | Innovating Data-Driven Solutions for Threat Detection and Resilience | Cyber-Physical Systems Security",
        },
        {
            name: "Webster Chiedozie Elumelu",
            description: "Frontend Developer | IT Support Specialist | Cybersecurity Enthusiast | Computer Science Graduate | Innovative Problem Solver",
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
            <div className="min-h-screen mt-28 flex flex-col">
                <Navbar2 />

                {/* Main content with top margin for separation */}
                <div className="flex-1 p-8 mt-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Researchers Section */}
                        <div className="space-y-16 mb-16">
                            {researchers.map((researcher, index) => (
                                <div
                                    key={index}
                                    className={`flex ${index % 2 === 0 ? 'items-start' : 'items-start'} gap-8`}
                                >
                                    {index % 2 === 0 ? (
                                        <>
                                            <div className="w-64 h-64 bg-teal-500 flex-shrink-0" />
                                            <div className="flex-1 text-left">
                                                <h1 className="text-5xl font-black mb-6 leading-tight">
                                                    {researcher.name}
                                                </h1>
                                                <p className="text-lg leading-relaxed">
                                                    {researcher.description}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 text-right">
                                                <h1 className="text-5xl font-black mb-6 leading-tight">
                                                    {researcher.name}
                                                </h1>
                                                <p className="text-lg leading-relaxed">
                                                    {researcher.description}
                                                </p>
                                            </div>
                                            <div className="w-64 h-64 bg-teal-500 flex-shrink-0" />
                                        </>
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
