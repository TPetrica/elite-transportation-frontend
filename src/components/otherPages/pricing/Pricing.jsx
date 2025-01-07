import {
	additionalFees,
	gratuityNote,
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
						Elite Transportation Between Park City and The Salt Lake
						International Airport
					</p>
					<div className="alert alert-info mt-3" role="alert">
						<i className="fas fa-info-circle me-2"></i>
						{gratuityNote}
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
										<th className="text-dark">Service</th>
										<th className="text-dark">Capacity</th>
										<th className="text-dark">Summer Rate</th>
										<th className="text-dark">Winter Rate</th>
										<th className="text-dark">Info</th>
									</tr>
								</thead>
								<tbody>
									{/* First two rates */}
									{mainRates.slice(0, 2).map((rate, index) => (
										<tr key={index}>
											<td className="fw-medium">{rate.title}</td>
											<td>{rate.capacity}</td>
											<td className="text-success fw-bold">${rate.summer}</td>
											<td className="text-primary fw-bold">${rate.winter}</td>
											<td>
												<button
													className="btn btn-sm btn-outline-primary rounded-pill px-3"
													onClick={() => handleOpenModal(rate)}
												>
													<i className="fas fa-info-circle me-1"></i>
													Details
												</button>
											</td>
										</tr>
									))}

									{/* Group rate with note */}
									<tr className="border-bottom-0">
										<td className="fw-medium">{mainRates[2].title}</td>
										<td>{mainRates[2].capacity}</td>
										<td className="text-success fw-bold">
											${mainRates[2].summer}
										</td>
										<td className="text-primary fw-bold">
											${mainRates[2].winter}
										</td>
										<td>
											<button
												className="btn btn-sm btn-outline-primary rounded-pill px-3"
												onClick={() => handleOpenModal(mainRates[2])}
											>
												<i className="fas fa-info-circle me-1"></i>
												Details
											</button>
										</td>
									</tr>
									<tr>
										<td colSpan="5" className="pt-0 pb-3">
											<div
												className="ms-3 text-muted fst-italic"
												style={{ fontSize: "0.9rem" }}
											>
												<i className="fas fa-info-circle me-2"></i>
												{mainRates[2].note}
											</div>
										</td>
									</tr>
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
											<td className="text-success fw-bold">
												${rate.rate}/hour
											</td>
											<td>{rate.duration}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{hourlyRates[0]?.note && (
							<div className="alert alert-warning mt-3">
								<i className="fas fa-exclamation-triangle me-2"></i>
								{hourlyRates[0].note}
							</div>
						)}
					</div>
				</div>

				{/* Additional Fees and Services */}
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
														{fee.fee === 0
															? "Free (inquire for availability)"
															: `Add $${fee.fee}`}
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

