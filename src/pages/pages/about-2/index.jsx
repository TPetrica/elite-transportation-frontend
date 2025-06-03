import AboutFamily from "@/components/otherPages/about/AboutFamily";
import Banner2 from "@/components/otherPages/about/Banner2";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
  title: "About Our SLC to Park City Transportation Service",
  description: "Professional car service from Salt Lake City Airport to Park City. Premium transportation with expert local drivers, flight tracking, and 24/7 availability.",
};

export default function AboutPage2() {
  return (
    <DefaultLayout metadata={metadata}>
      <main className="main">
        <Banner2 />
        <AboutFamily />
        {/* <AirportServices />
        <ParkCityTransportInfo />
        <SLCAirportInfo />
        <AboutTravelOptions /> */}
        {/* <Testimonials /> */}
        {/* <Faq /> */}
      </main>
    </DefaultLayout>
  );
}