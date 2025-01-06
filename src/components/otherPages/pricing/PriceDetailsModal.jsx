export const PriceDetailsModal = ({ selectedRate, onClose }) => {
	if (!selectedRate?.details) return null;

	return (
		<div className="modal-wrapper">
			<div className="modal-backdrop" onClick={onClose} />
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Rate Breakdown</h5>
						<button type="button" className="close-button" onClick={onClose}>
							×
						</button>
					</div>
					<div className="modal-body">
						<div className="rate-header">
							<div>{selectedRate.vehicle}</div>
							<div className="capacity">{selectedRate.capacity}</div>
						</div>

						<div className="price-list">
							<div className="price-item">
								<span>Base Price</span>
								<span>${selectedRate.details.basePrice}</span>
							</div>

							<div className="price-item">
								<span>Winter SUV Fee</span>
								<span>${selectedRate.details.winterSUV}</span>
							</div>

							<div className="price-item">
								<span>Standard Gratuity (20%)</span>
								<span>${selectedRate.details.standardGratuity}</span>
							</div>

							<div className="price-item">
								<span>Fuel Surcharge</span>
								<span>${selectedRate.details.fuelSurcharge}</span>
							</div>

							<div className="price-total">
								<span>Total</span>
								<span>${selectedRate.details.totalPrice}</span>
							</div>
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
				}

				.modal-header {
					padding: 1.25rem;
					border-bottom: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.modal-title {
					font-size: 1.25rem;
					font-weight: 500;
					color: #333;
					margin: 0;
				}

				.close-button {
					background: none;
					border: none;
					font-size: 1.5rem;
					padding: 0;
					cursor: pointer;
					color: #666;
				}

				.modal-body {
					padding: 1.5rem;
				}

				.rate-header {
					margin-bottom: 1.5rem;
					font-size: 1.1rem;
				}

				.capacity {
					color: #666;
					font-size: 0.9rem;
					margin-top: 0.25rem;
				}

				.price-list {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
				}

				.price-item {
					display: flex;
					justify-content: space-between;
					padding: 0.5rem 0;
					border-bottom: 1px solid #eee;
				}

				.price-total {
					display: flex;
					justify-content: space-between;
					padding: 1rem 0;
					margin-top: 0.5rem;
					border-top: 2px solid #eee;
					font-weight: 600;
					font-size: 1.1rem;
				}
			`}</style>
		</div>
	);
};
