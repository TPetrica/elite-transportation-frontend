import DatePickerComponent from '@/components/common/DatePicker'
import PlacePicker from '@/components/common/PlacePicker'
import LazyBackgroundImage from '@/components/homes/home-1/LazyBackgroundImage'
import { useBooking } from '@/context/BookingContext'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const banners = [
  {
    id: 1,
    url: '/assets/imgs/page/homepage1/car4-optimized.webp',
    title: 'SLC to Park City Shuttle',
    text: 'Elite Transportation from Salt Lake City Airport to Park City',
    position: 'bottom center',
  },
  {
    id: 2,
    url: '/assets/imgs/page/homepage1/car1-optimized.webp',
    title: 'Salt Lake City Airport Transportation',
    text: 'Professional SLC Airport Shuttle Service to Park City Utah',
    position: 'bottom center',
  },
  {
    id: 3,
    url: '/assets/imgs/page/homepage1/car2-optimized.webp',
    title: 'Park City Mountain Resort Transfers',
    text: 'Luxury Transportation from SLC to Park City Ski Resorts',
    position: 'center center',
  },
  {
    id: 4,
    url: '/assets/imgs/page/homepage1/car3-optimized.webp',
    title: 'Private Car Service Salt Lake City',
    text: 'Door-to-Door Transportation from SLC Airport to Park City',
    position: 'center center',
  },
]

export default function Hero() {
  const navigate = useNavigate()
  const { setPickupDetails, setDropoffDetails, setSelectedDate } = useBooking()
  const [selectedDateLocal, setSelectedDateLocal] = useState(new Date())

  const settings = {
    slidesPerView: 1,
    loop: true,
    navigation: { nextEl: '.snbn2', prevEl: '.snbp2' },
    modules: [Navigation, Autoplay, Pagination],
    pagination: { el: '.sph1', clickable: true, type: 'fraction' },
    autoplay: { delay: 10000 },
    preloadImages: false, // Let our custom handling work
    lazy: true, // Enable Swiper's built-in lazy loading as a fallback
    watchSlidesProgress: true, // Required for lazy loading to work properly
    init: false, // Delay initialization
  }

  // Initialize swiper after first render to avoid LCP issues
  useEffect(() => {
    const timer = setTimeout(() => {
      const swiperContainer = document.querySelector('.swiper-container')
      if (swiperContainer && swiperContainer.swiper) {
        swiperContainer.swiper.init()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    const momentDate = moment(selectedDateLocal)

    setSelectedDate(momentDate)
    setPickupDetails({ date: momentDate.format('YYYY-MM-DD') })

    navigate('/booking-time')
  }

  return (
    <section className="section banner-home1 home-page">
      <div className="box-swiper">
        <Swiper
          style={{ maxWidth: '100vw', overflow: 'hidden' }}
          {...settings}
          className="swiper-container swiper-banner-1 pb-0"
        >
          {banners.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <LazyBackgroundImage
                src={elm.url}
                position={elm.position}
                className="box-cover-image boxBgImage"
                eager={i === 0} // Load first slide eagerly
              />
              <div className="box-banner-info">
                <p className="text-16 color-white wow fadeInUp">{elm.title}</p>
                <h2 className="heading-52-medium color-white wow fadeInUp">
                  {elm.text.split(' ').slice(0, 2).join(' ')} <br className="d-none d-lg-block" />
                  {elm.text.split(' ').slice(2).join(' ')}
                </h2>
              </div>
            </SwiperSlide>
          ))}

          <div className="box-pagination-button hero1nagigation">
            <div className="swiper-button-prev swiper-button-prev-banner snbp2"></div>
            <div className="swiper-button-next swiper-button-next-banner snbn2"></div>
            <div className="swiper-pagination swiper-pagination-banner sph1"></div>
          </div>
        </Swiper>
      </div>

      <div className="box-search-ride wow fadeInUp">
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
    </section>
  )
}
