import { cars } from "@/data/cars";

import { Link } from "react-router-dom";

export default function BusnessClassFleet() {
  return (
    <section className="section mt-50 mb-50">
      <div className="container-sub">
        <h2 className="heading-44-medium wow fadeInUp">
          Book Your Business Class
        </h2>
        <div className="row mt-50">
          {cars.map((elm, i) => (
            <div key={i} className="col-lg-4 col-md-6 mb-30">
              <div className="cardFleet wow fadeInUp">
                <div className="cardInfo">
                  <Link to={`/fleet-single/${elm.id}`}>
                    <h3 className="text-20-medium color-text mb-10">
                      {elm.title}
                    </h3>
                  </Link>
                  <p className="text-14 color-text mb-30">{elm.description}</p>
                </div>
                <div className="cardImage mb-30">
                  <Link to={`/fleet-single/${elm.id}`}>
                    <img src={elm.imgSrc} alt="Luxride" />
                  </Link>
                </div>
                <div className="cardInfoBottom">
                  <div className="passenger">
                    <span className="icon-circle icon-passenger"></span>
                    <span className="text-14">
                      Passengers<span>{elm.passenger}</span>
                    </span>
                  </div>
                  <div className="luggage">
                    <span className="icon-circle icon-luggage"></span>
                    <span className="text-14">
                      Luggage<span>{elm.luggage}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
