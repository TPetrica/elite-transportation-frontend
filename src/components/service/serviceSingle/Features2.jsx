export default function Features2({ service }) {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            {service.title}
          </h2>
          <div className="content-single wow fadeInUp">
            <p>{service.longDescription}</p>
            <ul className="list-ticks list-ticks-small">
              {service.features.map((feature, i) => (
                <li key={i} className="text-16 mb-20">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row align-items-center mt-90">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src={service.image} alt={service.title} />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
							{service.headings.first}
              </h3>
              <p className="text-16 color-text">{service.additionalInfo.professional}</p>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-90 mb-120">
          <div className="col-lg-6 mb-30">
            <div className="box-info-left wow fadeInUp">
              <h3 className="heading-44-medium color-text mb-30">
							{service.headings.second}
              </h3>
              <p className="text-16 color-text">{service.additionalInfo.reliable}</p>
            </div>
          </div>
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <img src={service.secondaryImage} alt={`${service.title} secondary`} />
          </div>
        </div>
      </div>
    </section>
  );
}