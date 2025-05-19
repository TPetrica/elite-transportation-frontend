import { ClockCircleOutlined, ShareAltOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'

export default function BlogSingle({ blog }) {
	const [tableOfContents, setTableOfContents] = useState([])
	const [activeSection, setActiveSection] = useState('')
	
	// Extract headings from content for table of contents
	useEffect(() => {
		if (blog?.content) {
			// Check if content is already HTML
			const isHTML = /<[^>]+>/.test(blog.content)

			if (isHTML) {
				// Extract headings from HTML content
				const tempDiv = document.createElement('div')
				tempDiv.innerHTML = blog.content

				// Only get h2 elements for table of contents
				const headingElements = tempDiv.querySelectorAll('h2')
				const headings = []

				headingElements.forEach((heading) => {
					const text = heading.textContent || heading.innerText || ''
					const id = heading.id || text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')

					if (text.trim()) {
						headings.push({ text: text.trim(), id })
					}
				})

				setTableOfContents(headings)
			} else {
				// Extract only h2 headings from markdown content
				const headingRegex = /^#{2}\s+(.+)$/gm
				const headings = []
				let match

				while ((match = headingRegex.exec(blog.content)) !== null) {
					const text = match[1].trim()
					const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
					headings.push({ text, id })
				}

				setTableOfContents(headings)
			}
		}
	}, [blog])

	// Update URL with hash when section changes (SEO-friendly deep links)
	useEffect(() => {
		if (activeSection && window.location.hash !== `#${activeSection}`) {
			window.history.replaceState(null, '', `#${activeSection}`)
		}
	}, [activeSection])
	
	// Handle active section on scroll
	useEffect(() => {
		const handleScroll = () => {
			const headerOffset = 120 // Accounting for fixed header
			const tocItems = tableOfContents.map(item => ({
				...item,
				element: document.getElementById(item.id)
			}))

			const currentSection = tocItems.find(item => {
				if (item.element) {
					const rect = item.element.getBoundingClientRect()
					return rect.top <= headerOffset && rect.bottom > headerOffset
				}
				return false
			})

			if (currentSection) {
				setActiveSection(currentSection.id)
			}
		}

		// Initial check for hash in URL
		if (window.location.hash) {
			const id = window.location.hash.substring(1)
			setActiveSection(id)
			setTimeout(() => {
				const element = document.getElementById(id)
				if (element) {
					const headerOffset = 120
					const elementPosition = element.getBoundingClientRect().top
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset
					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					})
				}
			}, 100)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [tableOfContents])

	
	const formatDate = (dateString) => {
		if (!dateString) return ''
		const date = new Date(dateString)
		return format(date, 'MMMM dd, yyyy')
	}
	
	const handleShare = (platform) => {
		const url = window.location.href
		const title = blog.title
		
		let shareUrl = ''
		switch (platform) {
			case 'facebook':
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
				break
			case 'twitter':
				shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
				break
			case 'linkedin':
				shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
				break
			case 'copy':
				navigator.clipboard.writeText(url)
				message.success('Link copied to clipboard!')
				return
		}
		
		if (shareUrl) {
			window.open(shareUrl, '_blank', 'width=600,height=400')
		}
	}
	
	if (!blog) {
		return <div>Loading...</div>
	}
	
	return (
		<section className="tw-bg-white tw-py-16">
			<div className="container">
				<div className="row">
					{/* Main Content */}
					<div className="col-lg-8">
						{/* Hero Image */}
						<div className="tw-mb-8 tw-rounded-lg tw-overflow-hidden">
							<img
								src={blog.featuredImage || '/assets/imgs/page/blog/default.jpg'}
								alt={blog.title}
								className="tw-w-full tw-h-auto"
							/>
						</div>
						
						{/* Article Header */}
						<header className="tw-mb-8">
							<h1 className="tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-4">
								{blog.title}
							</h1>
							
							{/* Meta Information */}
							<div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-gray-600 tw-mb-4">
								<div className="tw-flex tw-items-center">
									<ClockCircleOutlined className="tw-mr-2" />
									<time dateTime={blog.publishedAt}>
										{formatDate(blog.publishedAt)}
									</time>
								</div>
								{blog.author && (
									<div className="tw-flex tw-items-center">
										<UserOutlined className="tw-mr-2" />
										<span>{blog.author.name || 'Admin'}</span>
									</div>
								)}
								{blog.category && (
									<div className="tw-flex tw-items-center">
										<TagOutlined className="tw-mr-2" />
										<Link to={`/blog?category=${blog.category}`} className="hover:tw-text-primary">
											{blog.category}
										</Link>
									</div>
								)}
							</div>
						</header>
						
						{/* Article Content */}
						<article className="prose tw-max-w-none tw-mb-12">
							<ReactMarkdown
								rehypePlugins={[rehypeRaw, rehypeSlug]}
								components={{
									h1: ({ children, ...props }) => (
										<h1 className="tw-text-3xl tw-font-bold tw-mt-8 tw-mb-4" {...props}>
											{children}
										</h1>
									),
									h2: ({ children, ...props }) => (
										<h2 
											className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4" 
											id={children.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}
											{...props}
										>
											{children}
										</h2>
									),
									h3: ({ children, ...props }) => (
										<h3 
											className="tw-text-xl tw-font-semibold tw-mt-6 tw-mb-3"
											id={children.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}
											{...props}
										>
											{children}
										</h3>
									),
									p: ({ children }) => (
										<p className="tw-mb-4 tw-text-gray-700 tw-leading-relaxed">
											{children}
										</p>
									),
									ul: ({ children }) => (
										<ul className="tw-list-disc tw-pl-6 tw-mb-4 tw-space-y-2">
											{children}
										</ul>
									),
									ol: ({ children }) => (
										<ol className="tw-list-decimal tw-pl-6 tw-mb-4 tw-space-y-2">
											{children}
										</ol>
									),
									li: ({ children }) => (
										<li className="tw-text-gray-700">
											{children}
										</li>
									),
									blockquote: ({ children }) => (
										<blockquote className="tw-border-l-4 tw-border-primary tw-pl-4 tw-italic tw-my-6 tw-text-gray-600">
											{children}
										</blockquote>
									),
									code: ({ inline, children }) => (
										inline ? 
											<code className="tw-bg-gray-100 tw-px-1 tw-rounded tw-text-sm">
												{children}
											</code> :
											<pre className="tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-overflow-x-auto tw-mb-4">
												<code>{children}</code>
											</pre>
									),
									img: ({ src, alt }) => (
										<img
											src={src}
											alt={alt}
											className="tw-max-w-full tw-h-auto tw-rounded-lg tw-my-6"
										/>
									),
									a: ({ href, children }) => (
										<a
											href={href}
											className="tw-text-primary hover:tw-text-primary-09 tw-underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{children}
										</a>
									),
								}}
							>
								{blog.content}
							</ReactMarkdown>
						</article>
						
						{/* Tags and Share */}
						<div className="tw-border-t tw-border-b tw-py-6 tw-mb-8">
							<div className="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-gap-4">
								{/* Tags */}
								{blog.tags && blog.tags.length > 0 && (
									<div className="tw-flex tw-flex-wrap tw-gap-2">
										<span className="tw-text-gray-600 tw-mr-2">Tags:</span>
										{blog.tags.map((tag, index) => (
											<Link
												key={index}
												to={`/blog?tag=${tag}`}
												className="tw-px-3 tw-py-1 tw-bg-gray-100 tw-text-gray-700 tw-rounded-full tw-text-sm hover:tw-bg-gray-200 tw-transition-colors"
											>
												{tag}
											</Link>
										))}
									</div>
								)}
								
								{/* Share Buttons */}
								<div className="tw-flex tw-items-center tw-gap-3">
									<span className="tw-text-gray-600">Share:</span>
									<button
										onClick={() => handleShare('facebook')}
										className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white tw-rounded-full hover:tw-bg-blue-700 tw-transition-colors"
										aria-label="Share on Facebook"
									>
										<i className="icon-facebook"></i>
									</button>
									<button
										onClick={() => handleShare('twitter')}
										className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-sky-500 tw-text-white tw-rounded-full hover:tw-bg-sky-600 tw-transition-colors"
										aria-label="Share on Twitter"
									>
										<i className="icon-twitter"></i>
									</button>
									<button
										onClick={() => handleShare('linkedin')}
										className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-blue-700 tw-text-white tw-rounded-full hover:tw-bg-blue-800 tw-transition-colors"
										aria-label="Share on LinkedIn"
									>
										<i className="icon-linkedin"></i>
									</button>
									<button
										onClick={() => handleShare('copy')}
										className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-gray-600 tw-text-white tw-rounded-full hover:tw-bg-gray-700 tw-transition-colors"
										aria-label="Copy link"
									>
										<ShareAltOutlined />
									</button>
								</div>
							</div>
						</div>
						
						{/* Author Box */}
						{blog.author && (
							<div className="tw-bg-gray-50 tw-rounded-lg tw-p-6 tw-mb-8">
								<div className="tw-flex tw-items-start tw-gap-4">
									<div className="tw-w-16 tw-h-16 tw-bg-primary tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-2xl tw-font-bold tw-flex-shrink-0">
										{blog.author.name ? blog.author.name.charAt(0).toUpperCase() : 'A'}
									</div>
									<div>
										<h3 className="tw-text-lg tw-font-semibold tw-mb-1">
											{blog.author.name || 'Admin'}
										</h3>
										<p className="tw-text-gray-600 tw-mb-2">Author</p>
										{blog.author.bio && (
											<p className="tw-text-gray-700">{blog.author.bio}</p>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
					
					{/* Sidebar */}
					<div className="col-lg-4">
						<aside className="tw-sticky tw-top-8">
							{/* Table of Contents */}
							{tableOfContents.length > 0 && (
								<div className="tw-bg-gray-50 tw-rounded-lg tw-p-6 tw-mb-8">
									<h3 className="tw-text-xl tw-font-semibold tw-mb-4">Table of Contents</h3>
									<nav>
										{tableOfContents.map((heading) => (
											<a
												key={heading.id}
												href={`#${heading.id}`}
												className={`tw-block tw-py-3 tw-pl-4 tw-transition-all tw-duration-200 ${
													activeSection === heading.id
														? 'tw-text-gray-900 tw-font-medium'
														: 'tw-text-gray-500 hover:tw-text-gray-700'
												}`}
												style={{
													borderLeft: activeSection === heading.id
														? '4px solid #374151'
														: '4px solid rgba(156, 163, 175, 0.5)'
												}}
												onClick={(e) => {
													e.preventDefault()
													const element = document.getElementById(heading.id)
													if (element) {
														const headerOffset = 120
														const elementPosition = element.getBoundingClientRect().top
														const offsetPosition = elementPosition + window.pageYOffset - headerOffset
														window.scrollTo({
															top: offsetPosition,
															behavior: 'smooth'
														})
													}
												}}
											>
												{heading.text}
											</a>
										))}
									</nav>
								</div>
							)}
							
						</aside>
					</div>
				</div>
			</div>
		</section>
	)
}