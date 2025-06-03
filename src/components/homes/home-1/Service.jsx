import { services } from '@/data/services'
import { addLeftPaddingSwiper } from '@/utils/addSwiperPadding'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Service() {
  useEffect(() => {
    addLeftPaddingSwiper()
    //add padding to .swiper-padding according to .swiper-title
    window.addEventListener('resize', addLeftPaddingSwiper)
    return () => {
      window.removeEventListener('resize', addLeftPaddingSwiper)
    }
  }, [])
  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    // Navigation disabled as only 4 services
    modules: [Autoplay],

    autoplay: {
      delay: 10000,
    },

    breakpoints: {
      1399: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  }

  return (
    <section className="section pt-90 pb-120 bg-our-service">
      <div className="container-sub">
        <div className="text-center mb-5">
          <h2 className="heading-44-medium title-fleet wow fadeInUp">
            Our Services
          </h2>
        </div>
      </div>
      <div className="box-slide-fleet mt-50 swiper-padding">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: '100vw', overflow: 'hidden' }}
            {...settings}
            className="swiper-container swiper-group-4-service pb-0"
          >
            {services.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="cardService wow fadeInUp">
                  <div className="cardInfo">
                    <h3 className="cardTitle text-20-medium color-white mb-10">{elm.title}</h3>
                    <div className="box-inner-info">
                      <p className="cardDesc text-14 color-white mb-30">{elm.description}</p>
                      <Link className="cardLink btn btn-arrow-up" to={`/services/${elm.slug}`}>
                        <svg
                          className="icon-16"
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
                      </Link>
                    </div>
                  </div>
                  <div className="cardImage">
                    <img src={elm.image} alt="Luxride" />
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation arrows removed as there are only 4 services */}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
