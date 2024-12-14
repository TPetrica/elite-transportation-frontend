import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";
import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
`;

const Label = styled.label`
	display: block;
	font-weight: 500;
	margin-bottom: 8px;
	color: #333;
`;

const StyledSelect = styled(Select)`
	&.ant-select {
		width: 100%;
	}

	.ant-select-selector {
		height: 48px !important;
		padding: 16px !important;
		border: 1px solid #e5e7eb !important;
		border-radius: 8px !important;
		background: #fff !important;
		box-shadow: none !important;
	}

	.ant-select-selection-search {
		width: 100% !important;
	}

	.ant-select-selection-item {
		text-overflow: ellipsis !important;
		overflow: hidden !important;
		white-space: nowrap !important;
		max-width: calc(100% - 32px) !important;
		padding-right: 20px !important;
	}

	.ant-select-dropdown {
		max-width: calc(100vw - 32px);
	}

	.ant-select-item {
		max-width: 100%;
		white-space: normal;
		word-wrap: break-word;
	}

	.ant-select-selection-placeholder {
		text-overflow: ellipsis !important;
		overflow: hidden !important;
		white-space: nowrap !important;
	}
`;

export default function PlacePicker({ value, onChange, type, label }) {
	const [searchTerm, setSearchTerm] = useState("");
	const { suggestions, loading, getDetails, setSearchInput } =
		useGooglePlacesAutocomplete(import.meta.env.VITE_GOOGLE_MAPS_API_KEY, type);

	const handleSearch = (newValue) => {
		setSearchTerm(newValue);
		setSearchInput(newValue);
		if (newValue) {
			onChange({
				address: newValue,
				coordinates: null,
			});
		}
	};

	const handleChange = async (placeId, option) => {
		if (!option) {
			onChange({
				address: placeId,
				coordinates: null,
			});
			return;
		}

		try {
			const details = await getDetails(placeId);
			if (details) {
				onChange({
					address: option.label,
					coordinates: {
						lat: details.geometry.location.lat(),
						lng: details.geometry.location.lng(),
					},
				});
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
			<Label>{label}</Label>
			<StyledSelect
				showSearch
				value={value?.address || value}
				placeholder={`Enter ${
					type === "pickup" ? "pickup" : "drop-off"
				} location`}
				defaultActiveFirstOption={false}
				filterOption={false}
				onSearch={handleSearch}
				onChange={handleChange}
				notFoundContent={null}
				options={options}
				searchValue={searchTerm}
				loading={loading}
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

