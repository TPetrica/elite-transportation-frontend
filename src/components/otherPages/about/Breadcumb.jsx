import { Link } from "react-router-dom";

export default function Breadcumb() {
  return (
    <div className="section pt-60 pb-60 bg-primary">
      <div className="container-sub">
        <h1 className="heading-44-medium color-white mb-5">About Us</h1>
        <div className="box-breadcrumb">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/service-grid">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
