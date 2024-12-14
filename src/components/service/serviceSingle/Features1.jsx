import { features8 } from "@/data/features";

export default function Features1() {
  return (
    <section className="section mt-90">
      <div className="container-sub">
        <div className="row cardIconTitleDescLeft">
          {features8.map((elm, i) => (
            <div key={i} className="col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="cardIconTitleDesc wow fadeInUp">
                <div className="cardIcon">
                  <img src={elm.imgSrc} alt="luxride" />
                </div>
                <div className="cardTitle">
                  <h5 className="text-20-medium color-text">{elm.title}</h5>
                </div>
                <div className="cardDesc">
                  <p className="text-16 color-text">{elm.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
