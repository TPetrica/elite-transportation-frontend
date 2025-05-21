import React from 'react';
import { Plane, MapPin, Building, Clock, Car, Info } from 'lucide-react';

export default function SLCAirportInfo() {
  return (
    <section className="section pt-50 pb-80 bg-grey-60">
      <div className="container-sub">
        <div className="tw-text-center tw-mb-16 wow fadeInUp">
          <h2 className="heading-44-medium color-text tw-mb-4">
            Salt Lake City International Airport Guide
          </h2>
          <p className="text-lg color-grey-500 tw-max-w-3xl tw-mx-auto">
            Everything you need to know about SLC Airport and nearby airports
          </p>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8 tw-mb-16">
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-8 wow fadeInUp">
            <h3 className="text-24-medium color-text tw-mb-6">
              SLC Airport Code and Information
            </h3>
            
            <div className="tw-space-y-6">
              <div className="tw-flex tw-gap-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                  <Plane className="tw-text-primary" size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-18-medium color-text tw-mb-2">
                    Salt Lake City International Airport Code
                  </h4>
                  <p className="color-grey-500">
                    Salt Lake City International Airport is identified by the IATA code <strong>SLC</strong>. When booking flights to Salt Lake City Utah, this airport code will be displayed on your ticket and baggage tags. All commercial flights to the Park City area use this airport.
                  </p>
                </div>
              </div>
              
              <div className="tw-flex tw-gap-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                  <Building className="tw-text-primary" size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-18-medium color-text tw-mb-2">
                    Terminal Information
                  </h4>
                  <p className="color-grey-500">
                    SLC has a modern terminal with two concourses (A and B) connected by a tunnel. The Salt Lake City Department of Airports has recently completed a major renovation, making the terminal more spacious and efficient for travelers. Our drivers are familiar with all pickup locations at the airport.
                  </p>
                </div>
              </div>
              
              <div className="tw-flex tw-gap-4">
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                  <Clock className="tw-text-primary" size={24} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-18-medium color-text tw-mb-2">
                    SLC Departures and Arrivals
                  </h4>
                  <p className="color-grey-500">
                    Our service includes monitoring Salt Lake City flight arrivals and SLC flight status. We track Salt Lake City departures and adjust pickup times based on actual arrival information, even in cases of flight delays or SLC airport delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-8 wow fadeInUp">
            <h3 className="text-24-medium color-text tw-mb-6">
              Airports Near Salt Lake City Utah
            </h3>
            
            <p className="color-grey-500 tw-mb-6">
              When planning your transportation to Park City, it's helpful to understand the airports close to Salt Lake City Utah:
            </p>
            
            <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-6">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
                <MapPin className="tw-text-primary" size={20} aria-hidden="true" />
                <h4 className="text-18-medium color-text tw-mb-0">
                  Salt Lake City International (SLC)
                </h4>
              </div>
              <p className="color-grey-500 tw-mb-0">
                <strong>Distance to Park City:</strong> 37 miles<br />
                <strong>Travel Time:</strong> 40-45 minutes<br />
                <strong>Features:</strong> Major international airport, primary gateway to Park City
              </p>
            </div>
            
            <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-6">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
                <MapPin className="tw-text-primary" size={20} aria-hidden="true" />
                <h4 className="text-18-medium color-text tw-mb-0">
                  Heber Valley Airport
                </h4>
              </div>
              <p className="color-grey-500 tw-mb-0">
                <strong>Distance to Park City:</strong> 16 miles<br />
                <strong>Travel Time:</strong> 25 minutes<br />
                <strong>Features:</strong> Small regional airport, private aircraft only
              </p>
            </div>
            
            <p className="color-grey-500 tw-italic">
              <strong>Important Note:</strong> There is no commercial airport in Park City itself. Salt Lake City International Airport (SLC) is the closest airport with regular commercial service. For travelers asking "what airport do you fly into for Park City Utah?", SLC is the answer.
            </p>
          </div>
        </div>
        
        <div className="wow fadeInUp">
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
              <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-4">
                <Car className="tw-text-primary" size={24} aria-hidden="true" />
              </div>
              <h4 className="text-18-medium color-text tw-mb-3">
                Salt Lake City Cab Services
              </h4>
              <p className="color-grey-500">
                Standard taxi cabs in Salt Lake City are available at the airport, but these services can be expensive for the journey to Park City. Our premium car service Salt Lake City offers a more comfortable and reliable alternative to basic Salt Lake City taxi service, with professional chauffeurs and luxury vehicles.
              </p>
            </div>
            
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
              <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-4">
                <Plane className="tw-text-primary" size={24} aria-hidden="true" />
              </div>
              <h4 className="text-18-medium color-text tw-mb-3">
                Flights To Salt Lake City
              </h4>
              <p className="color-grey-500">
                Major airlines offer numerous daily flights to Salt Lake City International Airport. When searching for plane tickets to Salt Lake City or cheap flights to Salt Lake City Utah, many options are available from major hubs across the country. Once you've booked your flight, reserve your ground transportation with us.
              </p>
            </div>
            
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
              <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-4">
                <Info className="tw-text-primary" size={24} aria-hidden="true" />
              </div>
              <h4 className="text-18-medium color-text tw-mb-3">
                SLC Airport Facilities
              </h4>
              <p className="color-grey-500">
                Salt Lake City International Airport offers modern amenities including dining options, shopping, free Wi-Fi, and charging stations. After clearing baggage claim, our drivers will meet you at designated pickup areas, ensuring a seamless transition from your flight to Salt Lake City to your Park City transportation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}