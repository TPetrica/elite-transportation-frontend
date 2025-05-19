import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BlogService from '@/services/blog.service'
import BlogSingle from "@/components/blog/BlogSingle"
import RelatedBlogs from "@/components/blog/RelatedBlogs"
import DefaultLayout from "@/layouts/DefaultLayout"
import { Spin, Alert } from 'antd'

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
		enabled: !!slug,
	})
	
	// Fetch related blogs
	const { data: relatedBlogs } = useQuery({
		queryKey: ['relatedBlogs', blog?.id],
		queryFn: async () => {
			const response = await BlogService.getRelatedBlogs(blog.id, 3)
			return response.data
		},
		enabled: !!blog?.id,
	})
	
	// Dynamic metadata
	const metadata = {
		title: blog?.title || "Blog | Elite Transportation Park City",
		description: blog?.excerpt || "Elite Transportation Park City blog article",
		keywords: blog?.keywords || "Park City luxury transportation, chauffeur services, blog",
		canonical: `https://elitetransportationparkcity.com/blog/${slug}`,
		openGraph: {
			title: blog?.title || "Elite Transportation Park City Blog",
			description: blog?.excerpt || "Luxury transportation insights and news",
			type: "article",
			url: `https://elitetransportationparkcity.com/blog/${slug}`,
			images: blog?.featuredImage ? [
				{
					url: blog.featuredImage,
					width: 1200,
					height: 630,
					alt: blog.title,
				},
			] : [],
			article: {
				publishedTime: blog?.createdAt,
				modifiedTime: blog?.updatedAt,
				author: blog?.author?.name,
			},
		},
		twitter: {
			card: "summary_large_image",
			title: blog?.title || "Elite Transportation Park City Blog",
			description: blog?.excerpt || "Luxury transportation insights and news",
			images: blog?.featuredImage ? [blog.featuredImage] : [],
		},
	}
	
	if (isLoading) {
		return (
			<DefaultLayout metadata={metadata}>
				<div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
					<Spin size="large" />
				</div>
			</DefaultLayout>
		)
	}
	
	if (isError || !blog) {
		return (
			<DefaultLayout metadata={metadata}>
				<div className="container tw-py-16">
					<Alert
						message="Article Not Found"
						description="The article you're looking for doesn't exist or has been removed."
						type="error"
						showIcon
					/>
				</div>
			</DefaultLayout>
		)
	}
	
	return (
		<DefaultLayout metadata={metadata}>
			{/* Breadcrumb */}
			<section className="tw-bg-gray-50 tw-py-8">
				<div className="container">
					<nav className="tw-text-sm">
						<a href="/" className="tw-text-gray-600 hover:tw-text-primary">
							Home
						</a>
						<span className="tw-mx-2 tw-text-gray-400">/</span>
						<a href="/blog" className="tw-text-gray-600 hover:tw-text-primary">
							Blog
						</a>
						<span className="tw-mx-2 tw-text-gray-400">/</span>
						<span className="tw-text-gray-900">{blog.title}</span>
					</nav>
				</div>
			</section>
			
			<BlogSingle blog={blog} />
			
			{/* Related Articles */}
			{relatedBlogs && relatedBlogs.length > 0 && (
				<section className="tw-bg-gray-50 tw-py-16">
					<div className="container">
						<h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-12">
							Related Articles
						</h2>
						<RelatedBlogs blogs={relatedBlogs} />
					</div>
				</section>
			)}
		</DefaultLayout>
	)
}