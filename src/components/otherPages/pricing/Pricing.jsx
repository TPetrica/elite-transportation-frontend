import {
	additionalFees,
	hourlyRates,
	mainRates,
	serviceTypes,
} from "@/data/pricing";
import { useState } from "react";
import { PriceDetailsModal } from "./PriceDetailsModal";

export default function Pricing() {
	const [selectedRate, setSelectedRate] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = (rate) => {
		setSelectedRate(rate);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedRate(null);
	};

	return (
		<section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
			<div className="container">
				{/* Main Heading */}
				<div className="text-center mb-5">
					<h1 className="display-4 mb-3" style={{ color: "#2c3e50" }}>
						Transportation Rates
					</h1>
					<p className="lead text-muted">
						Luxury transportation between Park City and Salt Lake International
						Airport
					</p>
					<div className="alert alert-info mt-3" role="alert">
						<i className="fas fa-info-circle me-2"></i>
						All rates include private luxury SUV, professional driver, taxes,
						and fees. 20% gratuity is automatically added.
					</div>
				</div>

				{/* Main Rates Table */}
				<div className="card shadow-sm mb-5 border-0">
					<div
						className="card-header py-3"
						style={{ backgroundColor: "#1a237e" }}
					>
						<h3 className="h4 mb-0 text-white">Airport Transfer Rates</h3>
					</div>
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-hover align-middle">
								<thead className="table-light">
									<tr>
										<th className="text-dark">Vehicle</th>
										<th className="text-dark">Capacity</th>
										<th className="text-dark">Summer Rate</th>
										<th className="text-dark">Winter Rate</th>
										<th className="text-dark">Action</th>
									</tr>
								</thead>
								<tbody>
									{mainRates.map((rate, index) => (
										<tr key={index}>
											<td className="fw-medium">{rate.vehicle}</td>
											<td>{rate.capacity}</td>
											<td className="text-success fw-bold">${rate.summer}</td>
											<td className="text-primary fw-bold">${rate.winter}</td>
											<td>
												{rate.details && (
													<button
														className="btn btn-sm btn-outline-primary rounded-pill px-3"
														onClick={() => handleOpenModal(rate)}
													>
														<i className="fas fa-info-circle me-1"></i>
														Details
													</button>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Hourly Rates */}
				<div className="card shadow-sm mb-5 border-0">
					<div
						className="card-header py-3"
						style={{ backgroundColor: "#1a237e" }}
					>
						<h3 className="h4 mb-0 text-white">Hourly As-Directed Service</h3>
					</div>
					<div className="card-body">
						<div className="alert alert-light border mb-4">
							<i className="fas fa-car me-2"></i>
							Hire a Driver and a Luxury SUV for your special event or night on
							the town! Includes luxury vehicle, driver, taxes, fees, and
							bottled water.
						</div>
						<div className="table-responsive">
							<table className="table table-hover align-middle">
								<thead className="table-light">
									<tr>
										<th className="text-dark">Vehicle</th>
										<th className="text-dark">Capacity</th>
										<th className="text-dark">Rate</th>
										<th className="text-dark">Duration</th>
									</tr>
								</thead>
								<tbody>
									{hourlyRates.map((rate, index) => (
										<tr key={index}>
											<td className="fw-medium">{rate.vehicle}</td>
											<td>{rate.capacity}</td>
											<td className="text-success fw-bold">${rate.rate}</td>
											<td>{rate.duration}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Additional Fees */}
				<div className="row g-4">
					<div className="col-md-6">
						<div className="card shadow-sm h-100 border-0">
							<div
								className="card-header py-3"
								style={{ backgroundColor: "#1a237e" }}
							>
								<h3 className="h4 mb-0 text-white">Additional Services</h3>
							</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-hover align-middle">
										<thead className="table-light">
											<tr>
												<th className="text-dark">Service</th>
												<th className="text-dark">Fee</th>
											</tr>
										</thead>
										<tbody>
											{additionalFees.map((fee, index) => (
												<tr key={index}>
													<td>
														<div className="fw-medium">{fee.service}</div>
														{fee.note && (
															<small className="text-muted d-block">
																{fee.note}
															</small>
														)}
													</td>
													<td className="text-success fw-bold">
														{fee.fee === 0 ? "Free" : `$${fee.fee}`}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="card shadow-sm h-100 border-0">
							<div
								className="card-header py-3"
								style={{ backgroundColor: "#1a237e" }}
							>
								<h3 className="h4 mb-0 text-white">Available Services</h3>
							</div>
							<div className="card-body">
								<div className="list-group list-group-flush">
									{serviceTypes.map((service, index) => (
										<div key={index} className="list-group-item">
											<div className="d-flex w-100 justify-content-between align-items-center">
												<h6 className="mb-1">{service.type}</h6>
											</div>
											<p className="mb-1 text-muted small">{service.details}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Modal */}
				{showModal && selectedRate && (
					<PriceDetailsModal
						selectedRate={selectedRate}
						onClose={handleCloseModal}
					/>
				)}
			</div>
		</section>
	);
}
