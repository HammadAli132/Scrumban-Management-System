import React from 'react';
import { Calendar, Filter } from 'lucide-react';


export default function KanbanFilters({
    sortBy,
    onSortChange,
}) {
    return (
        <div className="flex items-center gap-4">
            

            <div className="relative">
                <Filter size={16} className="absolute left-3 top-3 text-gray-400" />
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#252525] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                    <option value="priority">Sort by Priority</option>
                    <option value="date">Sort by Date</option>
                </select>
            </div>

        </div>
    );
}