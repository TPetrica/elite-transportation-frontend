import { Link } from "react-router-dom";

export default function Breadcumb() {
  return (
    <div className="section pt-60 pb-60 bg-primary">
      <div className="container-sub">
        <h1 className="heading-44-medium color-white mb-5">About Our SLC to Park City Transportation</h1>
        <p className="color-white mb-20">Premier car service from Salt Lake City Airport to Park City Utah</p>
        <div className="box-breadcrumb">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/service-grid">Salt Lake City Airport Shuttle</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}