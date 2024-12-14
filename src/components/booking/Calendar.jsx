import { addMonths, format, subMonths } from "date-fns";

export default function Calendar({
	currentMonth,
	setCurrentMonth,
	selectedDate,
	onDateSelect,
	showMonthSelector,
	showYearSelector,
	setShowMonthSelector,
	setShowYearSelector,
}) {
	const daysInWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const years = Array.from(
		{ length: 5 },
		(_, i) => new Date().getFullYear() + i
	);

	const generateCalendarDays = () => {
		const firstDay = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			1
		);
		const lastDay = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			0
		);
		const days = [];

		for (let i = 0; i < firstDay.getDay(); i++) {
			days.push(null);
		}

		for (let day = 1; day <= lastDay.getDate(); day++) {
			days.push(
				new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
			);
		}

		return days;
	};

	const handleMonthSelect = (monthIndex) => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
		setShowMonthSelector(false);
	};

	const handleYearSelect = (year) => {
		setCurrentMonth(new Date(year, currentMonth.getMonth()));
		setShowYearSelector(false);
	};

	return (
		<div className="calendar-wrapper bg-white rounded-lg shadow p-4">
			<div className="flex items-center justify-between mb-4">
				<button
					onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
					className="p-2 hover:bg-gray-100 rounded-full"
				>
					<i className="icon-arrow-left" />
				</button>

				<div className="flex gap-2">
					<button
						onClick={() => setShowMonthSelector(!showMonthSelector)}
						className="px-3 py-1 text-sm font-medium hover:bg-gray-100 rounded"
					>
						{format(currentMonth, "MMMM")}
					</button>
					<button
						onClick={() => setShowYearSelector(!showYearSelector)}
						className="px-3 py-1 text-sm font-medium hover:bg-gray-100 rounded"
					>
						{format(currentMonth, "yyyy")}
					</button>
				</div>

				<button
					onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
					className="p-2 hover:bg-gray-100 rounded-full"
				>
					<i className="icon-arrow-right" />
				</button>
			</div>

			{showMonthSelector && (
				<div className="absolute z-10 mt-1 w-48 bg-white shadow-lg rounded-md py-1">
					{months.map((month, idx) => (
						<button
							key={month}
							className={`w-full px-4 py-2 text-left hover:bg-gray-100 
                ${currentMonth.getMonth() === idx ? "bg-gray-50" : ""}`}
							onClick={() => handleMonthSelect(idx)}
						>
							{month}
						</button>
					))}
				</div>
			)}

			{showYearSelector && (
				<div className="absolute z-10 mt-1 w-32 bg-white shadow-lg rounded-md py-1">
					{years.map((year) => (
						<button
							key={year}
							className={`w-full px-4 py-2 text-left hover:bg-gray-100
                ${currentMonth.getFullYear() === year ? "bg-gray-50" : ""}`}
							onClick={() => handleYearSelect(year)}
						>
							{year}
						</button>
					))}
				</div>
			)}

			<div className="grid grid-cols-7 gap-1 mb-2">
				{daysInWeek.map((day) => (
					<div
						key={day}
						className="text-center text-sm font-medium text-gray-500"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{generateCalendarDays().map((date, idx) => (
					<button
						key={idx}
						disabled={!date || date < new Date()}
						onClick={() => date && date >= new Date() && onDateSelect(date)}
						className={`
              aspect-square p-2 rounded-full text-sm
              ${!date ? "invisible" : ""}
              ${
								date && date < new Date()
									? "text-gray-300 cursor-not-allowed"
									: ""
							}
              ${
								selectedDate?.toDateString() === date?.toDateString()
									? "bg-primary text-white"
									: "hover:bg-gray-100"
							}
            `}
					>
						{date?.getDate()}
					</button>
				))}
			</div>
		</div>
	);
}
