import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import AboutSLCTransportation from "@/components/otherPages/about/AboutSLCTransportation";
import Facts from "@/components/common/facts/Facts";
import Testimonials from "@/components/common/testimonials/Testimonials";

const metadata = {
  title: "SLC to Park City Transportation | Salt Lake City Airport Shuttle",
  description: "Professional car service from Salt Lake City Airport to Park City Utah. Door-to-door shuttle service with flight tracking and 24/7 availability from SLC.",
};

export default function AboutPage1() {
  return (
    <DefaultLayout metadata={metadata}>
      <Breadcumb />
      <AboutSLCTransportation />
      <Facts />
      <Testimonials />
    </DefaultLayout>
  );
}