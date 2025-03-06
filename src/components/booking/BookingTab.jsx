import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
  {
    id: 1,
    href: '/booking-time',
    iconClass: 'icon-book icon-vehicle',
    text: 'Ride Info',
    number: '01',
  },
  // {
  // 	id: 2,
  // 	href: "/booking-service",
  // 	iconClass: "icon-book icon-vehicle",
  // 	text: "Service",
  // 	number: "02",
  // },
  {
    id: 2,
    href: '/booking-extra',
    iconClass: 'icon-book icon-pax',
    text: 'Extras',
    number: '02',
  },
  {
    id: 3,
    href: '/booking-passenger',
    iconClass: 'icon-book icon-pax',
    text: 'Details',
    number: '03',
  },
  {
    id: 4,
    href: '/booking-payment',
    iconClass: 'icon-book icon-payment',
    text: 'Payment',
    number: '04',
  },
]

export default function BookingTab() {
  const [activePathIndex, setactivePathIndex] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const activeTab = tabs.find(elm => elm.href === pathname)
    const activeTabIndex = tabs.indexOf(activeTab)
    setactivePathIndex(activeTabIndex)
  }, [pathname])

  return (
    <div className="box-booking-tabs">
      {tabs.map((elm, i) => (
        <div key={i} className="item-tab wow fadeInUp">
          <Link to={elm.href}>
            <div className={`box-tab-step ${activePathIndex >= i ? 'active' : ''}`}>
              <div className="icon-tab">
                <span className={elm.iconClass}></span>
                <span className="text-tab">{elm.text}</span>
              </div>
              <div className="number-tab">
                <span>{elm.number}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
