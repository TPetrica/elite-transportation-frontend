import TipCalculator from '@/components/booking/TipCalculator'
import { useBooking } from '@/context/BookingContext'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { format } from 'date-fns'
import moment from 'moment'

// Formatting utilities
const formatDateTime = (date, time) => {
  if (!date) return ''
  try {
    return format(new Date(date), 'EEE, MMM dd, yyyy') + (time ? ` ${time}` : '')
  } catch (err) {
    return ''
  }
}

const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Sub-components
const RouteDetails = ({ pickupDetails, dropoffDetails }) => (
  <div className="mt-20 wow fadeInUp">
    <ul className="list-routes">
      <li>
        <span className="location-item">A</span>
        <span className="info-location text-14-medium">
          {pickupDetails?.address || 'Pickup location not selected'}
        </span>
      </li>
      <li>
        <span className="location-item">B</span>
        <span className="info-location text-14-medium">
          {dropoffDetails?.address || 'Dropoff location not selected'}
        </span>
      </li>
    </ul>
  </div>
)

const DateTimeInfo = ({ pickupDetails }) => (
  <div className="mt-20 wow fadeInUp">
    <ul className="list-icons">
      <li>
        <span className="icon-item icon-plan"></span>
        <span className="info-location text-14-medium">
          {formatDateTime(pickupDetails?.date) || 'Date not selected'}
        </span>
      </li>
      <li>
        <span className="icon-item icon-time"></span>
        <span className="info-location text-14-medium">
          {pickupDetails?.time
            ? moment(pickupDetails.time, 'HH:mm').format('h:mm A')
            : 'Time not selected'}
        </span>
      </li>
    </ul>
  </div>
)

const ReturnTripDetails = ({ returnDetails, isRoundTrip }) => {
  if (!isRoundTrip) return null
  
  return (
    <div className="mt-20 wow fadeInUp">
      <div className="border-bottom mt-20 mb-15"></div>
      <span className="text-14 color-grey">Return Trip</span>
      <ul className="list-icons mt-10">
        <li>
          <span className="icon-item icon-plan"></span>
          <span className="info-location text-14-medium">
            {formatDateTime(returnDetails?.date) || 'Return date not selected'}
          </span>
        </li>
        <li>
          <span className="icon-item icon-time"></span>
          <span className="info-location text-14-medium">
            {returnDetails?.time
              ? moment(returnDetails.time, 'HH:mm').format('h:mm A')
              : 'Return time not selected'}
          </span>
        </li>
      </ul>
    </div>
  )
}

const DistanceInfo = ({ distance, duration }) => (
  <div className="mt-20 wow fadeInUp">
    <div className="box-info-route">
      <div className="info-route-left">
        <span className="text-14 color-grey">Total Distance</span>
        <span className="text-14-medium color-text">
          {distance ? `${distance.km} km / ${distance.miles} miles` : 'Not calculated'}
        </span>
      </div>
      <div className="info-route-left">
        <span className="text-14 color-grey">Total Time</span>
        <span className="text-14-medium color-text">{duration || 'Not calculated'}</span>
      </div>
    </div>
  </div>
)

const ServiceInfo = ({ selectedService }) => {
  if (!selectedService) return null

  return (
    <>
      <div className="border-bottom mt-30 mb-25"></div>
      <div className="mt-0">
        <span className="text-14 color-grey">
          Service
          <Tooltip title="Price is calculated based on your selections" placement="right">
            <InfoCircleOutlined className="info-icon ml-2" />
          </Tooltip>
        </span>
        <br />
        <span className="text-14-medium color-text">
          {selectedService.title}
        </span>
      </div>
    </>
  )
}

