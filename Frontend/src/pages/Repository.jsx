import { useParams } from "react-router-dom"

function Repository() {
    const {projectid} = useParams();
    return (
        <div>Repository for project with id {projectid}</div>
    )
}

export default Repository