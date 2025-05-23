import { blogs3, categories, recentPosts, tags } from "@/data/blogs";
import Pagination from "../common/Pagination";

import { Link } from "react-router-dom";

export default function Blogs2() {
  return (
    <section className="section pt-60 bg-white latest-new-white">
      <div className="container-sub">
        <div className="row">
          <div className="col-lg-8">
            <div className="row cardNewsBig">
              {blogs3.map((elm, i) => (
                <div key={i} className="col-lg-12">
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
                        <a href="#">{elm.tag}</a>
                      </div>
                      <Link
                        className="color-white"
                        to={`/blog-single/${elm.id}`}
                      >
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
            <div className="text-center mt-40 mb-120">
              <nav className="box-pagination">
                <Pagination />
              </nav>
            </div>
          </div>
          <div className="col-lg-4 wow fadeInUp">
            <div className="box-form-search">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                />
                <button className="btn btn-search-2" type="submit">
                  <svg
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className="sidebar-radius">
              <h5 className="text-20-medium sidebar-title">Categories</h5>
              <div className="sidebar-content">
                <ul>
                  {categories.map((elm, i) => (
                    <li key={i}>
                      <a href={elm.href}>{elm.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="sidebar-radius">
              <h5 className="text-20-medium sidebar-title">Recent Posts</h5>
              <div className="sidebar-content">
                <ul>
                  {recentPosts.map((elm, i) => (
                    <li key={i}>
                      <div className="recent-post">
                        <div className="image-post">
                          <a href="#">
                            <img src={elm.imageSrc} alt="" />
                          </a>
                        </div>
                        <div className="info-post">
                          <div className="date-post">{elm.fullDate}</div>
                          <a className="link-post" href="#">
                            {elm.title}
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="sidebar-radius">
              <h5 className="text-20-medium sidebar-title">Tags</h5>
              <div className="sidebar-content">
                {tags.map((elm, i) => (
                  <a
                    key={i}
                    className="btn btn-tag mb-10 mr-10"
                    href={elm.href}
                  >
                    {elm.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
