import { useNavigate } from "react-router-dom"

function ProjectCard({id, title, description}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/project/${id}`);
    }

    return (
        <div className="flex flex-col w-1/3 border-1 border-[#2e2d2d] bg-[#1c1c1c] p-6 hover:bg-[#2e2d2d] rounded-lg cursor-pointer transition duration-300 ease-in-out"
            onClick={handleClick}
        >
            <h2 className="text-white text-lg font-bold">{title}</h2>
            <p className="text-gray-400 mt-2">{description}</p>
        </div>
    )
}

export default ProjectCard