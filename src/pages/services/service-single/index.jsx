import MetaComponent from '@/components/common/MetaComponent'
import Footer1 from '@/components/footers/Footer1'
import Header1 from '@/components/headers/Header1'
import MobailHeader1 from '@/components/headers/MobailHeader1'
import Breadcumb from '@/components/service/serviceSingle/Breadcumb'
import Features1 from '@/components/service/serviceSingle/Features1'
import Features2 from '@/components/service/serviceSingle/Features2'
import { services } from '@/data/services'
import { Navigate, useParams } from 'react-router-dom'

export default function ServiceSinglePage() {
  const { id } = useParams()
  const service = services.find(s => s.id.toString() === id)

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/service-grid" replace />
  }

  const metadata = {
    title: `${service.title} | Elite Transportation Park City`,
    description: service.longDescription || service.description,
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <MobailHeader1 />
      <main className="main">
        <Breadcumb service={service} />
        {/* <SearchBox service={service} /> */}
        <Features1 />
        <Features2 service={service} />
      </main>
      <Footer1 />
    </>
  )
}
