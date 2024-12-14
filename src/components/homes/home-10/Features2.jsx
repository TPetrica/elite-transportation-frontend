import { features3 } from "@/data/features";

export default function Features2() {
  return (
    <section className="section box-reliability-home10">
      <div className="container-sub">
        <div className="box-info-reliability">
          <h2 className="heading-44-medium color-text mb-30 wow fadeInUp">
            Reliability, worldwide
          </h2>
          <ul className="list-ticks wow fadeInUp">
            {features3.map((elm, i) => (
              <li key={i}>{elm}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
