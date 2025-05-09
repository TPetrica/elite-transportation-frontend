import React from 'react'
import BlogSingle from '@/components/blog/BlogSingle'
import RelatedBlogs from '@/components/blog/RelatedBlogs'
import Footer1 from '@/components/footers/Footer1'
import Header1 from '@/components/headers/Header1'
import MobailHeader1 from '@/components/headers/MobailHeader1'
import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BlogService from '@/services/blog.service'
import { Spin, Alert, Result, Button } from 'antd'
import MetaComponent from '@/components/common/MetaComponent'

export default function BlogsSinglePage() {
  const { slug } = useParams()

  // Fetch blog by slug
  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await BlogService.getBlogBySlug(slug)
      return response.data
    },
  })

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Header1 /> <MobailHeader1 />
        <main className="main">
          <div className="container-sub section pt-100 pb-100">
            <div className="text-center">
              <Spin size="large" />
              <p className="mt-3">Loading blog post...</p>
            </div>
          </div>
        </main>
        <Footer1 />
      </>
    )
  }

  // Show error state
  if (isError) {
    return (
      <>
        <Header1 /> <MobailHeader1 />
        <main className="main">
          <div className="container-sub section pt-100 pb-100">
            <Result
              status="error"
              title="Failed to load blog post"
              subTitle={error.response?.status === 404 ? "Blog post not found" : "An error occurred while loading this blog post"}
              extra={[
                <Button type="primary" key="home" href="/blog">
                  Return to Blog
                </Button>,
              ]}
            />
          </div>
        </main>
        <Footer1 />
      </>
    )
  }

  // If blog not found, redirect to blog page
  if (!blog) {
    return <Navigate to="/blog" replace />
  }

  // Create metadata for the blog post
  const blogMetadata = {
    title: blog.metaTitle || `${blog.title} | Elite Transportation`,
    description: blog.metaDescription || blog.excerpt,
  }

  return (
    <>
      <MetaComponent meta={blogMetadata} />
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <BlogSingle blog={blog} />
        <RelatedBlogs blogId={blog.id} category={blog.category} />
      </main>
      <Footer1 />
    </>
  )
}
