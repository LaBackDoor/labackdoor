import { Navbar2 } from "../components/Nav/Navbar2";
import { UserIcon } from "../resources/icons";

function Group() {

    const researchers = [
        {
            name: "Abanisenioluwa Kolawole Orojo",
            description: `Cybersecurity Researcher and Engineer | PhD Candidate | Innovating Data-Driven Solutions for Threat Detection and Resilience | Cyber-Physical Systems Security.
                            Experienced in simulating advanced cyber attack vectors, designing secure containerized infrastructures, and integrating machine learning techniques for threat forecasting. Proven track record in
                developing secure microservices architectures, implementing rigorous vulnerability assessments, and architecting
                comprehensive access control frameworks across cloud and cyber-physical systems. Passionate about leveraging
                cutting-edge technologies to enhance security operations and mitigate emerging threats in dynamic environments.`,
        },
        {
            name: "Webster Chiedozie Elumelu",
            description: `Frontend Developer | IT Support Specialist | Cybersecurity Enthusiast | Human Computer Interaction.
                            `,
        },
    ];

    const sections = [
        {
            title: "Publications",
            content: [
                "PSIEVE-IT: Physical, Simulated, Emulated, and Virtual Environment for Innovative Testing",
                "TrAice: Traffic Analysis and Inspection for Cybersecurity Evaluation",
                "Malware Behavior Analysis via System Calls"
            ],
        },
        {
            title: "Ongoing Work",
            content: [
                "Leveraging Secure Social Media Crowdsourcing for Gathering Firsthand Account in Conflict Zones - ASONAM 2024 · Jul 1, 2024",
                "Predicting Software Vulnerability Trends with Multi-Recurrent Neural Networks: A Time Series Forecasting Approach - NLPAICS 2024 · Jun 10, 2024",
                "A Unified Framework Incorporating AW-TRBAC and Semantic Variational Autoencoders for Dynamic Threat Detection and Access Control - DCS-Water 24 · Apr 1, 2024"
            ],
        },
        {
            title: "Projects",
            content: [
                "Evaluating the Cybersecurity of OpenZiti for Cyber-Physical Systems Use Cases | Aug 2023-Dec 2023",
                "Advancing Network Intrusion Detection with a Sliding Window-Based CNN and CFS-BA Feature Selection | Jan 2023-May 2023",
                "Malware Behavior Analysis via System Calls"
            ],
        },
        {
            title: "Under Review",
            content: [
                "PSIEVE-IT: Physical, Simulated, Emulated, and Virtual Environment for Innovative Testing",
                "TrAice: Traffic Analysis and Inspection for Cybersecurity Evaluation",
                "Malware Behavior Analysis via System Calls"
            ],
        },
    ];

    return (
        <>
            <div className="min-h-screen mt-28 flex flex-col">
                <Navbar2 />

                {/* Main content with top margin for separation */}
                <div className="flex-1 p-4 md:p-8 mt-4 md:mt-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Researchers Section */}
                        <div className="space-y-8 md:space-y-16 mb-8 md:mb-16">
                            {researchers.map((researcher, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                                >
                                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-8 w-full`}>
                                        <UserIcon className="w-32 h-32 md:w-64 md:h-64 flex-shrink-0 mx-auto md:mx-0" />
                                        <div className={`flex-1 text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                                            <h1 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
                                                {researcher.name}
                                            </h1>
                                            <div className="text-base md:text-lg leading-relaxed">
                                                <p className="font-bold mb-2 md:mb-4">
                                                    {researcher.description.split('.')[0]}
                                                </p>
                                                <p>
                                                    {researcher.description.split('.').slice(1).join('.')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Publications and Work Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-16">
                            {sections.slice(0, 4).map((section, index) => (
                                <div key={index}>
                                    <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6">{section.title}</h2>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {section.content.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-base md:text-lg leading-relaxed">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Under Review Section */}
                        {/* <div>
                            <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6">{sections[2].title}</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                {sections[2].content.map((item, index) => (
                                    <li key={index} className="text-base md:text-lg leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Group;
