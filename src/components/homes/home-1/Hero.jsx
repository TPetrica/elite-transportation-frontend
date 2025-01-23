import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import { useBooking } from "@/context/BookingContext";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
	{
		id: 1,
		url: "/assets/imgs/page/homepage1/car4.webp",
		title: "Premium Park City Transportation",
		text: "Luxury SUV Service for All Your Travel Needs",
		position: "bottom center"
	},
	{
		id: 2,
		url: "/assets/imgs/page/homepage1/car1.webp",
		title: "Airport Transfers",
		text: "Safe Rides to SLC International Airport",
		position: "bottom center"
	},
	{
		id: 3,
		url: "/assets/imgs/page/homepage1/car2.webp", 
		title: "Local Excellence",
		text: "Your Trusted Park City Transport Partner",
		position: "center center"
	},
	{
		id: 4,
		url: "/assets/imgs/page/homepage1/car3.webp",
		title: "Mountain Travel Made Easy",
		text: "Resort & Ski Area Transportation",
		position: "center center"
	},
	{
		id: 5,
		url: "/assets/imgs/template/logo.jpeg",
		title: "Group Transportation",
		text: "Corporate & Event Services in Utah",
		position: "center center"
	}
 ];

export default function Hero() {
	const navigate = useNavigate();
	const { setPickupDetails, setDropoffDetails, setSelectedDate } = useBooking();
	const [selectedDateLocal, setSelectedDateLocal] = useState(new Date());

	const settings = {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: ".snbn2",
			prevEl: ".snbp2",
		},
		modules: [Navigation, Autoplay, Pagination],
		pagination: {
			el: ".sph1",
			clickable: true,
			type: "fraction",
		},
		autoplay: {
			delay: 10000,
		},
	};

	const handleSearch = () => {
		const momentDate = moment(selectedDateLocal);

		setSelectedDate(momentDate);
		setPickupDetails({
			date: momentDate.format("YYYY-MM-DD"),
		});

		navigate("/booking-time");
	};

	return (
		<section className="section banner-home1 home-page">
			<div className="box-swiper">
				<Swiper
					style={{ maxWidth: "100vw", overflow: "hidden" }}
					{...settings}
					className="swiper-container swiper-banner-1 pb-0"
				>
					{banners.map((elm, i) => (
						<SwiperSlide key={i} className="swiper-slide">
							<div
								className="box-cover-image boxBgImage"
								style={{
									backgroundImage: `url(${elm.url})`,
									backgroundPosition: elm.position
								}}
							></div>
							<div className="box-banner-info">
								<p className="text-16 color-white wow fadeInUp">{elm.title}</p>
								<h2 className="heading-52-medium color-white wow fadeInUp">
									{elm.text.split(" ").slice(0, 2).join(" ")}{" "}
									<br className="d-none d-lg-block" />
									{elm.text.split(" ").slice(2).join(" ")}
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
						<DatePickerComponent
							value={selectedDateLocal}
							onChange={setSelectedDateLocal}
						/>
					</div>
				</div>

				<div className="search-item search-from">
					<div className="search-icon">
						<span className="item-icon icon-from"> </span>
					</div>
					<div className="search-inputs" style={{ marginTop: "-20px" }}>
						<label className="text-14 color-grey">From</label>
						<PlacePicker
							onChange={(location) => {
								setPickupDetails({
									address: location.address,
									coordinates: location.coordinates,
								});
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
					<div className="search-inputs" style={{ marginTop: "-20px" }}>
						<label className="text-14 color-grey">To</label>
						<PlacePicker
							onChange={(location) => {
								setDropoffDetails({
									address: location.address,
									coordinates: location.coordinates,
								});
							}}
							type="dropoff"
							placeholder="Enter drop-off location"
						/>
					</div>
				</div>

				<div className="search-item search-button">
					<button
						className="btn btn-search"
						type="submit"
						onClick={handleSearch}
					>
						<img src="/assets/imgs/template/icons/search.svg" alt="luxride" />
						Search
					</button>
				</div>
			</div>
		</section>
	);
}