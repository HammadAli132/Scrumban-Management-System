import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	ArrowLeft, Calendar, Clock, Users, CheckSquare,
	PlusCircle, ChevronRight, ChevronDown, AlertCircle,
	Flag, BarChart2, CheckCircle, Circle, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
	ResponsiveContainer, Legend
} from 'recharts';
import { getInitials } from '../../utils/avatarUtils';
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// This would normally come from your API or state management
const dummyProject = {
	id: 1,
	name: "Analytics Dashboard",
	description: "Data visualization platform for marketing metrics",
	progress: 75,
	isOwned: true,
	collaborators: [
		{ id: 1, username: "johnsmith", initials: "JS", color: "bg-purple-700" },
		{ id: 2, username: "alexkim", initials: "AK", color: "bg-green-700" },
		{ id: 3, username: "lisamoore", initials: "LM", color: "bg-pink-700" }
	],
	startDate: "2023-11-01",
	endDate: "2023-12-15",
	lastUpdated: "2 hours ago"
};

const dummySprints = [
	{
		id: 1,
		title: "Sprint 1: Foundation",
		startDate: "2023-11-01",
		endDate: "2023-11-14",
		isExpanded: true,
		tasks: [
			{ id: 1, title: "Design mockups", priority: "high", swimLane: "Done", dueDate: "2023-11-05", assignee: "JS" },
			{ id: 2, title: "Set up API routes", priority: "medium", swimLane: "Done", dueDate: "2023-11-10", assignee: "AK" },
			{ id: 3, title: "Create database schema", priority: "high", swimLane: "Done", dueDate: "2023-11-14", assignee: "LM" },
			{ id: 4, title: "Setup project environment", priority: "medium", swimLane: "Done", dueDate: "2023-11-03", assignee: "JS" }
		]
	},
	{
		id: 2,
		title: "Sprint 2: Core Features",
		startDate: "2023-11-15",
		endDate: "2023-11-28",
		isExpanded: false,
		tasks: [
			{ id: 5, title: "Implement data visualization", priority: "high", swimLane: "Doing", dueDate: "2023-11-20", assignee: "AK" },
			{ id: 6, title: "Add filter functionality", priority: "medium", swimLane: "Doing", dueDate: "2023-11-25", assignee: "JS" },
			{ id: 7, title: "Create user dashboard", priority: "high", swimLane: "ToDo", dueDate: "2023-11-28", assignee: "LM" },
			{ id: 8, title: "Implement authentication", priority: "high", swimLane: "Doing", dueDate: "2023-11-22", assignee: "JS" }
		]
	},
	{
		id: 3,
		title: "Sprint 3: Final Touches",
		startDate: "2023-11-29",
		endDate: "2023-12-15",
		isExpanded: false,
		tasks: [
			{ id: 9, title: "Test with real data", priority: "medium", swimLane: "ToDo", dueDate: "2023-12-05", assignee: "AK" },
			{ id: 10, title: "Performance optimization", priority: "low", swimLane: "ToDo", dueDate: "2023-12-10", assignee: "JS" },
			{ id: 11, title: "Documentation", priority: "medium", swimLane: "ToDo", dueDate: "2023-12-15", assignee: "LM" }
		]
	}
];

const dummyMeetingNotes = [
	{
		id: 1,
		title: "Sprint 1 Planning",
		content: "Outlined key objectives for the first sprint. Assigned tasks to team members. Discussed potential blockers.",
		createdAt: "2023-11-01",
		createdBy: "JS"
	},
	{
		id: 2,
		title: "Weekly Check-in",
		content: "API routes are coming along well. Design mockups need feedback. Database schema is complete.",
		createdAt: "2023-11-08",
		createdBy: "AK"
	},
	{
		id: 3,
		title: "Sprint 1 Review",
		content: "Completed all tasks for Sprint 1. Ready to move to Sprint 2. Need to focus on data visualization components.",
		createdAt: "2023-11-14",
		createdBy: "LM"
	}
];

const convertDate = (dateString) => {
	const date = new Date(dateString);
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return date.toLocaleDateString('en-US', options)
}

