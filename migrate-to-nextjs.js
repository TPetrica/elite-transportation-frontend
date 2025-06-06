#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Configuration
const SOURCE_DIR = './src';
const DEST_DIR = './luxride-nextjs/src';

// Route mappings from React Router to Next.js App Router
const routeMappings = {
  '/': '/app/page.js',
  '/login': '/app/(auth)/login/page.js',
  '/forgot-password': '/app/(auth)/forgot-password/page.js',
  '/about-us': '/app/(marketing)/about/page.js',
  '/contact': '/app/(marketing)/contact/page.js',
  '/services': '/app/(marketing)/services/page.js',
  '/services/:slug': '/app/(marketing)/services/[slug]/page.js',
  '/blog': '/app/(marketing)/blog/page.js',
  '/blog/:slug': '/app/(marketing)/blog/[slug]/page.js',
  '/booking-time': '/app/booking/time/page.js',
  '/booking-extra': '/app/booking/extra/page.js',
  '/booking-passenger': '/app/booking/passenger/page.js',
  '/booking-payment': '/app/booking/payment/page.js',
  '/booking-received': '/app/booking/received/page.js',
  '/dashboard': '/app/dashboard/page.js',
  '/dashboard/services': '/app/dashboard/services/page.js',
  '/dashboard/bookings': '/app/dashboard/bookings/page.js',
  '/dashboard/vehicles': '/app/dashboard/vehicles/page.js',
  '/dashboard/blogs': '/app/dashboard/blogs/page.js',
  '/dashboard/affiliates': '/app/dashboard/affiliates/page.js',
  '/dashboard/settings': '/app/dashboard/settings/page.js',
};

// Bootstrap to Tailwind class mappings
const classMappings = {
  'container': 'container mx-auto px-4',
  'container-fluid': 'w-full px-4',
  'row': 'flex flex-wrap -mx-4',
  'col': 'flex-1 px-4',
  'col-12': 'w-full px-4',
  'col-md-6': 'w-full md:w-1/2 px-4',
  'col-lg-4': 'w-full lg:w-1/3 px-4',
  'col-lg-3': 'w-full lg:w-1/4 px-4',
  'col-lg-8': 'w-full lg:w-2/3 px-4',
  'd-none': 'hidden',
  'd-block': 'block',
  'd-flex': 'flex',
  'd-inline-block': 'inline-block',
  'd-none d-md-block': 'hidden md:block',
  'text-center': 'text-center',
  'text-left': 'text-left',
  'text-right': 'text-right',
  'text-uppercase': 'uppercase',
  'text-lowercase': 'lowercase',
  'font-weight-bold': 'font-bold',
  'btn btn-primary': 'btn-primary',
  'btn btn-secondary': 'btn-secondary',
  'btn btn-outline-primary': 'btn-outline',
  'form-control': 'form-input',
  'form-label': 'form-label',
  'card': 'card',
  'card-body': 'card-body',
  'mt-3': 'mt-4',
  'mb-4': 'mb-6',
  'p-3': 'p-4',
  'px-4': 'px-6',
  'py-5': 'py-8',
};

// Function to replace Bootstrap classes with Tailwind
function replaceBootstrapClasses(content) {
  let updatedContent = content;
  
  // Replace className patterns
  Object.entries(classMappings).forEach(([bootstrap, tailwind]) => {
    const regex = new RegExp(`className=["']([^"']*\\b${bootstrap}\\b[^"']*)["']`, 'g');
    updatedContent = updatedContent.replace(regex, (match, classes) => {
      const updatedClasses = classes.replace(new RegExp(`\\b${bootstrap}\\b`, 'g'), tailwind);
      return `className="${updatedClasses}"`;
    });
  });
  
  return updatedContent;
}

