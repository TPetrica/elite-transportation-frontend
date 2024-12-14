export default function TimeSlots({ selectedTime, onTimeSelect }) {
	const timeSlots = [
		"17:00",
		"17:30",
		"18:00",
		"18:30",
		"19:00",
		"19:30",
		"20:00",
		"20:30",
		"21:00",
		"21:30",
		"22:00",
	];

	return (
		<div className="time-slots-wrapper bg-white rounded-lg shadow p-4">
			<h5 className="text-lg font-medium mb-4">Available Times</h5>
			<div className="grid grid-cols-2 md:grid-cols-1 gap-2">
				{timeSlots.map((time) => (
					<button
						key={time}
						onClick={() => onTimeSelect(time)}
						className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${
								selectedTime === time
									? "bg-primary text-white"
									: "bg-gray-50 hover:bg-gray-100"
							}
            `}
					>
						{time}
					</button>
				))}
			</div>
		</div>
	);
}
