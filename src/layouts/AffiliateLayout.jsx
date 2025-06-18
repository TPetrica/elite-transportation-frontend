import MetaComponent from '@/components/common/MetaComponent'
import './layouts.css'

const AffiliateLayout = ({ children, metadata }) => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main className="main affiliate-main">
        {children}
      </main>
    </>
  )
}

export default AffiliateLayout