import { useState } from 'react';

import "../styles/styles.css"



const ProjectLinks = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects = [
        {
            name: 'AW-TRBAC',
            year: '2024',
            link: "https://www.nlpaics.com/accepted-papers"
        },
        {
            name: 'MRNNs',
            year: '2024',
            link: "https://itrust.sutd.edu.sg/first-international-conference-on-the-design-of-cyber-secure-water-plants-dcs-water24/programme-dcs-water24/"
        },
        {
            name: 'Crowdsourcing',
            year: '2024',
            link: "https://asonam.cpsc.ucalgary.ca/2024/AcceptedPapers.php"
        },
    ];

    return (
        <div className="flex items-center justify-end w-full h-full px-6 mt-28 md:px-12">
            <ul className="flex flex-col items-end gap-12 overflow-visible">
                {projects.map((project, index) => (
                    <li
                        key={project.name}
                        className="relative w-full text-right cursor-pointer project-link"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative group project-link inline-block text-[7vw] leading-[0.9] font-black uppercase tracking-tighter transition-transform duration-[1500ms] ease-out font-druk
                                ${hoveredIndex === index ? 'translate-x-[30%]' : 'translate-x-0'}`}
                            data-info={project.year}
                        >
                            <span className="relative">
                                <span className='inline break-words whitespace-normal'>
                                    {project.name}
                                </span>
                                <span className="absolute project-year -left-[200px] top-[3.7em] w-[150px] text-right text-[0.7vw] font-medium opacity-75 transition-none transform-none pointer-events-none">
                                    {`${project.year} \t`}
                                </span>
                                <span className="absolute top-[0em] transition-none will-change-transform border border-solid border-current left-[-0.3em] w-[2px] h-[0.85em] bg-current rotate-[25deg] group-hover:border-current group-hover:bg-current group-hover:border-solid" />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectLinks;

