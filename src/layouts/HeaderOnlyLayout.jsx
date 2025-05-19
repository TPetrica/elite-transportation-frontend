import MetaComponent from '@/components/common/MetaComponent'
import Header from '@/components/headers/Header'
import MobailHeader from '@/components/headers/MobailHeader'
import './layouts.css'
import '@/styles/header-override.css'

const HeaderOnlyLayout = ({ children, metadata }) => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header />
      <MobailHeader />
      <main className="main main-with-fixed-header">
        {children}
      </main>
    </>
  )
}

export default HeaderOnlyLayout