import { useParams } from "react-router-dom"

function KanbanBoard() {
    const {projectId} = useParams();
    return (
        <div>KanbanBoard for project with id {projectId}</div>
    )
}

export default KanbanBoard