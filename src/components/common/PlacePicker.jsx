import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";
import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
`;

const StyledSelect = styled(Select)`
	&.ant-select {
		width: 100%;
	}

	.ant-select-selector {
		height: 48px !important;
		padding: 8px 12px !important;
		border: 1px solid #e5e7eb !important;
		border-radius: 8px !important;
		background: #fff !important;
		box-shadow: none !important;
		display: flex;
		align-items: center;
	}

	.ant-select-selection-search {
		display: flex;
		align-items: center;
	}

	.ant-select-selection-placeholder {
		color: #6b7280;
	}

	.ant-select-selection-item {
		line-height: 32px !important;
	}
`;

export default function PlacePicker({ value, onChange, type, placeholder }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [internalValue, setInternalValue] = useState(
		value?.address || value || ""
	);
	const { suggestions, loading, getDetails, setSearchInput } =
		useGooglePlacesAutocomplete(import.meta.env.VITE_GOOGLE_MAPS_API_KEY, type);

	// Update internal value when prop value changes
	useEffect(() => {
		setInternalValue(value?.address || value || "");
	}, [value]);

	const handleSearch = (newValue) => {
		setSearchTerm(newValue);
		setSearchInput(newValue);
		setInternalValue(newValue);
		if (newValue) {
			onChange?.({
				address: newValue,
				coordinates: null,
			});
		}
	};

	const handleChange = async (placeId, option) => {
		if (!option) {
			onChange?.({
				address: placeId,
				coordinates: null,
			});
			setInternalValue(placeId);
			return;
		}

		try {
			const details = await getDetails(placeId);
			if (details) {
				onChange?.({
					address: option.label,
					coordinates: {
						lat: details.geometry.location.lat(),
						lng: details.geometry.location.lng(),
					},
				});
				setInternalValue(option.label);
				setSearchTerm("");
				setSearchInput("");
			}
		} catch (error) {
			console.error("Error getting place details:", error);
		}
	};

	const options = suggestions.map((suggestion) => ({
		value: suggestion.place_id,
		label: suggestion.description,
		mainText: suggestion.structured_formatting.main_text,
		secondaryText: suggestion.structured_formatting.secondary_text,
		isAirport: suggestion.types.includes("airport"),
	}));

	return (
		<Container>
			<StyledSelect
				showSearch
				value={internalValue || undefined}
				placeholder={
					placeholder ||
					`Enter ${type === "pickup" ? "pickup" : "drop-off"} location`
				}
				defaultActiveFirstOption={false}
				filterOption={false}
				onSearch={handleSearch}
				onChange={handleChange}
				notFoundContent={null}
				options={options}
				searchValue={searchTerm}
				loading={loading}
				allowClear
				onClear={() => {
					setInternalValue("");
					onChange?.({
						address: "",
						coordinates: null,
					});
				}}
				suffixIcon={loading ? <LoadingOutlined /> : <EnvironmentOutlined />}
				optionRender={(option) => (
					<div style={{ display: "flex", alignItems: "center" }}>
						<span style={{ marginRight: "12px" }}>
							{option.data.isAirport ? "✈️" : "📍"}
						</span>
						<div>
							<div style={{ fontWeight: 500 }}>{option.data.mainText}</div>
							<div style={{ fontSize: "12px", color: "#666" }}>
								{option.data.secondaryText}
							</div>
						</div>
					</div>
				)}
			/>
		</Container>
	);
}
