import AboutFamily from "@/components/otherPages/about/AboutFamily";
import AboutTravelOptions from "@/components/otherPages/about/AboutTravelOptions";
import AirportServices from "@/components/otherPages/about/AirportServices";
import Banner2 from "@/components/otherPages/about/Banner2";
import Faq from "@/components/otherPages/about/Faq";
import ParkCityTransportInfo from "@/components/otherPages/about/ParkCityTransportInfo";
import SLCAirportInfo from "@/components/otherPages/about/SLCAirportInfo";
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
        <AirportServices />
        <ParkCityTransportInfo />
        <SLCAirportInfo />
        <AboutTravelOptions />
        {/* <Testimonials /> */}
        <Faq />
      </main>
    </DefaultLayout>
  );
}