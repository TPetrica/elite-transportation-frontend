import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <section className="section tw-py-20 tw-bg-blue-600">
      <div className="container-sub">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center">
          <div className="tw-w-full lg:tw-w-7/12 tw-mb-10 lg:tw-mb-0">
            <div className="tw-pr-0 lg:tw-pr-16">
              <h2 className="heading-44-medium tw-text-white tw-mb-6 wow fadeInUp">
                Book Your SLC to Park City Transportation Today
              </h2>
              <p className="tw-text-lg tw-text-white tw-mb-8 wow fadeInUp">
                Secure reliable, comfortable transportation from Salt Lake City airport to Park City. Our professional drivers and luxury vehicles ensure a stress-free journey to your destination.
              </p>
              
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mb-10">
                <div className="tw-flex tw-items-start wow fadeInUp">
                  <div className="tw-mr-3 tw-mt-1">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="tw-text-white">
                    <h5 className="tw-font-semibold tw-mb-1">Flight Tracking</h5>
                    <p className="tw-text-sm tw-text-white tw-opacity-90">We monitor your flight and adjust for delays</p>
                  </div>
                </div>
                
                <div className="tw-flex tw-items-start wow fadeInUp">
                  <div className="tw-mr-3 tw-mt-1">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="tw-text-white">
                    <h5 className="tw-font-semibold tw-mb-1">Door-to-Door Service</h5>
                    <p className="tw-text-sm tw-text-white tw-opacity-90">Direct service to your exact destination</p>
                  </div>
                </div>
                
                <div className="tw-flex tw-items-start wow fadeInUp">
                  <div className="tw-mr-3 tw-mt-1">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="tw-text-white">
                    <h5 className="tw-font-semibold tw-mb-1">Professional Drivers</h5>
                    <p className="tw-text-sm tw-text-white tw-opacity-90">Experienced, knowledgeable chauffeurs</p>
                  </div>
                </div>
                
                <div className="tw-flex tw-items-start wow fadeInUp">
                  <div className="tw-mr-3 tw-mt-1">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="tw-text-white">
                    <h5 className="tw-font-semibold tw-mb-1">Luxury Vehicles</h5>
                    <p className="tw-text-sm tw-text-white tw-opacity-90">Comfortable, well-maintained SUVs</p>
                  </div>
                </div>
              </div>
              
              <Link className="btn btn-white hover-up tw-inline-flex tw-items-center wow fadeInUp" to="/booking">
                Book SLC to Park City Shuttle
                <svg
                  className="tw-w-4 tw-h-4 tw-ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="tw-w-full lg:tw-w-5/12">
            <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-6 wow fadeInUp">
              <h3 className="tw-text-xl tw-font-semibold tw-mb-5 tw-text-center">Get an Instant Quote</h3>
              
              <form className="tw-space-y-4">
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Select Service Type</label>
                  <select className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500">
                    <option>SLC Airport to Park City</option>
                    <option>Park City to SLC Airport</option>
                    <option>Hourly Charter</option>
                  </select>
                </div>
                
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Select Date</label>
                  <input 
                    type="date" 
                    className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500" 
                  />
                </div>
                
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Number of Passengers</label>
                  <select className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500">
                    <option>1-2 Passengers</option>
                    <option>3-5 Passengers</option>
                    <option>6-7 Passengers</option>
                    <option>8+ Passengers</option>
                  </select>
                </div>
                
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Your Email Address</label>
                  <input 
                    type="email" 
                    className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500" 
                    placeholder="your@email.com"
                  />
                </div>
                
                <button type="submit" className="tw-w-full tw-py-3 tw-px-4 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-semibold tw-rounded-md tw-shadow-sm tw-transition-colors tw-duration-200">
                  Get Quote Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}