import MetaComponent from '@/components/common/MetaComponent'

const AuthLayout = ({ children, metadata }) => {
  const defaultMetadata = {
    title: 'Login | Elite Transportation Park City',
    description: 'Sign in to Elite Transportation admin dashboard',
    robots: 'noindex, nofollow',
  }

  return (
    <>
      <MetaComponent meta={metadata || defaultMetadata} />
      <main className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-50 tw-px-4 tw-py-12">
        {children}
      </main>
    </>
  )
}

export default AuthLayout