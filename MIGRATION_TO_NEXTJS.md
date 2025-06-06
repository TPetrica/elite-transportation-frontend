# Migration Guide: React (Vite) to Next.js 14

## Overview
This guide will help you migrate your React/Vite application to Next.js 14 with App Router for better SEO and performance.

## Step-by-Step Migration Process

### 1. Create New Next.js Project

```bash
npx create-next-app@latest luxride-nextjs --no-typescript --tailwind --eslint --app --src-dir --import-alias="@/*" --use-bun
```

### 2. Install Dependencies

After creating the project, install all necessary dependencies (excluding Bootstrap):

```bash
cd luxride-nextjs
bun add @tanstack/react-query@5.62.0 axios@1.7.8 \
  @stripe/react-stripe-js@3.0.0 @stripe/stripe-js@5.2.0 \
  @react-google-maps/api@2.20.3 draft-js@0.11.7 react-draft-wysiwyg@1.15.0 \
  draftjs-to-html html-to-draftjs react-markdown@10.1.0 \
  date-fns@4.1.0 lodash@4.17.21 jwt-decode@4.0.0 \
  swiper@11.1.1 react-intersection-observer framer-motion \
  @headlessui/react @heroicons/react react-hot-toast
```

Note: We're replacing Bootstrap with:
- Tailwind CSS (already included with Next.js)
- Headless UI for accessible components
- Heroicons for icons
- Framer Motion for animations (replacing wow.js)
- React Hot Toast for notifications

### 3. Project Structure Conversion

#### Current Vite Structure → Next.js App Router Structure

```
luxride/                    luxride-nextjs/
├── src/                    ├── src/
│   ├── pages/             │   ├── app/
│   │   ├── index.jsx      │   │   ├── page.js
│   │   └── auth/          │   │   ├── layout.js
│   │       └── login.jsx  │   │   └── (auth)/
│   ├── components/        │   │       └── login/
│   ├── layouts/           │   │           └── page.js
│   ├── routes/            │   ├── components/
│   └── services/          │   └── services/
├── public/                ├── public/
└── index.html             └── next.config.js
```

### 4. Route Mapping

| React Router Path | Next.js App Router Path |
|-------------------|------------------------|
| `/` | `/app/page.js` |
| `/login` | `/app/(auth)/login/page.js` |
| `/blog` | `/app/blog/page.js` |
| `/blog/:slug` | `/app/blog/[slug]/page.js` |
| `/services/:slug` | `/app/services/[slug]/page.js` |
| `/booking-time` | `/app/booking/time/page.js` |
| `/dashboard/*` | `/app/dashboard/*/page.js` |

### 5. Layout System Migration

#### Current Layout System
```jsx
// src/layouts/DefaultLayout.jsx
export default function DefaultLayout({ children, metadata }) {
  return (
    <>
      <MetaComponent metadata={metadata} />
      <Header1 />
      <MobailHeader1 />
      {children}
      <Footer1 />
    </>
  )
}
```

#### Next.js App Router Layout
```jsx
// src/app/layout.js
import Header1 from '@/components/headers/Header'
import MobailHeader1 from '@/components/headers/MobailHeader'
import Footer1 from '@/components/footers/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header1 />
        <MobailHeader1 />
        {children}
        <Footer1 />
      </body>
    </html>
  )
}
```

### 6. Context Provider Migration

#### Current Provider Setup
```jsx
// src/main.jsx
<AuthProvider>
  <BookingProvider>
    <App />
  </BookingProvider>
</AuthProvider>
```

#### Next.js Provider Setup
```jsx
// src/app/providers.js
'use client'

export function Providers({ children }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BookingProvider>
    </AuthProvider>
  )
}

// src/app/layout.js
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### 7. Data Fetching Migration

#### Current React Query Setup
```jsx
// Component using React Query
import { useServices } from '@/hooks/useQueryHooks'

export default function ServiceList() {
  const { data: services, isLoading } = useServices()
  // ...
}
```

#### Next.js Server Component
```jsx
// app/services/page.js
import { serviceService } from '@/services/service.service'

export default async function ServicesPage() {
  const services = await serviceService.getServices()
  
  return <ServiceList services={services} />
}
```

### 8. Client Components

Mark components that need client-side features:

```jsx
// src/components/booking/BookingTime.jsx
'use client'

import { useState } from 'react'
// ... rest of component
```

### 9. API Routes Migration

Create API routes for backend functionality:

```jsx
// app/api/auth/login/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  // Handle login
  return NextResponse.json({ token: '...' })
}
```

### 10. Environment Variables

Update environment variable names:

```bash
# .env.local (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-key
```

### 11. Metadata and SEO

#### Current React Helmet
```jsx
<MetaComponent metadata={{
  title: 'Page Title',
  description: 'Page description'
}} />
```

#### Next.js Metadata
```jsx
// app/page.js
export const metadata = {
  title: 'Page Title | Elite Transportation Park City',
  description: 'Page description',
}
```

### 12. Static Assets

Move assets from `public/` to Next.js `public/`:
- Images, fonts, and other static files remain in `public/`
- Update import paths if necessary

### 13. Configuration Files

#### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['antd', 'lodash'],
  },
}

module.exports = nextConfig
```

#### tailwind.config.js
Keep the same configuration but ensure it's compatible with Next.js:

```js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: 'tw-',
  important: true,
  // ... rest of your config
}
```

### 14. Build and Deployment

Update scripts in package.json:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 15. Testing the Migration

1. Start with core pages (Home, About, Contact)
2. Test routing and navigation
3. Verify data fetching works
4. Check authentication flow
5. Test the booking process
6. Validate SEO improvements

## Key Benefits After Migration

1. **Better SEO**: Server-side rendering for all pages
2. **Improved Performance**: Automatic code splitting and optimization
3. **Simplified Routing**: File-based routing system
4. **Built-in Optimization**: Image, font, and script optimization
5. **API Routes**: Backend functionality within the same project

## Common Gotchas

1. **Client Components**: Remember to add 'use client' directive
2. **Hydration Errors**: Ensure server and client render the same content
3. **Dynamic Imports**: Use Next.js dynamic imports for client-only libraries
4. **Environment Variables**: Use NEXT_PUBLIC_ prefix for client-side vars
5. **Image Optimization**: Use next/image for automatic optimization