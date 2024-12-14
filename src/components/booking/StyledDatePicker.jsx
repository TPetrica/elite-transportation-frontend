import DatePicker from "react-multi-date-picker";
import styled from "styled-components";

const DatePickerWrapper = styled.div`
	width: 100%;
	position: relative;

	.custom-date-picker {
		width: 100% !important;

		.rmdp-container {
			width: 100% !important;
			display: block !important;
		}

		.rmdp-input {
			width: 100% !important;
			height: 46px !important;
			padding: 8px 12px 8px 40px !important;
			background-color: #ffffff !important;
			border: 1px solid #e5e7eb !important;
			border-radius: 8px !important;
			font-size: 14px !important;
			color: #374151 !important;
			outline: none !important;
			transition: all 0.3s ease !important;
			display: block !important;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;

			&::placeholder {
				color: #9ca3af !important;
			}

			&:hover {
				border-color: #d1d5db !important;
			}

			&:focus {
				border-color: #2563eb !important;
				box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1) !important;
			}
		}

		.rmdp-calendar {
			background-color: white !important;
			border: 1px solid #e5e7eb !important;
			border-radius: 8px !important;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
				0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
			z-index: 999 !important;
			margin-top: 4px !important;

			.rmdp-header {
				padding: 12px !important;
				margin-bottom: 8px !important;

				.rmdp-header-values {
					font-weight: 500 !important;
					color: #111827 !important;
				}
			}

			.rmdp-week-day {
				color: #6b7280 !important;
				font-size: 12px !important;
				font-weight: 500 !important;
			}

			.rmdp-day {
				span {
					color: #374151 !important;
					width: 36px !important;
					height: 36px !important;
					border-radius: 8px !important;
					font-size: 14px !important;

					&:not(.highlight) {
						background-color: transparent !important;
					}
				}

				&.rmdp-selected span:not(.highlight) {
					background-color: #2563eb !important;
					color: white !important;
					font-weight: 500 !important;
				}

				&:not(.rmdp-disabled, .rmdp-day-hidden) span:hover {
					background-color: #f3f4f6 !important;
				}

				&.rmdp-today span {
					background-color: #eff6ff !important;
					color: #2563eb !important;
					font-weight: 500 !important;
				}

				&.rmdp-disabled span {
					color: #d1d5db !important;
				}
			}

			.rmdp-arrow-container {
				border-radius: 6px !important;
				width: 30px !important;
				height: 30px !important;

				&:hover {
					background-color: #f3f4f6 !important;

					.rmdp-arrow {
						border-color: #2563eb !important;
					}
				}
			}

			.rmdp-arrow {
				border: solid #6b7280 !important;
				border-width: 0 2px 2px 0 !important;
				padding: 3px !important;
			}
		}
	}

	&:before {
		content: "";
		position: absolute;
		left: 14px;
		top: 50%;
		transform: translateY(-50%);
		width: 16px;
		height: 16px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'%3E%3C/path%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		pointer-events: none;
		z-index: 1;
	}
`;

const StyledDatePicker = ({ value, onChange, format, minDate, ...props }) => {
	return (
		<DatePickerWrapper>
			<DatePicker
				value={value}
				onChange={onChange}
				format={format}
				minDate={minDate}
				className="custom-date-picker"
				placeholder="Select date"
				{...props}
			/>
		</DatePickerWrapper>
	);
};

export default StyledDatePicker;
