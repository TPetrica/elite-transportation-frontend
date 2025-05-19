import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BlogService from '@/services/blog.service'
import DefaultLayout from "@/layouts/DefaultLayout"
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Spin, Empty, Input } from 'antd'
import { SearchOutlined, ClockCircleOutlined, TagOutlined } from '@ant-design/icons'

const metadata = {
	title: "Blog | Elite Transportation Park City",
	description: "Stay updated with Elite Transportation's latest news, travel tips, and insights about luxury transportation in Park City",
}

export default function BlogsGridPage() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
	const limit = 9

	// Fetch blogs
	const {
		data: blogsData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['publishedBlogs', page, selectedCategory, searchTerm],
		queryFn: async () => {
			const params = {
				page,
				limit,
				sortBy: 'publishedAt:desc',
			}
			
			if (searchTerm) {
				params.search = searchTerm
			}
			
			if (selectedCategory) {
				params.category = selectedCategory
			}
			
			const response = await BlogService.getPublishedBlogs(params)
			return response.data
		},
	})

	// Fetch recent blogs for sidebar
	const { data: recentBlogs } = useQuery({
		queryKey: ['recentBlogs'],
		queryFn: async () => {
			const response = await BlogService.getPublishedBlogs({
				page: 1,
				limit: 5,
				sortBy: 'publishedAt:desc',
			})
			return response.data.results
		},
	})

	// Get categories
	const { data: categoriesData } = useQuery({
		queryKey: ['blogCategories'],
		queryFn: async () => {
			const response = await BlogService.getPublishedBlogs({
				page: 1,
				limit: 100,
			})
			// Extract unique categories
			const categories = [...new Set(response.data.results.map(blog => blog.category).filter(Boolean))]
			return categories
		},
	})

	const blogs = blogsData?.results || []
	const totalPages = blogsData?.totalPages || 1
	const categories = categoriesData || []

	// Handle search
	const handleSearch = (value) => {
		setSearchTerm(value)
		setPage(1)
	}

	// Handle category selection
	const handleCategoryClick = (category) => {
		setSelectedCategory(category)
		setPage(1)
		navigate(`/blog${category ? `?category=${category}` : ''}`)
	}

	// Format date
	const formatDate = (dateString) => {
		if (!dateString) return ''
		const date = new Date(dateString)
		return format(date, 'MMM dd, yyyy')
	}

	// Extract excerpt from content
	const getExcerpt = (content, maxLength = 150) => {
		const plainText = content.replace(/<[^>]*>/g, '')
		if (plainText.length <= maxLength) return plainText
		return plainText.substring(0, maxLength).trim() + '...'
	}

	return (
		<DefaultLayout metadata={metadata}>
			{/* Hero Section */}
			<section className="tw-bg-gray-50 tw-py-16">
				<div className="container">
					<div className="tw-text-center">
						<h1 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-gray-900 tw-mb-4">
							Our Blog
						</h1>
						<p className="tw-text-xl tw-text-gray-600 tw-max-w-2xl tw-mx-auto">
							Discover travel tips, industry insights, and the latest news from Elite Transportation
						</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="tw-py-16 tw-bg-white">
				<div className="container">
					<div className="row">
						{/* Main Content Area */}
						<div className="col-lg-8">
							{/* Search Bar */}
							<div className="tw-mb-8">
								<Input
									size="large"
									placeholder="Search articles..."
									prefix={<SearchOutlined className="tw-text-gray-400" />}
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
									className="tw-w-full"
								/>
							</div>

							{isLoading ? (
								<div className="tw-text-center tw-py-12">
									<Spin size="large" />
									<p className="tw-mt-4 tw-text-gray-600">Loading articles...</p>
								</div>
							) : isError ? (
								<div className="tw-text-center tw-py-12">
									<p className="tw-text-red-600">Error loading articles. Please try again.</p>
								</div>
							) : blogs.length === 0 ? (
								<Empty description="No articles found" />
							) : (
								<div className="row">
									{blogs.map((blog) => (
										<div key={blog.id} className="col-md-6 tw-mb-8">
											<article className="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden tw-transition-transform tw-duration-300 hover:tw-transform hover:tw-translate-y-[-4px] tw-h-full tw-flex tw-flex-col">
												<Link to={`/blog/${blog.slug}`}>
													<div className="tw-relative tw-h-64 tw-overflow-hidden">
														<img
															src={blog.featuredImage || '/assets/imgs/page/blog/default.jpg'}
															alt={blog.title}
															className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 hover:tw-scale-110"
														/>
														{blog.category && (
															<span className="tw-absolute tw-top-4 tw-left-4 tw-bg-primary tw-text-white tw-px-3 tw-py-1 tw-rounded-full tw-text-sm">
																{blog.category}
															</span>
														)}
													</div>
												</Link>
												<div className="tw-p-6 tw-flex-1 tw-flex tw-flex-col">
													<div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500 tw-mb-3">
														<ClockCircleOutlined className="tw-mr-2" />
														<time dateTime={blog.publishedAt}>
															{formatDate(blog.publishedAt)}
														</time>
														{blog.author && (
															<>
																<span className="tw-mx-2">•</span>
																<span>{blog.author.name || 'Admin'}</span>
															</>
														)}
													</div>
													<Link to={`/blog/${blog.slug}`} className="tw-group">
														<h2 className="tw-text-xl tw-font-semibold tw-text-gray-900 tw-mb-3 group-hover:tw-text-primary tw-transition-colors">
															{blog.title}
														</h2>
													</Link>
													<p className="tw-text-gray-600 tw-mb-4 tw-flex-1">
														{getExcerpt(blog.content)}
													</p>
													<Link
														to={`/blog/${blog.slug}`}
														className="tw-inline-flex tw-items-center tw-text-primary hover:tw-text-primary-09 tw-transition-colors tw-mt-auto"
													>
														Read More
														<svg
															className="tw-ml-2 tw-w-4 tw-h-4"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M17 8l4 4m0 0l-4 4m4-4H3"
															/>
														</svg>
													</Link>
												</div>
											</article>
										</div>
									))}
								</div>
							)}

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="tw-flex tw-justify-center tw-mt-12">
									<nav className="tw-flex tw-items-center tw-space-x-2">
										<button
											onClick={() => setPage(page - 1)}
											disabled={page === 1}
											className={`tw-px-4 tw-py-2 tw-rounded-md tw-transition-colors ${
												page === 1
													? 'tw-bg-gray-100 tw-text-gray-400 tw-cursor-not-allowed'
													: 'tw-bg-white tw-text-gray-700 hover:tw-bg-gray-50 tw-border tw-border-gray-300'
											}`}
										>
											Previous
										</button>
										{[...Array(totalPages)].map((_, i) => {
											const pageNum = i + 1
											if (
												pageNum === 1 ||
												pageNum === totalPages ||
												(pageNum >= page - 1 && pageNum <= page + 1)
											) {
												return (
													<button
														key={pageNum}
														onClick={() => setPage(pageNum)}
														className={`tw-px-4 tw-py-2 tw-rounded-md tw-transition-colors ${
															pageNum === page
																? 'tw-bg-primary tw-text-white'
																: 'tw-bg-white tw-text-gray-700 hover:tw-bg-gray-50 tw-border tw-border-gray-300'
														}`}
													>
														{pageNum}
													</button>
												)
											} else if (pageNum === page - 2 || pageNum === page + 2) {
												return <span key={pageNum}>...</span>
											}
											return null
										})}
										<button
											onClick={() => setPage(page + 1)}
											disabled={page === totalPages}
											className={`tw-px-4 tw-py-2 tw-rounded-md tw-transition-colors ${
												page === totalPages
													? 'tw-bg-gray-100 tw-text-gray-400 tw-cursor-not-allowed'
													: 'tw-bg-white tw-text-gray-700 hover:tw-bg-gray-50 tw-border tw-border-gray-300'
											}`}
										>
											Next
										</button>
									</nav>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<div className="col-lg-4">
							<aside className="tw-sticky tw-top-8">
								{/* Categories */}
								<div className="tw-bg-gray-50 tw-rounded-lg tw-p-6 tw-mb-8">
									<h3 className="tw-text-xl tw-font-semibold tw-mb-4 tw-flex tw-items-center">
										<TagOutlined className="tw-mr-2" />
										Categories
									</h3>
									<ul className="tw-space-y-3">
										<li>
											<button
												onClick={() => handleCategoryClick('')}
												className={`tw-text-left tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-transition-colors ${
													!selectedCategory
														? 'tw-bg-primary tw-text-white'
														: 'hover:tw-bg-gray-200'
												}`}
											>
												All Categories
											</button>
										</li>
										{categories.map((category) => (
											<li key={category}>
												<button
													onClick={() => handleCategoryClick(category)}
													className={`tw-text-left tw-w-full tw-px-3 tw-py-2 tw-rounded-md tw-transition-colors ${
														selectedCategory === category
															? 'tw-bg-primary tw-text-white'
															: 'hover:tw-bg-gray-200'
													}`}
												>
													{category}
												</button>
											</li>
										))}
									</ul>
								</div>

								{/* Recent Articles */}
								<div className="tw-bg-gray-50 tw-rounded-lg tw-p-6">
									<h3 className="tw-text-xl tw-font-semibold tw-mb-4">Recent Articles</h3>
									<div className="tw-space-y-4">
										{recentBlogs?.map((blog) => (
											<article key={blog.id} className="tw-border-b tw-border-gray-200 tw-pb-4 last:tw-border-0">
												<Link
													to={`/blog/${blog.slug}`}
													className="tw-group tw-block"
												>
													<h4 className="tw-font-medium tw-text-gray-900 group-hover:tw-text-primary tw-transition-colors tw-mb-1">
														{blog.title}
													</h4>
													<time className="tw-text-sm tw-text-gray-500">
														{formatDate(blog.publishedAt)}
													</time>
												</Link>
											</article>
										))}
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</section>
		</DefaultLayout>
	)
}