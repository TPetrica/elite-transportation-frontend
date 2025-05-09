import React, { useState } from 'react'
import Pagination from '../common/Pagination'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BlogService from '@/services/blog.service'
import { format } from 'date-fns'
import { Empty, Spin, Alert } from 'antd'

export default function Blogs1() {
  const [page, setPage] = useState(1)
  const limit = 9 // Number of blogs per page

  // Fetch blogs from API
  const {
    data: blogsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['publishedBlogs', page],
    queryFn: async () => {
      const response = await BlogService.getPublishedBlogs({
        page,
        limit,
        sortBy: 'publishedAt:desc',
      })
      return response.data
    },
  })

  // Extract blogs from response
  const blogs = blogsData?.results || []
  const totalPages = blogsData?.totalPages || 1

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return { day: '', monthYear: '' }
    
    const date = new Date(dateString)
    return {
      day: format(date, 'd'),
      monthYear: format(date, 'MMM, yyyy'),
    }
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // If loading, show spinner
  if (isLoading) {
    return (
      <section className="section pt-60 bg-white latest-new-white">
        <div className="container-sub">
          <div className="text-center py-32">
            <Spin size="large" />
            <p className="mt-3">Loading blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  // If error, show error message
  if (isError) {
    return (
      <section className="section pt-60 bg-white latest-new-white">
        <div className="container-sub">
          <Alert
            message="Error Loading Blog Posts"
            description={error.message || 'An error occurred while loading blog posts. Please try again.'}
            type="error"
            showIcon
            className="mx-auto max-w-2xl"
          />
        </div>
      </section>
    )
  }

  // If no blogs, show empty state
  if (blogs.length === 0) {
    return (
      <section className="section pt-60 bg-white latest-new-white">
        <div className="container-sub">
          <Empty description="No blog posts found" />
        </div>
      </section>
    )
  }

  return (
    <section className="section pt-60 bg-white latest-new-white">
      <div className="container-sub">
        <div className="row mt-50">
          {blogs.map((blog) => {
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
                      <img src={blog.featuredImage} alt={blog.title} />
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
        {totalPages > 1 && (
          <div className="text-center mt-40 mb-120 wow fadeInUp">
            <nav className="box-pagination">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </nav>
          </div>
        )}
      </div>
    </section>
  )
}