const PassengerInfo = ({ passengerDetails }) => {
  if (!passengerDetails || (!passengerDetails.firstName && !passengerDetails.lastName)) {
    return null
  }

  return (
    <>
      <div className="border-bottom mt-30 mb-25"></div>
      <div className="mt-0">
        <span className="text-14 color-grey">Passenger</span>
        <br />
        <span className="text-14-medium color-text">
          {passengerDetails.firstName && passengerDetails.lastName && (
            <>
              {`${passengerDetails.firstName} ${passengerDetails.lastName}`}
              <br />
            </>
          )}
          {passengerDetails.email && (
            <>
              {passengerDetails.email}
              <br />
            </>
          )}
          {passengerDetails.phone && (
            <>
              {passengerDetails.phone}
              <br />
            </>
          )}
          {passengerDetails.flightNumber && (
            <>
              Flight: {passengerDetails.flightNumber}
              {passengerDetails.flightTime && ` at ${passengerDetails.flightTime}`}
              <br />
            </>
          )}
          {passengerDetails.notes && (
            <>
              <span className="text-12 color-grey">Notes: {passengerDetails.notes}</span>
            </>
          )}
        </span>
      </div>
    </>
  )
}

const ExtrasInfo = ({ selectedExtras }) => {
  if (!selectedExtras?.length) return null

  return (
    <>
      <div className="border-bottom mt-30 mb-25"></div>
      <div className="mt-0">
        <span className="text-14 color-grey">Extra Options</span>
        <br />
        {selectedExtras.map((extra, index) => (
          <span key={index} className="text-14-medium color-text">
            {extra.quantity} x {extra.name} - {formatCurrency(extra.price * extra.quantity)}
            <br />
          </span>
        ))}
      </div>
    </>
  )
}

const PricingSummary = ({ pricing, selectedService }) => (
  <>
    <ul className="list-prices list-prices-2">
      {selectedService && pricing.basePrice > 0 && (
        <li>
          <span className="text">Service Price</span>
          <span className="price">{formatCurrency(pricing.basePrice)}</span>
        </li>
      )}
      {pricing.gratuity > 0 && (
        <li>
          <span className="text">Gratuity</span>
          <span className="price">{formatCurrency(pricing.gratuity)}</span>
        </li>
      )}
      {pricing.nightFee > 0 && (
        <li>
          <span className="text">Night Service Fee</span>
          <span className="price">{formatCurrency(pricing.nightFee)}</span>
        </li>
      )}
      {pricing.extrasTotal > 0 && (
        <li>
          <span className="text">Extras Total</span>
          <span className="price">{formatCurrency(pricing.extrasTotal)}</span>
        </li>
      )}
    </ul>
    <div className="border-bottom mt-30 mb-15"></div>
    <ul className="list-prices">
      <li>
        <span className="text text-20-medium">Total</span>
        <span className="price text-20-medium">{formatCurrency(pricing.totalPrice)}</span>
      </li>
    </ul>
  </>
)

// Main SideBar component
export default function SideBar() {
  const {
    pickupDetails,
    dropoffDetails,
    selectedService,
    selectedExtras,
    distance,
    duration,
    pricing,
    passengerDetails,
    isAffiliate,
    isRoundTrip,
    returnDetails,
  } = useBooking()

  return (
    <div className="box-tab-right">
      <div className="sidebar">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
        </div>

        {/* Journey Details */}
        <RouteDetails pickupDetails={pickupDetails} dropoffDetails={dropoffDetails} />
        <DateTimeInfo pickupDetails={pickupDetails} />
        <ReturnTripDetails returnDetails={returnDetails} isRoundTrip={isRoundTrip} />

        {/* Distance and Duration */}
        {(distance || duration) && <DistanceInfo distance={distance} duration={duration} />}

        {/* Service Details */}
        {selectedService && (
          <ServiceInfo selectedService={selectedService} />
        )}

        {/* Passenger Details */}
        <PassengerInfo passengerDetails={passengerDetails} />

        {/* Extras */}
        <ExtrasInfo selectedExtras={selectedExtras} />

        {/* Pricing Summary */}
        {(selectedService || selectedExtras?.length > 0) && (
          <div className="pricing-summary mt-30">
            {pricing.basePrice > 0 && (
              <div className="mb-30">
                <TipCalculator basePrice={pricing.basePrice} />
              </div>
            )}
            <PricingSummary pricing={pricing} selectedService={selectedService} />
          </div>
        )}
      </div>

      <style jsx>{`
        .info-icon {
          color: #1890ff;
          cursor: pointer;
        }

        .price-breakdown-tooltip {
          padding: 12px;
          min-width: 200px;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          margin: 4px 0;
        }

        .breakdown-total {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #e8e8e8;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  )
}
