import Hero from '@/components/homes/home-1/Hero'
import Service from '@/components/homes/home-1/Service'
import SLCTransportOptions from '@/components/homes/home-1/SLCTransportOptions'
import TravelTips from '@/components/homes/home-1/TravelTips'
import DefaultLayout from '@/layouts/DefaultLayout'

const metadata = {
  title: 'SLC to Park City Transportation | Salt Lake City Airport Shuttle Service',
  description: 'Premium transportation from Salt Lake City to Park City. Professional door-to-door shuttle service from SLC airport with flight tracking. Book your Park City car service today!',
  keywords: 'SLC to Park City, Salt Lake City airport shuttle, transportation from SLC to Park City, airport transportation Salt Lake City, car service Salt Lake City airport, how to get from SLC to Park City',
  openGraph: {
    title: 'Salt Lake City to Park City Transportation | Elite SLC Airport Shuttle',
    description: 'Book reliable shuttle service from Salt Lake City International Airport to Park City. Door-to-door transportation with flight tracking and professional drivers.',
    type: 'website',
    url: 'https://elitetransportationparkcity.com',
    images: [
      {
        url: '/assets/imgs/template/logo-optimized.webp',
        width: 1200,
        height: 630,
        alt: 'Elite Transportation Salt Lake City to Park City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLC to Park City Transportation | Salt Lake City Airport Shuttle',
    description: 'Book your transportation from Salt Lake City to Park City. Professional chauffeurs and luxury vehicles for comfortable, reliable airport transfers.',
    images: ['/assets/imgs/template/logo-optimized.webp'],
  },
  canonical: 'https://elitetransportationparkcity.com',
}

export default function Home() {
  return (
    <DefaultLayout metadata={metadata}>
      <Hero />
      {/* <Partners /> */}
      <SLCTransportOptions />
      <Service />
      {/* Removed HowToGetFromSLCToPC section per SEO requirements */}
      {/* <Facts /> */}
      {/* Removed AirportInfo section per SEO requirements */}
      {/* <BookingBar /> */}
      {/* Removed Cta (Get Instant Quote) section per SEO requirements */}
      <TravelTips />
      {/* <Blogs /> */}
      {/* Removed Faq section - already exists as separate page */}
    </DefaultLayout>
  )
}
