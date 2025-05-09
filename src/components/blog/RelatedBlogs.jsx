import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BlogService from '@/services/blog.service'
import { Spin, Empty } from 'antd'
import { format } from 'date-fns'

export default function RelatedBlogs({ blogId, category }) {
  // Fetch related blogs
  const {
    data: relatedBlogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['relatedBlogs', blogId, category],
    queryFn: async () => {
      const response = await BlogService.getRelatedBlogs(blogId, 3)
      return response.data
    },
    // Don't refetch on window focus for related blogs
    refetchOnWindowFocus: false,
    // Don't show loading state if we already have data
    enabled: !!blogId && !!category,
  })

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return { day: '', monthYear: '' }
    
    const date = new Date(dateString)
    return {
      day: format(date, 'd'),
      monthYear: format(date, 'MMM, yyyy'),
    }
  }

  // If loading, show spinner
  if (isLoading) {
    return (
      <section className="section pt-120 bg-white latest-new-white mb-90">
        <div className="container-sub">
          <h2 className="heading-44-medium color-text mb-60 wow fadeInUp">Related Posts</h2>
          <div className="text-center py-16">
            <Spin />
            <p className="mt-3">Loading related posts...</p>
          </div>
        </div>
      </section>
    )
  }

  // If error or no related blogs, show empty state
  if (isError || !relatedBlogs || relatedBlogs.length === 0) {
    return (
      <section className="section pt-120 bg-white latest-new-white mb-90">
        <div className="container-sub">
          <h2 className="heading-44-medium color-text mb-60 wow fadeInUp">Related Posts</h2>
          <Empty description="No related posts found" />
        </div>
      </section>
    )
  }

  return (
    <section className="section pt-120 bg-white latest-new-white mb-90">
      <div className="container-sub">
        <h2 className="heading-44-medium color-text mb-60 wow fadeInUp">Related Posts</h2>
        <div className="row">
          {relatedBlogs.map((blog) => {
            const { day, monthYear } = formatDate(blog.publishedAt)
            
            return (
              <div key={blog.id} className="col-lg-4">
                <div className="cardNews wow fadeInUp">
                  <Link to={`/blog/${blog.slug}`}>
                    <div className="cardImage">
                      <div className="datePost">
                        <div className="heading-52-medium color-white">{day}</div>
                        <p className="text-14 color-white">{monthYear}</p>
                      </div>
                      <img 
                        src={blog.featuredImage || '/assets/imgs/page/blog/default.jpg'} 
                        alt={blog.title} 
                      />
                    </div>
                  </Link>
                  <div className="cardInfo">
                    <div className="tags mb-10">
                      <a href={`/blog?category=${blog.category}`}>{blog.category}</a>
                    </div>
                    <Link className="color-white" to={`/blog/${blog.slug}`}>
                      <h3 className="text-20-medium color-white mb-20">{blog.title}</h3>
                    </Link>
                    <Link className="cardLink btn btn-arrow-up" to={`/blog/${blog.slug}`}>
                      <svg
                        className="icon-16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
