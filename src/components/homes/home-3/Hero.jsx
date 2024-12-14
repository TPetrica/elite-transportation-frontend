import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="section banner-home-3">
      <div className="box-banner-homepage-3">
        <div className="box-cover-image boxBgImage"></div>
        <div className="box-banner-info">
          <h1 className="heading-52-medium color-white wow fadeInUp">
            Hire a Personal Driver <br className="d-none d-lg-block" />
            for Long-Distance <br className="d-none d-lg-block" />
            Road Trip
          </h1>
          <div className="mt-30">
            <Link
              className="btn btn-secondary wow fadeInUp"
              to="/booking-vehicle"
            >
              Online Booking Now
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
            </Link>
          </div>
        </div>
        <div className="box-image-banner d-none d-lg-flex">
          <img
            className="img-1"
            src="/assets/imgs/page/homepage3/banner1.png"
            alt="Luxride"
          />
          <img
            className="img-2"
            src="/assets/imgs/page/homepage3/banner2.png"
            alt="Luxride"
          />
          <img
            className="img-3"
            src="/assets/imgs/page/homepage3/banner3.png"
            alt="Luxride"
          />
        </div>
      </div>
    </section>
  );
}
