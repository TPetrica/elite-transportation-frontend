import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ClockCircleOutlined } from '@ant-design/icons'

export default function RelatedBlogs({ blogs }) {
	const formatDate = (dateString) => {
		if (!dateString) return ''
		const date = new Date(dateString)
		return format(date, 'MMM dd, yyyy')
	}
	
	const getExcerpt = (content, maxLength = 120) => {
		const plainText = content.replace(/<[^>]*>/g, '')
		if (plainText.length <= maxLength) return plainText
		return plainText.substring(0, maxLength).trim() + '...'
	}
	
	return (
		<div className="row">
			{blogs.map((blog) => (
				<div key={blog.id} className="col-md-4 tw-mb-8">
					<article className="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden tw-transition-transform tw-duration-300 hover:tw-transform hover:tw-translate-y-[-4px] tw-h-full tw-flex tw-flex-col">
						<Link to={`/blog/${blog.slug}`}>
							<div className="tw-relative tw-h-48 tw-overflow-hidden">
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
							</div>
							
							<Link to={`/blog/${blog.slug}`} className="tw-group">
								<h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3 group-hover:tw-text-primary tw-transition-colors">
									{blog.title}
								</h3>
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
	)
}