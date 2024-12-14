import { features7 } from "@/data/features";

export default function Features2() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            Airport transfer in the city
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              We offer luxury chauffeur driven airport transfers and pickups to
              London. Exceptional Safe, Meet and Greet. One hour of
              complimentary wait time and flight tracking. Professional Drivers
              & Vehicles. Fixed prices on airport transfers. VIP service, get
              your quote today!
            </p>
            <p>
              Et, morbi at sagittis vehicula rutrum. Lacus tortor, quam arcu mi
              et, at lectus leo nunc. Mattis cras auctor vel pharetra tempor.
              Rhoncus pellentesque habitant ac tempor. At aliquam euismod est in
              praesent ornare etiam id. Faucibus libero sit vehicula sed
              condimentum. Vitae in nam porttitor rutrum sed aliquam donec sed.
              Sapien facilisi lectus.
            </p>
            <ul className="list-ticks list-ticks-small">
              {features7.map((elm, i) => (
                <li key={i} className="text-16 mb-20">
                  {elm}
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
                Get to or from the airport
              </h3>
              <p className="text-16 color-text">
                The price of tickets for low-cost airlines for a specific route
                has a much larger spread than that of regular airlines. It
                depends on the time to departure, demand and competition on the
                route. Unlike regular airlines, low-cost airlines rarely offer
                cheap tickets more than 3 months before departure.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90 mb-120">
          <div className="col-lg-6 mb-30">
            <div className="box-info-left wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
                Airport shuttle booking
              </h3>
              <p className="text-16 color-text">
                The price of tickets for low-cost airlines for a specific route
                has a much larger spread than that of regular airlines. It
                depends on the time to departure, demand and competition on the
                route. Unlike regular airlines, low-cost airlines rarely offer
                cheap tickets more than 3 months before departure.
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