// Function to convert React Router imports to Next.js
function convertImports(content) {
  let updatedContent = content;
  
  // Replace React Router imports
  updatedContent = updatedContent.replace(
    /import\s+{\s*Link\s*}\s+from\s+['"]react-router-dom['"]/g,
    "import Link from 'next/link'"
  );
  
  updatedContent = updatedContent.replace(
    /import\s+{\s*useNavigate\s*}\s+from\s+['"]react-router-dom['"]/g,
    "import { useRouter } from 'next/navigation'"
  );
  
  updatedContent = updatedContent.replace(
    /const\s+navigate\s*=\s*useNavigate\(\)/g,
    "const router = useRouter()"
  );
  
  updatedContent = updatedContent.replace(
    /navigate\(/g,
    "router.push("
  );
  
  // Remove React Helmet imports
  updatedContent = updatedContent.replace(
    /import\s+.*\s+from\s+['"]react-helmet-async['"]\s*;?\s*\n/g,
    ""
  );
  
  return updatedContent;
}

// Function to convert page component to Next.js format
function convertToNextPage(content, pageName) {
  let updatedContent = content;
  
  // Add 'use client' if component uses hooks
  if (content.includes('useState') || content.includes('useEffect')) {
    updatedContent = `'use client'\n\n${updatedContent}`;
  }
  
  // Convert default export
  updatedContent = updatedContent.replace(
    /export\s+default\s+function\s+(\w+)/g,
    'export default function Page'
  );
  
  // Add metadata export if not a client component
  if (!updatedContent.includes("'use client'")) {
    const metadata = `
export const metadata = {
  title: '${pageName} | Elite Transportation Park City',
  description: 'Professional luxury transportation service in Park City, Utah.',
}

`;
    updatedContent = metadata + updatedContent;
  }
  
  return updatedContent;
}

// Function to process a single file
async function processFile(filePath, destPath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    let updatedContent = content;
    
    // Apply transformations
    updatedContent = replaceBootstrapClasses(updatedContent);
    updatedContent = convertImports(updatedContent);
    
    // If it's a page component, apply page-specific transformations
    if (destPath.includes('/app/') && destPath.endsWith('page.js')) {
      const pageName = path.basename(path.dirname(destPath));
      updatedContent = convertToNextPage(updatedContent, pageName);
    }
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    
    // Write the file
    await fs.writeFile(destPath, updatedContent);
    console.log(`✅ Migrated: ${filePath} → ${destPath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting migration to Next.js...\n');
  
  // Create directory structure
  const directories = [
    'app/(auth)/login',
    'app/(auth)/forgot-password',
    'app/(marketing)/about',
    'app/(marketing)/contact',
    'app/(marketing)/services',
    'app/(marketing)/blog',
    'app/booking/time',
    'app/booking/extra',
    'app/booking/passenger',
    'app/booking/payment',
    'app/booking/received',
    'app/dashboard',
    'app/dashboard/services',
    'app/dashboard/bookings',
    'app/dashboard/vehicles',
    'app/dashboard/blogs',
    'app/dashboard/affiliates',
    'app/dashboard/settings',
    'components/ui',
    'components/common',
    'components/booking',
    'components/blog',
    'components/dashboard',
    'contexts',
    'hooks',
    'services',
    'lib',
    'utils',
  ];
  
  for (const dir of directories) {
    await fs.mkdir(path.join(DEST_DIR, dir), { recursive: true });
  }
  
  console.log('✅ Created directory structure\n');
  
  // Copy and transform components
  console.log('📦 Migrating components...\n');
  
  // Example: Process specific files
  const filesToProcess = [
    { src: 'pages/index.jsx', dest: 'app/page.js' },
    { src: 'pages/auth/login.jsx', dest: 'app/(auth)/login/page.js' },
    { src: 'pages/pages/about-2/index.jsx', dest: 'app/(marketing)/about/page.js' },
    // Add more files as needed
  ];
  
  for (const file of filesToProcess) {
    const srcPath = path.join(SOURCE_DIR, file.src);
    const destPath = path.join(DEST_DIR, file.dest);
    
    // Check if source file exists
    try {
      await fs.access(srcPath);
      await processFile(srcPath, destPath);
    } catch {
      console.log(`⏭️  Skipping ${srcPath} (not found)`);
    }
  }
  
  console.log('\n✅ Migration complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Run: cd luxride-nextjs && bun install');
  console.log('2. Manually review and update migrated files');
  console.log('3. Update environment variables in .env.local');
  console.log('4. Run: bun dev to start the development server');
}

// Run the migration
migrate().catch(console.error);