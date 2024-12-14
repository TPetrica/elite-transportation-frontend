import Pagination from "../common/Pagination";
import { services } from "@/data/services";

import { Link } from "react-router-dom";

export default function Services1() {
  return (
    <section className="section pt-60">
      <div className="container-sub">
        <div className="row">
          {services.slice(0, 6).map((elm, i) => (
            <div key={i} className="col-lg-4 col-sm-6 mb-30">
              <div className="cardService wow fadeInUp">
                <div className="cardInfo">
                  <h3 className="cardTitle text-20-medium color-white mb-10">
                    {elm.title}
                  </h3>
                  <div className="box-inner-info">
                    <p className="cardDesc text-14 color-white mb-30">
                      {elm.description}
                    </p>
                    <Link
                      className="cardLink btn btn-arrow-up"
                      to={`/service-single/${elm.id}`}
                    >
                      <svg
                        className="icon-16"
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
                <div className="cardImage">
                  <img src={elm.image} alt="Luxride" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-40 mb-120 wow fadeInUp">
          <nav className="box-pagination">
            <Pagination />
          </nav>
        </div>
      </div>
    </section>
  );
}
