const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
	const spinnerSizes = {
		small: "w-4 h-4",
		medium: "w-8 h-8",
		large: "w-12 h-12",
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[200px]">
			<div className="inline-flex items-center px-4 py-2">
				<div
					className={`animate-spin rounded-full border-4 border-solid border-primary border-r-transparent ${spinnerSizes[size]} align-[-0.125em]`}
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</div>
				{text && <span className="ml-2 text-gray-500">{text}</span>}
			</div>
		</div>
	);
};

// Usage examples:
// <LoadingSpinner /> - Medium spinner with default text
// <LoadingSpinner size="small" text="Please wait..." /> - Small spinner with custom text
// <LoadingSpinner size="large" text="" /> - Large spinner with no text

export default LoadingSpinner;
