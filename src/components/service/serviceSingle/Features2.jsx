export default function Features2({ service }) {
	return (
		<section className="section">
			<div className="container-sub">
				<div className="mt-120">
					<h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
						{service.title}
					</h2>
					<div className="content-single wow fadeInUp">
						<p>{service.longDescription}</p>
						<ul className="list-ticks list-ticks-small">
							{service.features.map((feature, i) => (
								<li key={i} className="text-16 mb-20">
									{feature}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="row align-items-center mt-90">
					<div className="col-lg-6 mb-30 wow fadeInUp">
						<img src="/assets/imgs/page/services/img1.png" alt="luxride" />
					</div>
					<div className="col-lg-6 mb-30">
						<div className="box-info-right wow fadeInUp">
							<h3 className="heading-44-medium color-text mb-30">
								Professional Service
							</h3>
							<p className="text-16 color-text">{service.description}</p>
						</div>
					</div>
				</div>
				<div className="row align-items-center mt-90 mb-120">
					<div className="col-lg-6 mb-30">
						<div className="box-info-left wow fadeInUp">
							<h3 className="heading-44-medium color-text mb-30">
								Reliable Transportation
							</h3>
							<p className="text-16 color-text">
								Enjoy reliable and professional transportation services with our
								experienced team. We prioritize your comfort and satisfaction
								with every journey.
							</p>
						</div>
					</div>
					<div className="col-lg-6 mb-30 wow fadeInUp">
						<img src="/assets/imgs/page/services/img2.png" alt="luxride" />
					</div>
				</div>
			</div>
		</section>
	);
}

