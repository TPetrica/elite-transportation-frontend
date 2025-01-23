export default function Features2() {
  const features = [
    {
      title: "Premium Service",
      description: "At Elite Transportation, we specialize in making your travel experience as comfortable and seamless as possible. Whether you're arriving at or departing from the airport, need a reliable ride for a group, or want on-demand transportation tailored to your schedule, we've got you covered. Our fleet of stylish black SUVs is designed to offer both luxury and comfort, ensuring you enjoy a smooth ride no matter the distance."
    },
    {
      title: "Our Journey",
      description: "Starting a business in a new country has been a dream come true for our family. We are deeply grateful for the opportunity to serve the wonderful community of Park City, and we are dedicated to providing transportation solutions that are reliable, punctual, and personalized. As a small, locally-owned business, we take pride in treating every customer like family."
    },
    {
      title: "Our Gratitude",
      description: "Thank you for choosing Elite Transportation—we look forward to driving you in comfort and style on your next journey."
    }
  ];

  return (
    <section className="section mt-120 bg-4 bg-your-trip">
      <div className="container-sub">
        <div className="box-the-trip">
          <h3 className="heading-44-medium mb-60 wow fadeInUp">
            Our Family Business
          </h3>
          <ul className="list-the-trip wow fadeInUp">
            {features.map((elm, i) => (
              <li key={i}>
                <div className="cardInfo">
                  <h6 className="text-20-medium color-text">{elm.title}</h6>
                  <p className="text-16 color-text">{elm.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="box-the-trip-right wow fadeInUp"></div>
    </section>
  );
}