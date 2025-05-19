import DefaultLayout from '@/layouts/DefaultLayout'
import Breadcumb from '@/components/service/serviceSingle/Breadcumb'
import Features1 from '@/components/service/serviceSingle/Features1'
import Features2 from '@/components/service/serviceSingle/Features2'
import { services } from '@/data/services'
import { Navigate, useParams } from 'react-router-dom'

export default function ServiceSinglePage() {
  const { slug } = useParams()
  const service = services.find(s => s.slug === slug)

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/service-grid" replace />
  }

  const metadata = {
    title: `${service.title} | Elite Transportation Park City`,
    description: service.longDescription || service.description,
  }

  return (
    <DefaultLayout metadata={metadata}>
      <Breadcumb service={service} />
      {/* <SearchBox service={service} /> */}
      <Features1 />
      <Features2 service={service} />
    </DefaultLayout>
  )
}
