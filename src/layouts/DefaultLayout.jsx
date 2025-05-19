import MetaComponent from '@/components/common/MetaComponent'
import Footer from '@/components/footers/Footer'
import Header from '@/components/headers/Header'
import MobailHeader from '@/components/headers/MobailHeader'
import './layouts.css'
import '@/styles/header-override.css'

const DefaultLayout = ({ children, metadata }) => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header />
      <MobailHeader />
      <main className="main main-with-fixed-header">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default DefaultLayout