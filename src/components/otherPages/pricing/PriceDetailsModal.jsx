export const PriceDetailsModal = ({ selectedRate, onClose }) => {
	return (
		<div className="modal-wrapper">
			<div className="modal-backdrop" onClick={onClose} />
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{selectedRate.title} Details</h5>
						<button type="button" className="close-button" onClick={onClose}>
							×
						</button>
					</div>
					<div className="modal-body">
						<div className="rate-header">
							<div className="description mb-4">
								<h6 className="text-muted">Description</h6>
								<p>{selectedRate.description}</p>
							</div>

							<div className="capacity mb-4">
								<h6 className="text-muted">Capacity</h6>
								<p>{selectedRate.capacity}</p>
							</div>

							<div className="features mb-4">
								<h6 className="text-muted">Features</h6>
								<ul className="feature-list">
									{selectedRate.features.map((feature, index) => (
										<li key={index}>{feature}</li>
									))}
								</ul>
							</div>

							<div className="rates">
								<h6 className="text-muted">Rates</h6>
								<div className="rate-grid">
									<div className="rate-item">
										<span>Summer Rate</span>
										<span className="price">${selectedRate.summer}</span>
									</div>
									<div className="rate-item">
										<span>Winter Rate</span>
										<span className="price">${selectedRate.winter}</span>
									</div>
								</div>
							</div>

							{selectedRate.note && (
								<div className="note mt-4">
									<h6 className="text-muted">Note</h6>
									<p className="alert alert-info">
										<i className="fas fa-info-circle me-2"></i>
										{selectedRate.note}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.modal-wrapper {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 1050;
				}

				.modal-backdrop {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.5);
				}

				.modal-dialog {
					position: relative;
					width: 90%;
					max-width: 500px;
					margin: 1.75rem auto;
					z-index: 1051;
				}

				.modal-content {
					background: white;
					border-radius: 8px;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
					border: none;
				}

				.modal-header {
					padding: 1rem;
					border-bottom: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #1a237e;
					color: white;
					border-radius: 8px 8px 0 0;
				}

				.modal-title {
					font-size: 1.25rem;
					font-weight: 500;
					margin: 0;
					color: white;
				}

				.close-button {
					background: none;
					border: none;
					font-size: 1.5rem;
					padding: 0;
					cursor: pointer;
					color: white;
				}

				.modal-body {
					padding: 1.5rem;
				}

				.description p {
					margin-bottom: 0;
					color: #333;
				}

				.feature-list {
					list-style: none;
					padding: 0;
					margin: 0;
				}

				.feature-list li {
					padding: 0.5rem 0;
					border-bottom: 1px solid #eee;
					color: #333;
				}

				.feature-list li:last-child {
					border-bottom: none;
				}

				.rate-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1rem;
					margin-top: 0.5rem;
				}

				.rate-item {
					padding: 1rem;
					background-color: #f8f9fa;
					border-radius: 4px;
					text-align: center;
				}

				.rate-item span {
					display: block;
				}

				.rate-item .price {
					font-size: 1.25rem;
					font-weight: bold;
					color: #1a237e;
					margin-top: 0.5rem;
				}

				h6.text-muted {
					margin-bottom: 0.5rem;
					color: #666;
				}
			`}</style>
		</div>
	);
};

