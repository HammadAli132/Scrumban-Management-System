import { useParams } from "react-router-dom"

function Projects() {
    const { projectid } = useParams();
    return (
        <div>Project has id {projectid}</div>
    )
}

export default Projects