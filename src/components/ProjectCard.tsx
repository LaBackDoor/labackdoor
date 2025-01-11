import React from "react"
import { Link } from "react-router-dom";

import { PROJECTS_BASE } from "../resources/paths";
import { ForthIcon } from "../resources/icons";
import Button from "./Button";
import Card from "./Card";

interface IProjectCardProps {
    onClick?: () => void;
    className?: string;
    title: string
    description?: string
    cover?: string;
    id?: string;
}

const ProjectCard: React.FC<IProjectCardProps> = ({
    id,
    title,
    description,
    cover,
}: IProjectCardProps) => {


    return (
        <>
            <Card className="flex flex-col">
                <div className="relative overflow-hidden aspect-ratio-container">
                    {cover ? (
                        <div className="relative">
                            <img
                                className="object-cover p-1 rounded-t-3xl"
                                src={cover?.startsWith('/') ? cover : `/sections/projectcovers/${cover}`}
                                alt="svg image"
                            />
                            <div
                                className="absolute inset-0 bg-black opacity-20"
                                style={{ zIndex: 1 }}
                            />
                        </div>
                    ) : (
                        <div className="bg-gray-600 h-full w-full"></div>
                    )}
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: 'rgba(46, 41, 78, 0.3)' }}
                    />
                </div>

                <div className="relative -top-0">
                    <div className="card-title text-2xl m-0 font-semibold absolute bottom-10 md:bottom-3 md:left-5 left-10">
                        {title}
                    </div>
                </div>

                <div className="p-4 gap-4">
                    <p className="line-clamp-3 sm:line-clamp-0">
                        {description}
                    </p>

                    <div className="pt-4">
                        <Link to={`${PROJECTS_BASE}/${id}`}>
                            <Button
                                color="white"
                                size="btn-sm"
                                variant="outline"
                                className="sm:pr-0"
                                title="See Template"
                                titleClass="sm:text-sm text-sm"
                                endIcon={<ForthIcon className="w-4 h-4" />}
                            />
                        </Link>
                    </div>
                </div>
            </Card>
        </>
    )
};


export default ProjectCard;
