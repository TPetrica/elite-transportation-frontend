import { contactCards } from '@/data/contact'
import { activeInputFocus } from '@/utils/activeInputFocus'
import { useEffect, useState } from 'react'

export default function ContactForm2() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    activeInputFocus()
  }, [])

  const handleChange = e => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Here you would add your email sending logic
      // For example using an API endpoint:
      // await axios.post('/api/contact', formData);

      // For now just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitted(true)
      setFormData({
        fullname: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section form-contact-2 mt-120 mb-70">
      <div className="container-sub">
        <div className="row">
          <div className="col-lg-6 mt-50 mb-50">
            <h2 className="heading-44-medium color-text mb-60 wow fadeInUp">Leave us your info</h2>
            <div className="form-contact form-comment wow fadeInUp">
              {submitted ? (
                <div className="alert alert-success">
                  Thank you for your message. We'll get back to you soon!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger mb-4">{error}</div>}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="fullname">
                          Full Name *
                        </label>
                        <input
                          className="form-control"
                          id="fullname"
                          type="text"
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email *
                        </label>
                        <input
                          className="form-control"
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="subject">
                          Subject *
                        </label>
                        <input
                          className="form-control"
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="message">
                          Message *
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (
                          'Sending...'
                        ) : (
                          <>
                            Get In Touch
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
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className="col-lg-6 mt-50 mb-50">
            <div className="box-offices wow fadeInUp">
              <h2 className="heading-44-medium color-text mb-60">Our Location</h2>
              <div className="row">
                {contactCards.map(elm => (
                  <div key={elm.id} className="col-lg-12 mb-30">
                    <div className="cardContact wow fadeInUp">
                      <div className="cardInfo">
                        <h6 className="heading-20-medium mb-10">{elm.city}</h6>
                        <p className="text-16 mb-20">{elm.address}</p>
                        <p className="text-16 mb-20">
                          <a href={`tel:${elm.phone}`} className="hover-up">
                            {elm.phone}
                          </a>
                        </p>
                        <p className="text-16">
                          <a href={`mailto:${elm.email}`} className="hover-up">
                            {elm.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
