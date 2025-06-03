import { Link } from "react-router-dom";

export default function Banner2() {
  return (
    <section className="section bg-primary banner-about">
      <div className="container-sub">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="padding-box">
              <div className="mt-60 wow fadeInUp">
                <h2 className="heading-44-medium mb-30 color-white title-fleet">
                  Luxury Transportation from Salt Lake City to Park City
                </h2>
                <div className="content-single">
                  <p className="color-white">
                    Welcome to Elite Transportation, your trusted provider of premium car service from Salt Lake City Airport to Park City, Utah. Based near Salt Lake City International Airport (SLC), we offer reliable and luxurious transportation options for travelers seeking the best way to get from SLC to Park City. Our family-owned business specializes in airport shuttle services, on-demand transportation, and private car service throughout Utah's Wasatch Range.
                  </p>
                  <ul className="list-ticks list-ticks-small">
                    <li className="text-16 mb-20 color-white">
                      Luxury SLC to Park City Shuttle Service
                    </li>
                    <li className="text-16 mb-20 color-white">
                      Flight Tracking for Salt Lake City Arrivals
                    </li>
                    <li className="text-16 mb-20 color-white">
                      Professional Airport Car Service
                    </li>
                    <li className="text-16 mb-20 color-white">
                      Experienced Winter Driving Specialists
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