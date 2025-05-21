import { features7 } from "@/data/features";

export default function Features() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-60">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            Premier Salt Lake City to Park City Transportation Service
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              We offer luxury chauffeur-driven transportation from Salt Lake City to Park City, providing the most reliable shuttle service in Utah. Our service includes SLC airport to Park City transfers with exceptional safety measures, professional meet and greet, complimentary wait time, and flight tracking for Salt Lake City International Airport arrivals. Experience our premium shuttle from Salt Lake City airport to Park City with professional drivers and well-maintained vehicles at competitive fixed prices.
            </p>
            <p>
              Whether you're looking for the cheapest shuttle from SLC to Park City or premium door-to-door service to Park City Mountain Resort or Deer Valley, we have transportation options to suit your needs. Our Park City shuttle service from airport locations operates year-round, specializing in winter travel when many visitors wonder how to get from SLC to Park City safely. Our experienced mountain drivers ensure your journey between Salt Lake City and Park City Utah is comfortable and stress-free.
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
