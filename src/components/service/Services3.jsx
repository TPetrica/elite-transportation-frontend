import Pagination from "../common/Pagination";
import { services } from "@/data/services";

import { Link } from "react-router-dom";

export default function Services3() {
  return (
    <div className="section pt-60">
      <div className="container-sub">
        <div className="row">
          {services.slice(0, 6).map((elm, i) => (
            <div key={i} className="col-lg-4 col-sm-6 mb-30">
              <div className="cardService cardServiceStyle4 wow fadeInUp">
                <Link to={`/service-single/${elm.id}`}>
                  <div className="cardImage">
                    <img src={elm.image} alt="Luxride" />
                  </div>
                  <div className="cardInfo">
                    <h3 className="cardTitle text-20-medium color-white mb-10">
                      {elm.title}
                    </h3>
                  </div>
                </Link>
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
    </div>
  );
}
