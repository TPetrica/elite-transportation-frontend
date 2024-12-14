import PlacePicker from "@/components/common/PlacePicker";

export default function LocationInputs({
	pickupDetails,
	dropoffDetails,
	onPickupChange,
	onDropoffChange,
}) {
	return (
		<div className="flex flex-col md:flex-row gap-4 w-full mb-6">
			<div className="flex-1">
				<span className="block text-sm font-medium mb-2">Pickup Location</span>
				<div className="relative">
					<i className="icon-from absolute left-3 top-1/2 transform -translate-y-1/2" />
					<PlacePicker
						value={pickupDetails?.address}
						onChange={onPickupChange}
						type="pickup"
						className="w-full pl-10 pr-3 py-2 border rounded-md"
					/>
				</div>
			</div>
			<div className="flex-1">
				<span className="block text-sm font-medium mb-2">
					Drop-off Location
				</span>
				<div className="relative">
					<i className="icon-to absolute left-3 top-1/2 transform -translate-y-1/2" />
					<PlacePicker
						value={dropoffDetails?.address}
						onChange={onDropoffChange}
						type="dropoff"
						className="w-full pl-10 pr-3 py-2 border rounded-md"
					/>
				</div>
			</div>
		</div>
	);
}
