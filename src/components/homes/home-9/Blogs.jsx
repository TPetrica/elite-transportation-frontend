import { blogs } from "@/data/blogs";

import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <section className="section latest-new-white latest-new-background latest-new-home9">
      <div className="box-comfortable-home9-inner bg-primary">
        <div className="container-sub">
          <div className="row align-items-center">
            <div className="col-lg-6 col-7">
              <h2 className="heading-44-medium color-text wow fadeInUp">
                Latest From News
              </h2>
            </div>
            <div className="col-lg-6 col-5 text-end">
              <Link
                className="text-16-medium color-text hover-up d-inline-block wow fadeInUp"
                to="/blog-grid"
              >
                More News
                <svg
                  className="icon-16 color-text"
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
          <div className="row mt-50">
            {blogs.slice(0, 3).map((elm, i) => (
              <div key={i} className="col-lg-4">
                <div className="cardNews wow fadeInUp">
                  <Link to={`/blog-single/${elm.id}`}>
                    <div className="cardImage">
                      <div className="datePost">
                        <div className="heading-52-medium color-white">
                          {elm.date}.
                        </div>
                        <p className="text-14 color-white">{elm.monthYear}</p>
                      </div>
                      <img src={elm.imageSrc} alt="luxride" />
                    </div>
                  </Link>
                  <div className="cardInfo">
                    <div className="tags mb-10">
                      <a href="#">{elm.category}</a>
                    </div>
                    <Link className="color-white" to={`/blog-single/${elm.id}`}>
                      <h3 className="text-20-medium color-white mb-20">
                        {elm.title}
                      </h3>
                    </Link>
                    <Link
                      className="cardLink btn btn-arrow-up"
                      to={`/blog-single/${elm.id}`}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
