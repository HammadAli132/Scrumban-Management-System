import { useParams } from "react-router-dom"

function Projects() {
    const { projectId } = useParams();
    return (
        <div>Project has id {projectId}</div>
    )
}

export default Projects