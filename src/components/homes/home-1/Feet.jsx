import { cars } from '@/data/cars'
import { addLeftPaddingSwiper } from '@/utils/addSwiperPadding'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Feet() {
  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    navigation: {
      nextEl: '.snbn1',
      prevEl: '.snbp1',
    },
    modules: [Navigation, Autoplay],

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
      670: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      400: {
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

  useEffect(() => {
    addLeftPaddingSwiper()
    window.addEventListener('resize', addLeftPaddingSwiper)
    return () => {
      window.removeEventListener('resize', addLeftPaddingSwiper)
    }
  }, [])
  return (
    <section className="section pt-120 pb-120 bg-our-fleet">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-7">
            <h2 className="heading-44-medium title-fleet swiper-title wow fadeInUp">Our Fleet</h2>
          </div>
          <div className="col-lg-6 col-5 text-end">
            <Link className="text-16-medium color-primary wow fadeInUp" to="/fleet-list">
              More Fleet
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
      </div>
      <div className="box-slide-fleet swiper-padding mt-50">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: '100vw', overflow: 'hidden' }}
            {...settings}
            onSwiper={() => {}}
            className="swiper-container swiper-group-4-fleet pb-0"
          >
            {cars.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="cardFleet wow fadeInUp">
                  <div className="cardInfo">
                    <Link to={`/fleet-single/${elm.id}`}>
                      <h3 className="text-20-medium color-text mb-10">{elm.title}</h3>
                    </Link>
                    <p className="text-14 color-text mb-30">{elm.description}</p>
                  </div>
                  <div className="cardImage mb-30">
                    <Link to={`/fleet-single/${elm.id}`}>
                      <img src={elm.imgSrc} alt="Luxride" />
                    </Link>
                  </div>
                  <div className="cardInfoBottom">
                    <div className="passenger">
                      <span className="icon-circle icon-passenger"></span>
                      <span className="text-14">
                        Passengers<span>{elm.passenger}</span>
                      </span>
                    </div>
                    <div className="luggage">
                      <span className="icon-circle icon-luggage"></span>
                      <span className="text-14">
                        Luggage<span>{elm.luggage}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="box-pagination-fleet">
              <div className="swiper-button-prev swiper-button-prev-fleet snbp1">
                <svg
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </div>
              <div className="swiper-button-next swiper-button-next-fleet snbn1">
                <svg
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  )
}
