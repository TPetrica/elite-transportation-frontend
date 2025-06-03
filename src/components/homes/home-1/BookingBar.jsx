import DatePickerComponent from '@/components/common/DatePicker'
import PlacePicker from '@/components/common/PlacePicker'
import { useBooking } from '@/context/BookingContext'
import moment from 'moment'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookingBar() {
  const navigate = useNavigate()
  const { setPickupDetails, setDropoffDetails, setSelectedDate } = useBooking()
  const [selectedDateLocal, setSelectedDateLocal] = useState(new Date())

  const handleSearch = () => {
    const momentDate = moment(selectedDateLocal)

    setSelectedDate(momentDate)
    setPickupDetails({ date: momentDate.format('YYYY-MM-DD') })

    navigate('/booking-time')
  }

  return (
    <section className="section tw-py-16 tw-bg-gray-50">
      <div className="container-sub">
        <div className="tw-text-center tw-mb-8">
          <h2 className="heading-44-medium color-text wow fadeInUp">
            Book Your Transportation
          </h2>
          <p className="tw-text-lg tw-text-gray-700 tw-mt-4 wow fadeInUp">
            Quick and easy booking for your Salt Lake City to Park City journey
          </p>
        </div>
        
        <div className="box-search-ride wow fadeInUp tw-mx-auto">
          <div className="search-item search-date">
            <div className="search-icon">
              <span className="item-icon icon-date"> </span>
            </div>
            <div className="search-inputs">
              <label className="text-14 color-grey">Date</label>
              <DatePickerComponent value={selectedDateLocal} onChange={setSelectedDateLocal} />
            </div>
          </div>

          <div className="search-item search-from">
            <div className="search-icon">
              <span className="item-icon icon-from"> </span>
            </div>
            <div className="search-inputs" style={{ marginTop: '-20px' }}>
              <label className="text-14 color-grey">From</label>
              <PlacePicker
                onChange={location => {
                  setPickupDetails({ address: location.address, coordinates: location.coordinates })
                }}
                type="pickup"
                placeholder="Enter pickup location"
              />
            </div>
          </div>

          <div className="search-item search-to">
            <div className="search-icon">
              <span className="item-icon icon-to"> </span>
            </div>
            <div className="search-inputs" style={{ marginTop: '-20px' }}>
              <label className="text-14 color-grey">To</label>
              <PlacePicker
                onChange={location => {
                  setDropoffDetails({ address: location.address, coordinates: location.coordinates })
                }}
                type="dropoff"
                placeholder="Enter drop-off location"
              />
            </div>
          </div>

          <div className="search-item search-button">
            <button className="btn btn-search" type="submit" onClick={handleSearch}>
              <img src="/assets/imgs/template/icons/search.svg" alt="luxride" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}