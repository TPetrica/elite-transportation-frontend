import Breadcumb from "@/components/service/Breadcumb";
import Services1 from "@/components/service/Services1";
import SLCToParkcityInfo from "@/components/service/SLCToParkcityInfo";
import AirportGuide from "@/components/service/AirportGuide";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
  title: "Salt Lake City to Park City Transportation Services",
  description: "Book reliable shuttle services from SLC Airport to Park City. Professional car service with flight tracking, door-to-door transfers, and ski resort transportation.",
};

export default function ServiceGridPage1() {
  return (
    <DefaultLayout metadata={metadata}>
      <main className="main">
        <Breadcumb />
        <Services1 />
        <SLCToParkcityInfo />
        <AirportGuide />
      </main>
    </DefaultLayout>
  );
}