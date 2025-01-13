import { Link } from "react-router-dom";

export default function Banner2() {
	return (
		<section className="section bg-primary banner-about">
			<div className="container-sub">
				<div className="row">
					<div className="col-lg-5 col-md-12">
						<div className="padding-box">
							<h2 className="heading-44-medium color-white mb-5">About Us</h2>
							<div className="box-breadcrumb">
								<ul>
									<li>
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="/service-grid">About</Link>
									</li>
								</ul>
							</div>
							<div className="mt-60 wow fadeInUp">
								<h2 className="heading-44-medium mb-30 color-white title-fleet">
									Welcome to Elite Transportation
								</h2>
								<div className="content-single">
									<p className="color-white">
										Welcome to Elite Transportation, your trusted premium black
										SUV airport transportation provider and on-demand driving
										services in Park City, Utah. Our family-owned business is
										built on dedication, integrity, and a deep commitment to
										exceptional service. As a family of Romanian immigrants, we
										are proud to bring our passion for hospitality and
										professionalism to the transportation industry.
									</p>
									<ul className="list-ticks list-ticks-small">
										<li className="text-16 mb-20 color-white">
											Premium Black SUV Fleet
										</li>
										<li className="text-16 mb-20 color-white">
											Family-Owned Business
										</li>
										<li className="text-16 mb-20 color-white">
											Exceptional Service
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="box-banner-right wow fadeInUp"></div>
		</section>
	);
}
