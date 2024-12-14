import DatePicker from "react-multi-date-picker";

export default function DatePickerComponent({ value, onChange }) {
	const handleChange = (dateValue) => {
		const jsDate = dateValue.toDate();
		onChange(jsDate);
	};

	return (
		<DatePicker
			value={value}
			onChange={handleChange}
			format="MMMM DD YYYY"
			minDate={new Date()}
		/>
	);
}
