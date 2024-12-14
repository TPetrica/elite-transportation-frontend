import { Link } from "react-router-dom";

export default function BreadCumb2() {
  return (
    <div className="section pt-60 pb-60 bg-primary">
      <div className="container-sub">
        <h1 className="heading-44-medium color-white mb-5">Blog Single</h1>
        <div className="box-breadcrumb">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a to={`/blog-single/1`}>Blog Single</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
