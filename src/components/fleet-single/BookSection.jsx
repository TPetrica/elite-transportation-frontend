export default function BookSection({ car }) {
  return (
    <section className="section mt-90">
      <div className="container-sub">
        <h2 className="heading-44-medium wow fadeInUp">
          Book Your Business Class
        </h2>
        <div className="row mt-50">
          <div className="col-xl-8 col-lg-7 mb-30">
            <h5 className="text-20-medium color-text mb-10 wow fadeInUp">
              {car.title}
            </h5>
            <p className="text-14 color-text mb-15 wow fadeInUp">
              {car.description}
            </p>
            <div className="mt-5 wow fadeInUp">
              <span className="passengers-info mr-20 color-text">
                Passengers {car.passenger}
              </span>
              <span className="luggages-info color-text">
                Luggage {car.luggage}
              </span>
            </div>
            <div className="mt-20 text-center wow fadeInUp">
              <img className="d-block" src={car.imgSrc} alt="luxride" />
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 mb-30">
            <div className="box-vehicle-price wow fadeInUp">
              <ul className="list-prices">
                <li>
                  <span className="text">Hourly rate (minimum 3 hours)</span>
                  <span className="price">$29</span>
                </li>
                <li>
                  <span className="text">Day rate (8 hours)</span>
                  <span className="price">$136</span>
                </li>
                <li>
                  <span className="text">Heathrow to Central London</span>
                  <span className="price">$780</span>
                </li>
              </ul>
              <div className="mt-30 wow fadeInUp">
                <a className="btn btn-primary btn-book mw-100">
                  Book Now
                  <svg
                    className="icon-16 ml-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="row mt-30">
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-meet">
                  Meet & Greet included
                </span>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-free-cancel">
                  Free cancellation
                </span>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-free-wait">
                  Free Waiting time
                </span>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-6 mb-20 wow fadeInUp">
                <span className="text-conditions icon-safe">
                  Safe and secure travel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
