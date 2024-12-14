import { contactCards } from "@/data/contact";

export default function Offices() {
  return (
    <div className="section pt-60 pb-60">
      <div className="container-sub">
        <div className="row">
          {contactCards.map((elm, i) => (
            <div key={i} className="col-lg-3 col-sm-6 mb-30">
              <div className="cardContact wow fadeInUp">
                <div className="cardImage mb-30">
                  <img src={elm.imageSrc} alt="luxride" />
                </div>
                <div className="cardInfo">
                  <h6 className="heading-20-medium mb-10">{elm.city} Office</h6>
                  <p className="text-16 mb-20">{elm.address}</p>
                  <p className="text-16 mb-20">{elm.phone}</p>
                  <p className="text-16">{elm.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
