import DatePickerComponent from "@/components/common/DatePicker";
import DatePicker from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import TimePicker from "@/components/common/TimePicker";

import { useState } from "react";
import ModalVideo from "react-modal-video";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="section banner-home1 banner-home10">
        <div
          className="box-cover-image boxBgImage"
          style={{
            backgroundImage: "url(/assets/imgs/page/homepage10/banner.png)",
          }}
        >
          <div className="box-banner-info d-flex justify-content-between align-items-center">
            <div className="banner-info-left">
              <h2 className="heading-52-medium color-white wow fadeInUp">
                The Nation’s #1 Largest <br className="d-none d-lg-block" />
                Personal Driver Service
              </h2>
              <p className="text-16 color-white wow fadeInUp">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla
                <br className="d-none d-lg-block" />
                suscipit. Maecenas ultrices.
              </p>
            </div>
            <div className="banner-info-right wow fadeInUp">
              <a
                className="popup-youtube btn-play-big shape-1"
                onClick={() => setIsOpen(true)}
              ></a>
            </div>
          </div>
        </div>
        <div className="box-search-ride box-search-ride-style-6 wow fadeInUp">
          <div className="box-search-tabs">
            <div className="head-tabs">
              <ul className="nav nav-tabs nav-tabs-search" role="tablist">
                <li>
                  <a
                    className="active"
                    href="#tab-distance"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="tab-distance"
                    aria-selected="true"
                  >
                    Distance
                  </a>
                </li>
                <li>
                  <a
                    href="#tab-hourly"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="tab-hourly"
                    aria-selected="false"
                  >
                    Hourly
                  </a>
                </li>
                <li>
                  <a
                    href="#tab-rate"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="tab-rate"
                    aria-selected="false"
                  >
                    Flat Rate
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="tab-distance"
                role="tabpanel"
                aria-labelledby="tab-distance"
              >
                <div className="box-form-search">
                  <div className="search-item search-date">
                    <div className="search-icon">
                      <span className="item-icon icon-date"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Date</label>
                      <DatePicker />
                    </div>
                  </div>
                  <div className="search-item search-time">
                    <div className="search-icon">
                      <span className="item-icon icon-time"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Time</label>
                      <TimePicker />
                    </div>
                  </div>
                  <div className="search-item search-from">
                    <div className="search-icon">
                      <span className="item-icon icon-from"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">From</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-to">
                    <div className="search-icon">
                      <span className="item-icon icon-to"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">To</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-button mb-0">
                    <button className="btn btn-search" type="submit">
                      <img
                        src="/assets/imgs/template/icons/search.svg"
                        alt="luxride"
                      />
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-hourly"
                role="tabpanel"
                aria-labelledby="tab-hourly"
              >
                <div className="box-form-search">
                  <div className="search-item search-time">
                    <div className="search-icon">
                      <span className="item-icon icon-time"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Time</label>
                      <TimePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-date">
                    <div className="search-icon">
                      <span className="item-icon icon-date"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Date</label>
                      <DatePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-from">
                    <div className="search-icon">
                      <span className="item-icon icon-from"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">From</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-to">
                    <div className="search-icon">
                      <span className="item-icon icon-to"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">To</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-button mb-0">
                    <button className="btn btn-search" type="submit">
                      <img
                        src="/assets/imgs/template/icons/search.svg"
                        alt="luxride"
                      />
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-rate"
                role="tabpanel"
                aria-labelledby="tab-rate"
              >
                <div className="box-form-search">
                  <div className="search-item search-date">
                    <div className="search-icon">
                      <span className="item-icon icon-date"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Date</label>
                      <DatePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-time">
                    <div className="search-icon">
                      <span className="item-icon icon-time"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Time</label>
                      <TimePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-from">
                    <div className="search-icon">
                      <span className="item-icon icon-from"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">From</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-to">
                    <div className="search-icon">
                      <span className="item-icon icon-to"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">To</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-button mb-0">
                    <button className="btn btn-search" type="submit">
                      <img
                        src="/assets/imgs/template/icons/search.svg"
                        alt="luxride"
                      />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="sVPYIRF9RCQ"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
