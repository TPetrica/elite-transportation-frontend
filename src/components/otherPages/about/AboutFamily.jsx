import React from 'react';

export default function AboutFamily() {
  return (
    <section className="section pt-80 pb-50">
      <div className="container-sub">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-16 tw-mb-16">
          <div className="wow fadeInUp">
            <h2 className="heading-44-medium color-text tw-mb-6">
              Our Family Business Journey
            </h2>
            <p className="text-18 color-grey-500 tw-mb-6">
              Starting a transportation business in Park City has been a dream come true for our family. As Romanian immigrants, we are deeply grateful for the opportunity to serve the wonderful community of Park City and visitors traveling from Salt Lake City International Airport (SLC) to Park City Utah.
            </p>
            <p className="text-18 color-grey-500 tw-mb-6">
              We specialize in providing reliable transportation from SLC to Park City, understanding that after a long flight to Salt Lake City, the last thing travelers want is to worry about how to get from SLC to Park City. Our car service from Salt Lake City airport ensures a smooth transition from your plane to your final destination.
            </p>
            <p className="text-18 color-grey-500 tw-mb-6">
              As a small, locally-owned business operating near Salt Lake City International Airport (SLC code), we take pride in treating every customer like family. Our dedication to exceptional service has made us one of the most trusted providers of transportation from Salt Lake City to Park City UT.
            </p>
          </div>
          
          <div className="wow fadeInUp">
            <div className="tw-relative tw-rounded-lg tw-overflow-hidden tw-h-full tw-min-h-[320px]">
              <img 
                src="/assets/imgs/page/about/image-driver.webp" 
                alt="Professional driver providing car service from Salt Lake City airport to Park City" 
                className="tw-object-cover tw-w-full tw-h-full"
              />
            </div>
          </div>
        </div>
        
        <div className="wow fadeInUp">
          <div className="tw-bg-gray-50 tw-rounded-xl tw-p-8">
            <h3 className="heading-34-medium color-text tw-mb-6 tw-text-center">
              Premium Service Philosophy
            </h3>
            
            <div className="tw-mb-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
              <div className="tw-text-center">
                <div className="tw-bg-white tw-rounded-full tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4 tw-shadow-md">
                  <span className="tw-text-primary tw-text-3xl tw-font-bold">1</span>
                </div>
                <h4 className="text-20-medium color-text tw-mb-3">
                  Reliable Transportation
                </h4>
                <p className="color-grey-500">
                  At Elite Transportation, we specialize in making your travel experience between Salt Lake City International Airport and Park City as comfortable and seamless as possible. Our commitment to punctuality means we're always there when you need us.
                </p>
              </div>
              
              <div className="tw-text-center">
                <div className="tw-bg-white tw-rounded-full tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4 tw-shadow-md">
                  <span className="tw-text-primary tw-text-3xl tw-font-bold">2</span>
                </div>
                <h4 className="text-20-medium color-text tw-mb-3">
                  Professional Service
                </h4>
                <p className="color-grey-500">
                  Our team of professional drivers offers more than just transportation from SLC to Park City - we provide a premium car service Salt Lake City experience tailored to your needs, from flight tracking to luggage assistance.
                </p>
              </div>
              
              <div className="tw-text-center">
                <div className="tw-bg-white tw-rounded-full tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4 tw-shadow-md">
                  <span className="tw-text-primary tw-text-3xl tw-font-bold">3</span>
                </div>
                <h4 className="text-20-medium color-text tw-mb-3">
                  Local Expertise
                </h4>
                <p className="color-grey-500">
                  Our drivers know the best route from Salt Lake City to Park City in any weather condition. Whether you're headed to Park City Mountain Resort or exploring things to do in Salt Lake City, our local knowledge ensures the best travel experience.
                </p>
              </div>
            </div>
            
            <p className="color-grey-500 tw-text-center tw-mt-6 tw-italic">
              Thank you for choosing Elite Transportation—we look forward to providing you with exceptional shuttle service from Salt Lake City airport to Park City on your next journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}