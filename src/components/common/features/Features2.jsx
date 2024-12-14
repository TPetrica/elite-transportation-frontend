const listItems = ["Affordable", "Punctual", "Professional"];

export default function Features() {
  return (
    <section className="section pt-120 pb-120">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-30">
            <div className="box-image-showcase wow fadeInUp">
              <div className="box-image-top text-center text-lg-start">
                <img src="/assets/imgs/page/homepage3/img1.png" alt="luxride" />
              </div>
              <div className="box-image-bottom text-end text-sm-center text-lg-end">
                <img src="/assets/imgs/page/homepage3/img3.png" alt="luxride" />
                <img src="/assets/imgs/page/homepage3/img2.png" alt="luxride" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-region-right wow fadeInUp">
              <h2 className="heading-44-medium color-text mb-30">
                Reliability, <br className="d-none d-lg-block" />
                worldwide
              </h2>
              <p className="text-16 color-text mb-20">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla
                suscipit.
              </p>
              <ul className="list-ticks">
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
