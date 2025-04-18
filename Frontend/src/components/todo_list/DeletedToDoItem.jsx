import { RotateCcw, Trash2 } from 'lucide-react';

const DeletedToDoItem = ({ todo, onRestore, onDeletePermanently }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-[#2e2d2d] hover:bg-[#2e2d2d] transition-colors">
            {/* Title */}
            <span className="font-normal text-sm text-gray-300">
                {todo.title}
            </span>

            {/* Action Icons */}
            <div className="flex items-center gap-4">
                <button onClick={() => onRestore(todo._id)} className="text-green-400 hover:text-green-300 transition cursor-pointer">
                    <RotateCcw size={18} />
                </button>
                <button onClick={() => onDeletePermanently(todo._id)} className="text-red-500 hover:text-red-400 transition cursor-pointer">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default DeletedToDoItem;
