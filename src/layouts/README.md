# Layout Components

This directory contains reusable layout components that provide consistent structure across the application. All pages should use one of these layouts instead of importing headers and footers directly.

## Available Layouts

### DefaultLayout
The standard layout for most pages. Includes Header1, MobailHeader1, and Footer.

Usage:
```jsx
import DefaultLayout from '@/layouts/DefaultLayout'

const metadata = {
  title: 'Page Title | Elite Transportation Park City',
  description: 'Page description',
}

export default function MyPage() {
  return (
    <DefaultLayout metadata={metadata}>
      {/* Your page content */}
    </DefaultLayout>
  )
}
```

### AuthLayout
Layout for authentication pages (login, forgot password). Centers content and removes headers/footers.

Usage:
```jsx
import AuthLayout from '@/layouts/AuthLayout'

export default function LoginPage() {
  return (
    <AuthLayout>
      {/* Your auth form */}
    </AuthLayout>
  )
}
```

### HeaderOnlyLayout
Layout that only includes headers (no footer). Useful for pages like coming-soon.

Usage:
```jsx
import HeaderOnlyLayout from '@/layouts/HeaderOnlyLayout'

const metadata = {
  title: 'Coming Soon | Elite Transportation Park City',
  description: 'Page coming soon',
}

export default function ComingSoonPage() {
  return (
    <HeaderOnlyLayout metadata={metadata}>
      {/* Your content */}
    </HeaderOnlyLayout>
  )
}
```

### MinimalLayout
Layout that only includes metadata (no headers or footers). Useful for special pages.

Usage:
```jsx
import MinimalLayout from '@/layouts/MinimalLayout'

const metadata = {
  title: 'Special Page | Elite Transportation Park City',
  description: 'Special page description',
}

export default function SpecialPage() {
  return (
    <MinimalLayout metadata={metadata}>
      {/* Your completely custom content */}
    </MinimalLayout>
  )
}
```

## Metadata Structure

All layouts accept a `metadata` prop with the following structure:

```js
const metadata = {
  title: 'Page Title | Elite Transportation Park City',
  description: 'Page description for SEO',
  keywords: 'relevant, keywords, for, seo',
  robots: 'index, follow', // Optional
  canonical: 'https://elitetransportationparkcity.com/page-url', // Optional
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    type: 'website',
    url: 'https://elitetransportationparkcity.com/page-url',
    images: [
      {
        url: '/assets/imgs/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OG Image Alt Text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['/assets/imgs/twitter-image.jpg'],
  },
}
```

## Benefits

1. **DRY Principle**: No need to import headers/footers in every page
2. **Consistency**: All pages use the same layout structure
3. **Maintainability**: Changes to headers/footers only need to be made in one place
4. **SEO Optimization**: Centralized metadata handling
5. **Flexibility**: Different layouts for different page types

## Migration

To migrate an existing page:

1. Remove imports for Header1, MobailHeader1, Footer, and MetaComponent
2. Import the appropriate layout
3. Wrap your content with the layout component
4. Pass metadata as a prop

Before:
```jsx
import MetaComponent from '@/components/common/MetaComponent'
import Footer from '@/components/footers/Footer'
import Header from '@/components/headers/Header'
import MobailHeader from '@/components/headers/MobailHeader'

const metadata = { title: 'Page Title', description: 'Description' }

export default function MyPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header />
      <MobailHeader />
      <main className="main">
        {/* Content */}
      </main>
      <Footer />
    </>
  )
}
```

After:
```jsx
import DefaultLayout from '@/layouts/DefaultLayout'

const metadata = { title: 'Page Title', description: 'Description' }

export default function MyPage() {
  return (
    <DefaultLayout metadata={metadata}>
      {/* Content */}
    </DefaultLayout>
  )
}
```