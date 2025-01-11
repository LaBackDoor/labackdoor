import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


interface IProject {
    name: string;
    description: string;
}

const projectsData: Record<string, IProject> = {
    'aw-trbac': { name: 'AW-TRBAC', description: 'Access control model' },
    'mrnn': { name: 'MRNNs', description: 'Multi-Recurrent Neural Networks' },
    'crowdsourcing': { name: 'Crowdsourcing', description: 'Crowdsourced data collection' },
    'panacea': { name: 'PANACEA', description: 'Security tool' },
    'psieve-it': { name: 'PSIEVE-IT', description: 'Data analysis tool' },
};

const ProjectDetailPage: React.FC = () => {

    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<{ name: string; description: string } | null>(null);

    useEffect(() => {
        if (projectId && projectsData[projectId]) {
            setProject(projectsData[projectId]);
        }
    }, [projectId]);

    if (!project) {
        return <p>Project not found</p>;
    }

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
    );

};

export default ProjectDetailPage;