const generateBurndownData = (sprints, project) => {
	// Extract all tasks from all sprints
	const allTasks = sprints.flatMap(sprint => sprint.tasks);
	const totalTasks = allTasks.length;

	// Get completed tasks
	const completedTasks = allTasks.filter(task => task.swimLane === "Done");
	const completedTasksCount = completedTasks.length;
	const remainingTasks = totalTasks - completedTasksCount;

	// Get dates for the project
	const startDate = new Date(project.startDate);
	const endDate = new Date(project.endDate);
	const currentDate = new Date();

	// Calculate days since project start
	const daysSinceStart = Math.max(1, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)));

	// Calculate velocity (completed tasks per day)
	const currentVelocity = completedTasksCount / daysSinceStart;

	// Calculate estimated completion date
	let estimatedCompletionDate;
	if (currentVelocity > 0) {
		// Days needed to complete remaining tasks at current velocity
		const daysNeeded = Math.ceil(remainingTasks / currentVelocity);
		estimatedCompletionDate = new Date(currentDate);
		estimatedCompletionDate.setDate(currentDate.getDate() + daysNeeded);
	} else {
		// If no tasks completed yet, use the planned end date
		estimatedCompletionDate = new Date(endDate);
	}

	// Determine if the project is on track, ahead, or behind
	let projectStatus = "on track";
	if (estimatedCompletionDate < endDate) {
		projectStatus = "ahead of schedule";
	} else if (estimatedCompletionDate > endDate) {
		projectStatus = "behind schedule";
	}

	// Generate dates between project start and end (taking into account estimated end date if it's later)
	const finalEndDate = estimatedCompletionDate > endDate ? estimatedCompletionDate : endDate;
	const dateRange = [];

	// Create date range with 3-day intervals
	for (let d = new Date(startDate); d <= finalEndDate; d.setDate(d.getDate() + 3)) {
		dateRange.push(new Date(d));
	}

	// Ensure the final end date is included
	if (dateRange[dateRange.length - 1].getTime() !== finalEndDate.getTime()) {
		dateRange.push(new Date(finalEndDate));
	}

	// Calculate total project duration in days
	const totalPlannedDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

	// Sort completed tasks by completion date to calculate historical velocity
	const completedTasksDates = completedTasks
		.filter(task => task.updatedAt) // Make sure we have a date
		.map(task => new Date(task.updatedAt))
		.sort((a, b) => a - b);

	// Generate burndown chart data
	const data = dateRange.map((date, index) => {
		const daysPassed = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));

		// Calculate ideal remaining tasks based on planned duration
		const idealRemaining = totalTasks - (totalTasks * (daysPassed / totalPlannedDays));

		// Calculate actual remaining tasks for dates up to current date
		let actualRemaining;
		if (date <= currentDate) {
			// Count tasks completed before or on this date
			const tasksCompletedByThisDate = completedTasksDates.filter(
				completionDate => completionDate <= date
			).length;

			actualRemaining = totalTasks - tasksCompletedByThisDate;
		} else {
			// For future dates, project based on current velocity
			const futureDaysPassed = Math.floor((date - currentDate) / (1000 * 60 * 60 * 24));
			const projectedCompleted = completedTasksCount + (futureDaysPassed * currentVelocity);
			actualRemaining = Math.max(0, totalTasks - Math.round(projectedCompleted));
		}

		return {
			date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			ideal: Math.max(0, Math.round(idealRemaining)),
			actual: Math.max(0, Math.round(actualRemaining)),
			isPast: date <= currentDate
		};
	});

	// Return enhanced data structure with burndown chart data and analytics
	return {
		chartData: data,
		analytics: {
			totalTasks,
			completedTasks: completedTasksCount,
			remainingTasks,
			currentVelocity: parseFloat(currentVelocity.toFixed(2)), // tasks per day
			estimatedCompletionDate: estimatedCompletionDate.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			projectedDaysRemaining: Math.ceil((estimatedCompletionDate - currentDate) / (1000 * 60 * 60 * 24)),
			daysElapsed: daysSinceStart,
			plannedDuration: totalPlannedDays,
			projectStatus
		}
	};
};

