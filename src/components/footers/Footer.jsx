import { legalLinks, links1, links2, links3 } from "@/data/footerLinks";

import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-1">
				<div className="container-sub">
					<div className="box-footer-top">
						<div className="row align-items-center">
							<div className="col-lg-6 col-md-6 text-md-start text-center mb-15 wow fadeInUp">
								<div className="d-flex align-items-center justify-content-md-start justify-content-center">
									<a className="mr-30" href="#">
										<img
											src="/assets/imgs/template/logo-nobg.png"
											alt="Elite Transportation"
											style={{ maxWidth: "200px" }}
										/>
									</a>
									<a
										className="text-14-medium call-phone color-white hover-up"
										href="tel:+1 (435) 901-9158"
									>
										+1 (435) 901-9158
									</a>
								</div>
							</div>
							{/* <div className="col-lg-6 col-md-6 text-md-end text-center mb-15 wow fadeInUp">
								<div className="d-flex align-items-center justify-content-md-end justify-content-center">
									<span className="text-18-medium color-white mr-10">
										Follow Us
									</span>
									{socialMediaPlatforms.map((elm, i) => (
										<a key={i} className={elm.className} href={elm.href}></a>
									))}
								</div>
							</div> */}
						</div>
					</div>
					<div className="row mb-40">
						<div className="col-lg-3 width-20">
							<h5 className="text-18-medium color-white mb-20 wow fadeInUp">
								Company
							</h5>
							<ul className="menu-footer wow fadeInUp">
								{links1.map((elm, i) => (
									<li key={i}>
										<Link to={elm.href}>{elm.text}</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="col-lg-3 width-20 mb-30">
							<h5 className="text-18-medium color-white mb-20 wow fadeInUp">
								Top cities
							</h5>
							<ul className="menu-footer wow fadeInUp">
								{links2.map((elm, i) => (
									<li key={i}>
										<a href={elm.href}>{elm.name}</a>
									</li>
								))}
							</ul>
						</div>
						<div className="col-lg-3 width-20 mb-30">
							<h5 className="text-18-medium color-white mb-20 wow fadeInUp">
								Services
							</h5>
							<ul className="menu-footer wow fadeInUp">
								{links3.map((elm, i) => (
									<li key={i}>
										<a href={elm.href}>{elm.name}</a>
									</li>
								))}
							</ul>
						</div>
						{/* <div className="col-lg-3 width-20 mb-30">
              <h5 className="text-18-medium color-white mb-20 wow fadeInUp">
                Classes
              </h5>
              <ul className="menu-footer wow fadeInUp">
                {links4.map((elm, i) => (
                  <li key={i}>
                    <a href={elm.href}>{elm.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 width-20">
              <h5 className="text-18-medium color-white mb-20 wow fadeInUp">
                Download The App
              </h5>
              <div className="text-start wow fadeInUp">
                <div className="box-button-download">
                  <a
                    className="btn btn-download hover-up wow fadeInUp"
                    href="#"
                  >
                    <div className="inner-download">
                      <div className="icon-download">
                        <img
                          src="/assets/imgs/template/icons/apple-icon.svg"
                          alt="luxride"
                        />
                      </div>
                      <div className="info-download">
                        <span className="text-download-top">
                          Download on the
                        </span>
                        <span className="text-14-medium">Apple Store</span>
                      </div>
                    </div>
                  </a>
                  <a
                    className="btn btn-download hover-up wow fadeInUp"
                    href="#"
                  >
                    <div className="inner-download">
                      <div className="icon-download">
                        <img
                          src="/assets/imgs/template/icons/google-icon.svg"
                          alt="luxride"
                        />
                      </div>
                      <div className="info-download">
                        <span className="text-download-top">
                          Download on the
                        </span>
                        <span className="text-14-medium">Apple Store</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div> */}
					</div>
				</div>
			</div>
			<div className="footer-2">
				<div className="container-sub">
					<div className="footer-bottom">
						<div className="row align-items-center">
							<div className="col-lg-8 col-md-12 text-center text-lg-start">
								<span className="text-14 color-white mr-30">
									© {new Date().getFullYear()} Elite Transportation
								</span>
								<ul className="menu-bottom">
									{legalLinks.map((elm, i) => (
										<li key={i}>
											<Link to={elm.href}>{elm.name}</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="col-lg-4 col-md-12 text-center text-lg-end">
								<a className="btn btn-link-location" href="#">
									Park City, Salt Lake
								</a>
								<a className="btn btn-link-globe active" href="#">
									English
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

