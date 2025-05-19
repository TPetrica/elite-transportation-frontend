import MetaComponent from '@/components/common/MetaComponent'

const MinimalLayout = ({ children, metadata }) => {
  const defaultMetadata = {
    title: 'Elite Transportation Park City',
    description: 'Premium luxury transportation services in Park City, Utah',
  }

  return (
    <>
      <MetaComponent meta={metadata || defaultMetadata} />
      {children}
    </>
  )
}

export default MinimalLayout