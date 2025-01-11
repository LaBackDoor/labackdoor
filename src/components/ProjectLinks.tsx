import { useState } from "react";
import { Link } from "react-router-dom";

import { MRNS_PAGE } from '../resources/paths';
import "../styles/styles.css";

const ProjectLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      name: "AW-TRBAC",
      year: "2024",
      link: "https://itrust.sutd.edu.sg/first-international-conference-on-the-design-of-cyber-secure-water-plants-dcs-water24/programme-dcs-water24/",
    },
    {
      name: "MRNNs",
      year: "2024",
      link: MRNS_PAGE,
    },
    {
      name: "Crowd\nsourcing",
      year: "2024",
      link: "https://asonam.cpsc.ucalgary.ca/2024/AcceptedPapers.php",
    },
    {
      name: "PANACEA",
      year: "2024",
      link: "https://github.com/LaBackDoor/PANACEA",
    },
    {
      name: "PSIEVE-IT",
      year: "2025",
      link: "https://github.com/LaBackDoor",
    },
  ];

  return (
    <div className="flex items-center justify-end w-full h-full px-6 mt-28 md:px-12">
      <ul className="flex flex-col items-end gap-12 overflow-visible">
        {projects.map((project, index) => (
          <li
            key={project.name}
            className="relative w-fit text-right cursor-pointer project-link"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              to={project.link}
              className={`relative group project-link inline-block text-[2vw] leading-[0.9] font-black uppercase tracking-tighter transition-transform duration-[1500ms] ease-out font-druk
                                ${hoveredIndex === index
                  ? "translate-x-[10%]"
                  : "translate-x-0"
                }`}
              data-info={project.year}
            >
              <span className="relative">
                <span className="inline break-words whitespace-normal">
                  {project.name}
                </span>
                <span className="absolute project-year -left-[220px] top-[3.7em] w-[150px] text-right text-[0.7vw] font-medium opacity-75 transition-none transform-none pointer-events-none">
                  {`${project.year} \t`}
                </span>
                <span className="project-slash" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectLinks;
