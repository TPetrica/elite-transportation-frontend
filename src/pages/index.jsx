import DefaultLayout from '@/layouts/DefaultLayout'
import Process from '@/components/common/process/Process'
import Faq from '@/components/homes/home-1/Faq'
import Hero from '@/components/homes/home-1/Hero'
import Service from '@/components/homes/home-1/Service'

const metadata = {
  title: 'Elite Transportation Park City - Luxury Airport Transfers & Chauffeur Services',
  description: 'Premium luxury transportation services in Park City, Utah. Professional chauffeurs, elite vehicles, and reliable airport transfers. Book your executive car service today.',
  keywords: 'Park City transportation, luxury airport transfers, chauffeur service, executive car service, limousine Park City, private driver Utah',
  openGraph: {
    title: 'Elite Transportation Park City - Premier Luxury Car Service',
    description: 'Experience the finest luxury transportation in Park City. Professional chauffeurs, premium vehicles, and exceptional service for all your travel needs.',
    type: 'website',
    url: 'https://elitetransportationparkcity.com',
    images: [
      {
        url: '/assets/imgs/template/logo-optimized.webp',
        width: 1200,
        height: 630,
        alt: 'Elite Transportation Park City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Transportation Park City - Luxury Car Service',
    description: 'Book premium transportation services in Park City, Utah. Professional chauffeurs and luxury vehicles for airport transfers and special events.',
    images: ['/assets/imgs/template/logo-optimized.webp'],
  },
  canonical: 'https://elitetransportationparkcity.com',
}

export default function Home() {
  return (
    <DefaultLayout metadata={metadata}>
      <Hero />
      {/* <Partners /> */}
      <Service />
      {/* <Feet /> */}
      {/* <Process /> */}
      {/* <Features /> */}
      {/* <Facts /> */}
      {/* <Testimonials /> */}
      {/* <Cta /> */}
      {/* <Blogs /> */}
      <Faq />
      {/* <DownloadApp /> */}
    </DefaultLayout>
  )
}
