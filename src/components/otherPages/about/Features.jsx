import { features7 } from "@/data/features";

export default function Features() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-60">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            We reimagine the way the world moves for the better
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              We offer luxury chauffeur driven airport transfers and pickups to
              London. Exceptional Safe, Meet and Greet. One hour of
              complimentary wait time and flight tracking. Professional Drivers
              & Vehicles. Fixed prices on airport transfers. VIP service, get
              your quote today!
            </p>
            <p>
              Et, morbi at sagittis vehicula rutrum. Lacus tortor, quam arcu mi
              et, at lectus leo nunc. Mattis cras auctor vel pharetra tempor.
              Rhoncus pellentesque habitant ac tempor. At aliquam euismod est in
              praesent ornare etiam id. Faucibus libero sit vehicula sed
              condimentum. Vitae in nam porttitor rutrum sed aliquam donec sed.
              Sapien facilisi lectus.
            </p>
            <ul className="list-ticks list-ticks-small">
              {features7.map((elm, i) => (
                <li key={i} className="text-16 mb-20">
                  {elm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