function ProjectDetails() {
	const { projectid } = useParams();
	const [loading, setLoading] = useState(true);
	const [project, setProject] = useState(dummyProject);
	const [sprints, setSprints] = useState(dummySprints);
	const [meetingNotes, setMeetingNotes] = useState(dummyMeetingNotes);
	const [burndownData, setBurndownData] = useState({});
	const [showInviteModal, setShowInviteModal] = useState(false);
	const [newUsername, setNewUsername] = useState('');
	const [showAddNoteModal, setShowAddNoteModal] = useState(false);
	const [showAddSprintModal, setShowAddSprintModal] = useState(false);
	const [addCollaboratorError, setAddCollaboratorError] = useState('');
	const [newSprint, setNewSprint] = useState({
		title: '',
		startDate: new Date().toISOString().split('T')[0],
		endDate: '',
	});
	const [newNote, setNewNote] = useState({ title: '', content: '' });

	const getSprintData = async () => {
		try {
			const response = await axios.get(`${apiUrl}/sprints/project/${projectid}`);
			setSprints(response.data.sprints);
			console.log("Sprints: ", response.data.sprints);

		} catch (error) {
			console.error("Error fetching sprints:", error);
		}
	}
	const getProjectData = async () => {
		try {
			const response = await axios.get(`${apiUrl}/projects/${projectid}`);
			setProject(response.data.project);
			console.log("Project: ", response.data.project);

		} catch (error) {
			console.error("Error fetching project:", error);
		}
	}

	const createSprint = async () => {
		if (!newSprint.title.trim() || !newSprint.endDate) return;

		// In a real app, you would call an API to add the sprint
		const sprintToAdd = {
			title: newSprint.title,
			startDate: newSprint.startDate,
			endDate: newSprint.endDate,
		};

		try {
			await axios.post(`${apiUrl}/sprints/project/${projectid}`, sprintToAdd);
			await getSprintData(); // Refresh sprint data after adding
		} catch (error) {
			console.error("Error adding sprint:", error);
		}

		setShowAddSprintModal(false);
	}

	const inviteUser = async () => {
		try {
			await axios.post(`${apiUrl}/collaborators/project/${projectid}`, { username: newUsername });
			await getProjectData(); // Refresh project data after inviting user
			setNewUsername('');
			setShowInviteModal(false);
		} catch (error) {
			console.error("Error inviting user:", error);
			setAddCollaboratorError(error.response.data.message);
		}
	}


	useEffect(() => {


		const initializeData = async () => {
			await getSprintData();
			await getProjectData();
			setLoading(false);
		}

		initializeData();
	}, []);

	useEffect(() => {
		if (!loading) {
			setBurndownData(generateBurndownData(sprints, { startDate: project.project.startDate, endDate: project.project.endDate }));

		}
	}, [sprints, loading])

	const toggleSprintExpand = (sprintId) => {
		setSprints(sprints.map(sprint =>
			sprint._id === sprintId
				? { ...sprint, isExpanded: !sprint.isExpanded }
				: sprint
		));
	};

	// Add this handler function
	const handleAddSprint = async (e) => {
		e.preventDefault();
		await createSprint();
	};

	const handleInviteUser = async (e) => {
		e.preventDefault();
		if (!newUsername.trim()) return;

		// In a real app, you would call an API to invite the user
		await inviteUser(newUsername);

	};

	const handleAddNote = (e) => {
		e.preventDefault();
		if (!newNote.title.trim() || !newNote.content.trim()) return;

		// In a real app, you would call an API to add the note
		const newNoteWithId = {
			id: meetingNotes.length + 1,
			...newNote,
			createdAt: new Date().toISOString().split('T')[0],
			createdBy: "JS" // Current user
		};

		setMeetingNotes([newNoteWithId, ...meetingNotes]);
		setNewNote({ title: '', content: '' });
		setShowAddNoteModal(false);
	};

	const getPriorityBadge = (priority) => {
		switch (priority) {
			case 'high':
				return <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-medium">High</span>;
			case 'medium':
				return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">Medium</span>;
			case 'low':
				return <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-medium">Low</span>;
			default:
				return null;
		}
	};

	const getStatusIcon = (swimLane) => {
		switch (swimLane) {
			case 'Done':
				return <CheckCircle size={16} className="text-green-500" />;
			case 'Doing':
				return <Circle size={16} className="text-blue-500" />;
			case 'ToDo':
				return <Circle size={16} className="text-gray-500" />;
			default:
				return null;
		}
	};

	// Calculate total completed tasks
	const totalTasks = sprints.reduce((acc, sprint) => acc + sprint.tasks.length, 0);
	const completedTasks = sprints.reduce((acc, sprint) =>
		acc + sprint.tasks.filter(task => task.swimLane === 'Done').length, 0);

	const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;



	if (loading) {
		return <div className="text-white w-full h-full flex items-center justify-center">Loading...</div>;
	}

	return (
		<div className="px-4 py-6 md:px-6 lg:px-8">
			{/* Header Section */}
			<div className="mb-6">
				<Link to="/dashboard" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-4">
					<ArrowLeft size={16} className="mr-2" /> Back to Dashboard
				</Link>
				<h1 className="text-2xl font-bold text-white">{project.project.title}</h1>
				<p className="text-gray-400 mt-2">{project.project.description}</p>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column (Sprints and Burndown) */}
				<div className="lg:col-span-2">
					{/* Sprints Section */}
					<div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg mb-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold text-white">Sprints</h2>
							<button
								className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
								onClick={() => setShowAddSprintModal(true)}
							>
								Add Sprint
							</button>
						</div>

						<div className="space-y-4">
							{sprints.map(sprint => (
								<div key={sprint._id} className="border border-[#333] rounded-lg overflow-hidden">
									<div
										className="flex items-center justify-between p-4 bg-[#252525] cursor-pointer"
										onClick={() => toggleSprintExpand(sprint._id)}
									>
										<div className="flex items-center">
											{sprint.isExpanded ?
												<ChevronDown size={18} className="text-gray-400 mr-2" /> :
												<ChevronRight size={18} className="text-gray-400 mr-2" />
											}
											<h3 className="font-medium text-white">{sprint.title}</h3>
										</div>
										<div className="text-sm text-gray-400">
											{convertDate(new Date(sprint.startDate).toLocaleDateString())} - {convertDate(new Date(sprint.endDate).toLocaleDateString())}
										</div>
									</div>

									{sprint.isExpanded && (
										<div className="p-4 bg-[#1c1c1c]">
											<div className="space-y-3">
												{sprint.tasks.map(task => (
													<div key={task._id} className="flex items-center justify-between bg-[#252525] p-3 rounded-lg">
														<div className="flex items-center">
															{getStatusIcon(task.swimLane)}
															<span className="ml-3 text-white">
																{task.title}
															</span>
															<div className="ml-3">
																{getPriorityBadge(task.priorityLevel)}
															</div>
														</div>
														<div className="flex items-center">
															<div className="text-sm text-gray-400 mr-4">
																{convertDate(new Date(task.dueDate).toLocaleDateString())}
															</div>
															<div className={`w-6 h-6 rounded-full ${["bg-purple-700", "bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"][Math.floor(Math.random() * (5 - 0 + 1)) + 0]}  flex items-center justify-center text-white text-xs font-medium`}>
																{getInitials(task.user.name)}
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Burndown Chart */}
					<div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg">
						<h2 className="text-xl font-semibold text-white mb-6">Burndown Chart</h2>

						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={burndownData.chartData} margin={{ top: 5, right: 20, bottom: 25, left: 10 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="#333" />
									<XAxis
										dataKey="date"
										stroke="#888"
										tick={{ fill: "#888" }}
										tickLine={{ stroke: "#888" }}
									/>
									<YAxis
										stroke="#888"
										tick={{ fill: "#888" }}
										tickLine={{ stroke: "#888" }}
										label={{ value: 'Tasks Remaining', angle: -90, position: 'insideLeft', fill: "#888", dy: 50 }}
									/>
									<Tooltip
										contentStyle={{ backgroundColor: "#252525", borderColor: "#444", borderRadius: "4px", color: "#fff" }}
										labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "5px" }}
										itemStyle={{ padding: "2px 0" }}
									/>
									<Legend verticalAlign="top" height={36} />
									<Line
										type="monotone"
										dataKey="ideal"
										stroke="#4ADE80"
										strokeWidth={2}
										dot={false}
										name="Ideal"
									/>
									<Line
										type="monotone"
										dataKey="actual"
										stroke="#60A5FA"
										strokeWidth={2}
										dot={{ r: 3, fill: "#60A5FA" }}
										activeDot={{ r: 5 }}
										name="Actual"
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>

						<div className="mt-4 p-3 bg-[#252525] rounded-lg text-sm text-gray-300">
							<div className="flex items-center mb-1">
								<AlertCircle size={14} className="text-yellow-500 mr-2" />
								<span>Current velocity: <span className="text-white font-medium">{burndownData.analytics ? burndownData.analytics.currentVelocity : ""} tasks/day</span></span>
							</div>
							<div className="flex items-center">
								<Flag size={14} className="text-blue-500 mr-2" />
								<span>Projected completion: <span className="text-white font-medium">{burndownData.analytics ? burndownData.analytics.estimatedCompletionDate : ""}</span></span>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column (Progress and Team) */}
				<div className="lg:col-span-1">
					{/* Progress Widget */}
					<div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg mb-6">
						<h2 className="text-xl font-semibold text-white mb-4">Progress</h2>

						<div className="flex flex-col items-center">
							<div className="relative w-32 h-32">
								<svg className="w-32 h-32" viewBox="0 0 100 100">
									<circle
										className="text-[#252525]"
										strokeWidth="10"
										stroke="currentColor"
										fill="transparent"
										r="40"
										cx="50"
										cy="50"
									/>
									<circle
										className="text-blue-600"
										strokeWidth="10"
										strokeDasharray={`${progress * 2.51} 251.2`}
										strokeLinecap="round"
										stroke="currentColor"
										fill="transparent"
										r="40"
										cx="50"
										cy="50"
									/>
								</svg>
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-3xl font-bold text-white">{progress}%</span>
								</div>
							</div>

							<div className="mt-6 w-full">
								<div className="flex items-center mb-2">
									<CheckSquare size={16} className="text-green-500 mr-2" />
									<span className="text-white">
										{completedTasks} / {totalTasks} tasks completed
									</span>
								</div>

								<div className="flex items-center mb-2">
									<Calendar size={16} className="text-blue-500 mr-2" />
									<span className="text-white">
										Due on {convertDate(new Date(project.project.endDate).toLocaleDateString())}
									</span>
								</div>

							</div>
						</div>
					</div>

					{/* Team Widget */}
					<div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg mb-6">
						<h2 className="text-xl font-semibold text-white mb-4">Team</h2>

						<div className="flex -space-x-2 mb-4">
							{project.collaborators.map(collaborator => (
								<div
									key={collaborator._id}
									className={`w-10 h-10 rounded-full border-2 border-[#1c1c1c] ${["bg-purple-700", "bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"][Math.floor(Math.random() * (5 - 0 + 1)) + 0]} flex items-center justify-center text-white font-medium`}
								>
									{getInitials(collaborator.userId.name)}
								</div>
							))}
						</div>

						<button
							className="w-full py-2.5 bg-[#252525] hover:bg-[#2e2d2d] text-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
							onClick={() => setShowInviteModal(true)}
						>
							<Users size={16} className="mr-2" />
							Manage Team
						</button>
					</div>

					{/* Meeting Notes */}
					<div className="bg-[#1c1c1c] rounded-xl p-6 shadow-lg">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold text-white">Meeting Notes</h2>
							<button
								className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
								onClick={() => setShowAddNoteModal(true)}
							>
								<PlusCircle size={16} />
							</button>
						</div>

						<div className="space-y-4">
							{project.meetingNotes.map(note => (
								<div key={note._id} className="bg-[#252525] p-4 rounded-lg">
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-medium text-white">{note.title}</h3>
										<div className="text-xs text-gray-400">{convertDate(note.createdAt.split("T")[0])}</div>
									</div>
									<p className="text-gray-300 text-sm mb-3">{note.content}</p>

								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{showAddSprintModal && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
					<div className="bg-[#252525] rounded-xl p-6 shadow-xl w-full max-w-md">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-semibold text-white">Add New Sprint</h3>
							<button
								className="text-gray-400 hover:text-white"
								onClick={() => setShowAddSprintModal(false)}
							>
								<X size={20} />
							</button>
						</div>

						<form onSubmit={handleAddSprint}>
							<div className="mb-4">
								<label className="block text-gray-300 mb-2 text-sm">Sprint Title</label>
								<input
									type="text"
									value={newSprint.title}
									onChange={(e) => setNewSprint({ ...newSprint, title: e.target.value })}
									placeholder="Sprint 4: New Features"
									className="w-full p-3 bg-[#1c1c1c] border border-[#444] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-gray-300 mb-2 text-sm">Start Date</label>
									<div className="relative">
										<Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
										<input
											type="date"
											value={newSprint.startDate}
											onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
											className="w-full pl-10 pr-4 py-2 bg-[#1c1c1c] border border-[#444] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-gray-300 mb-2 text-sm">End Date</label>
									<div className="relative">
										<Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
										<input
											type="date"
											value={newSprint.endDate}
											min={newSprint.startDate}
											onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
											className="w-full pl-10 pr-4 py-2 bg-[#1c1c1c] border border-[#444] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
											required
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-end gap-3">
								<button
									type="button"
									className="px-4 py-2 bg-transparent border border-[#444] text-gray-300 rounded-lg hover:bg-[#333]"
									onClick={() => setShowAddSprintModal(false)}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
								>
									Add Sprint
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Invite User Modal */}
			{showInviteModal && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
					<div className="bg-[#252525] rounded-xl p-6 shadow-xl w-full max-w-md">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-semibold text-white">Invite Team Member</h3>
							<button
								className="text-gray-400 hover:text-white"
								onClick={() => {
									setShowInviteModal(false);
									setAddCollaboratorError(''); // Clear error when closing modal
								}}
							>
								<X size={20} />
							</button>
						</div>

						<form onSubmit={handleInviteUser}>
							{/* Add error message display here */}
							{addCollaboratorError && (
								<div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-sm">
									{addCollaboratorError}
								</div>
							)}

							<div className="mb-4">
								<label className="block text-gray-300 mb-2 text-sm">Username</label>
								<input
									type="text"
									value={newUsername}
									onChange={(e) => {
										setNewUsername(e.target.value);
										// Clear error when user starts typing
										if (addCollaboratorError) {
											setAddCollaboratorError('');
										}
									}}
									placeholder="Enter username"
									className={`w-full p-3 bg-[#1c1c1c] border ${addCollaboratorError ? 'border-red-500' : 'border-[#444]'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
									required
								/>
							</div>

							<div className="flex justify-end gap-3">
								<button
									type="button"
									className="px-4 py-2 bg-transparent border border-[#444] text-gray-300 rounded-lg hover:bg-[#333]"
									onClick={() => {
										setShowInviteModal(false);
										setAddCollaboratorError(''); // Clear error when canceling
									}}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={!newUsername.trim()} // Disable if no username entered
								>
									Invite
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Add Meeting Note Modal */}
			{showAddNoteModal && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
					<div className="bg-[#252525] rounded-xl p-6 shadow-xl w-full max-w-md">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-semibold text-white">Add Meeting Note</h3>
							<button
								className="text-gray-400 hover:text-white"
								onClick={() => setShowAddNoteModal(false)}
							>
								<X size={20} />
							</button>
						</div>

						<form onSubmit={handleAddNote}>
							<div className="mb-4">
								<label className="block text-gray-300 mb-2 text-sm">Title</label>
								<input
									type="text"
									value={newNote.title}
									onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
									placeholder="Meeting title"
									className="w-full p-3 bg-[#1c1c1c] border border-[#444] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div className="mb-4">
								<label className="block text-gray-300 mb-2 text-sm">Content</label>
								<textarea
									value={newNote.content}
									onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
									placeholder="Meeting notes..."
									className="w-full p-3 bg-[#1c1c1c] border border-[#444] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
									required
								/>
							</div>

							<div className="flex justify-end gap-3">
								<button
									type="button"
									className="px-4 py-2 bg-transparent border border-[#444] text-gray-300 rounded-lg hover:bg-[#333]"
									onClick={() => setShowAddNoteModal(false)}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
								>
									Add Note
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProjectDetails;