import React from 'react'

export default function SLCTransportOptions() {
  return (
    <section className="section tw-pt-20 tw-pb-12 tw-bg-gray-50">
      <div className="container-sub">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center">
          <div className="tw-w-full lg:tw-w-5/12 tw-mb-8 lg:tw-mb-0 tw-pr-0 lg:tw-pr-12">
            <div className="tw-box-info-service">
              <h2 className="heading-44-medium color-text tw-mb-6 wow fadeInUp">
                Transportation Options from Salt Lake City Airport
              </h2>
              <p className="tw-text-lg tw-text-gray-700 tw-mb-6 wow fadeInUp">
                Choose the perfect transportation method from Salt Lake City to Park City with our premium services tailored to your needs.
              </p>
              <div className="tw-mt-8 tw-space-y-6">
                <div className="tw-flex wow fadeInUp">
                  <div className="tw-flex-shrink-0 tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mr-5">
                    <img src="/assets/imgs/icons/private-suv.svg" alt="Private SUV Service" className="tw-w-8 tw-h-8" />
                  </div>
                  <div className="tw-flex-grow">
                    <h4 className="tw-text-lg tw-font-semibold tw-mb-2">Private SUV Service</h4>
                    <p className="tw-text-gray-600">Direct, door-to-door transportation from SLC to Park City in luxury vehicles.</p>
                  </div>
                </div>
                <div className="tw-flex wow fadeInUp">
                  <div className="tw-flex-shrink-0 tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mr-5">
                    <img src="/assets/imgs/icons/shared-shuttle.svg" alt="Shared Shuttle" className="tw-w-8 tw-h-8" />
                  </div>
                  <div className="tw-flex-grow">
                    <h4 className="tw-text-lg tw-font-semibold tw-mb-2">Shared Shuttle</h4>
                    <p className="tw-text-gray-600">Economical transportation from Salt Lake City airport to Park City with other travelers.</p>
                  </div>
                </div>
                <div className="tw-flex wow fadeInUp">
                  <div className="tw-flex-shrink-0 tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mr-5">
                    <img src="/assets/imgs/icons/group-transfer.svg" alt="Group Transfers" className="tw-w-8 tw-h-8" />
                  </div>
                  <div className="tw-flex-grow">
                    <h4 className="tw-text-lg tw-font-semibold tw-mb-2">Group Transfers</h4>
                    <p className="tw-text-gray-600">Specialized transportation for large groups between SLC and Park City.</p>
                  </div>
                </div>
              </div>
              <div className="tw-mt-8 wow fadeInUp">
                <a className="btn btn-link hover-up tw-inline-flex tw-items-center" href="/car-service-salt-lake-city-airport">
                  View All SLC Airport Transportation Options
                  <svg className="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="tw-w-full lg:tw-w-7/12">
            <div className="tw-box-image-service wow fadeInUp tw-rounded-xl tw-overflow-hidden tw-shadow-lg">
              <img 
                className="tw-w-full tw-h-auto" 
                src="/assets/imgs/page/homepage1/slc-to-park-city-options.jpg" 
                alt="SLC to Park City Transportation Options" 
                onError={(e) => {
                  e.target.src = "/assets/imgs/page/homepage1/service1.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}