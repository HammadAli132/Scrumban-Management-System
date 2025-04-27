import { useParams } from "react-router-dom"

function KanbanBoard() {
    const {projectid} = useParams();
    return (
        <div>KanbanBoard for project with id {projectid}</div>
    )
}

export default KanbanBoard