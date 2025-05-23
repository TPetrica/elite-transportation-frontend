export default function DownloadApp() {
  return (
    <section className="section mt-50 bg-download-3 bg-secondary">
      <div className="container-sub">
        <h2 className="heading-44-medium color-white mb-20 wow fadeInUp">
          Download the app
        </h2>
        <p className="color-white text-16 mb-60 wow fadeInUp">
          Have a personal driver at your fingertips no matter where you
          <br className="d-none d-md-block" />
          are with our easy-to-use smartphone app.
        </p>
        <div className="box-button-download">
          <a className="btn btn-download mr-15 hover-up wow fadeInUp" href="#">
            <div className="inner-download">
              <div className="icon-download">
                <img
                  src="/assets/imgs/template/icons/apple-icon.svg"
                  alt="luxride"
                />
              </div>
              <div className="info-download">
                <span className="text-download-top">Download on the</span>
                <span className="text-14-medium">Apple Store</span>
              </div>
            </div>
          </a>
          <a className="btn btn-download hover-up wow fadeInUp" href="#">
            <div className="inner-download">
              <div className="icon-download">
                <img
                  src="/assets/imgs/template/icons/google-icon.svg"
                  alt="luxride"
                />
              </div>
              <div className="info-download">
                <span className="text-download-top">Download on the</span>
                <span className="text-14-medium">Apple Store</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
