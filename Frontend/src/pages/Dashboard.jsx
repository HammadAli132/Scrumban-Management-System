import ProjectCard from "../components/dashboard/ProjectCard"

const dummyProjects = [
    { id: 1, name: "Project 1", description: "Description of Project 1" },
    { id: 2, name: "Project 2", description: "Description of Project 2" },
    { id: 3, name: "Project 3", description: "Description of Project 3" },
    { id: 4, name: "Project 4", description: "Description of Project 4" },
    { id: 5, name: "Project 5", description: "Description of Project 5" },
]

export default function Dashboard() {

    return (
        <div>
            <ul className="flex flex-row w-full p-6 gap-4 overflow-x-auto">
                {dummyProjects.map((project) => (
                    <ProjectCard key={project.id} id={project.id} title={project.name} description={project.description} />
                ))}
            </ul>
        </div>
    )
}
