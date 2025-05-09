import React from 'react'
import { useState } from 'react'
import { socials, tags } from '@/data/blogs'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

export default function BlogSingle({ blog }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return { day: '', monthYear: '' }
    
    const date = new Date(dateString)
    return {
      day: format(date, 'd'),
      monthYear: format(date, 'MMM, yyyy'),
    }
  }

  const { day, monthYear } = formatDate(blog.publishedAt)

  return (
    <section className="section pt-60 bg-white latest-new-white">
      <div className="container-sub">
        <div className="box-frature-image mb-60 wow fadeInUp">
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
        </div>
        <h2 className="heading-44-medium mb-30 wow fadeInUp">{blog.title}</h2>
        
        <div className="content-single wow fadeInUp blog-content">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        
        <div className="box-share-tags mt-50 wow fadeInUp">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30 text-lg-start text-center">
              <span className="text-16-medium color-text mr-15">Share</span>
              <div className="d-inline-block social-single">
                {socials.map((elm, i) => (
                  <a
                    key={i}
                    className={`icon-socials icon-${elm.name}`}
                    href={elm.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
                ))}
              </div>
            </div>
            <div className="col-lg-6 text-lg-end mb-30 text-center">
              {blog.tags && blog.tags.map((tag, i) => (
                <a key={i} className="btn btn-tag mr-10 mb-10" href={`/blog?tag=${tag}`}>
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {blog.author && (
          <>
            <div className="border-bottom mb-30 mt-60"></div>
            <div className="author-box wow fadeInUp">
              <div className="item-author">
                <div className="item-author-image">
                  <div className="item-avatar">{blog.author.name ? blog.author.name.charAt(0) : 'A'}</div>
                </div>
                <div className="item-author-info">
                  <h6 className="text-18-medium">{blog.author.name || 'Admin'}</h6>
                  <p className="text-14 color-grey">Author</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="border-bottom mb-50 mt-60"></div>
        
        <div className="box-form-comment wow fadeInUp">
          <h5 className="text-20-medium mb-30">Leave a Comment</h5>
          <p className="text-14 color-text mb-30">
            Your email address will not be published.
          </p>
          <div className="form-comment">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className={`form-group ${fullName ? 'focused' : ''}`}>
                    <label className="form-label" htmlFor="fullname">
                      Your Name
                    </label>
                    <input
                      className={`form-control ${fullName ? 'filled' : ''}`}
                      id="fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={`form-group ${email ? 'focused' : ''}`}>
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className={`form-control ${email ? 'filled' : ''}`}
                      id="email"
                      type="text"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={`form-group ${message ? 'focused' : ''}`}>
                    <label className="form-label" htmlFor="comment">
                      Write Your Comment
                    </label>
                    <textarea
                      className={`form-control ${message ? 'filled' : ''}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id="comment"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-primary" type="submit">
                    Post Comment
                    <svg
                      className="icon-16 ml-5"
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
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
