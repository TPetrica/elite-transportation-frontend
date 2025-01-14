// src/components/Nav.jsx

import { Link, useLocation } from "react-router-dom";

// src/data/menu.js

export const menuItems = [
	{
		id: 1,
		title: "Home",
		link: "/",
	},
	{
		id: 2,
		title: "Reservation",
		link: "/booking-time",
	},
	{
		id: 3,
		title: "About Us",
		link: "/about-us",
	},
	{
		id: 4,
		title: "Rates",
		link: "/rates",
	},
	{
		id: 5,
		title: "Services",
		link: "/services",
	},
	{
		id: 4,
		title: "FAQ",
		link: "/faq",
	},
	// {
	// 	id: 6,
	// 	title: "Blog",
	// 	link: "/blog",
	// },
	{
		id: 7,
		title: "Contact",
		link: "/contact",
	},
];

export default function Nav() {
	const { pathname } = useLocation();

	// Function to determine if the link is active
	const isActive = (path) => {
		if (path === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(path);
	};

	return (
		<nav>
			<ul>
				{menuItems.map((elm) => (
					<li key={elm.id}>
						<Link
							to={elm.link}
							className={`active ${isActive(elm.link) ? "active-link" : ""}`}
						>
							{elm.title}
						</Link>
					</li>
				))}

				{/* If you have additional links outside of menuItems, you can include them here */}
				{/* Example:
        <li>
          <Link to="/another-link" className={pathname === "/another-link" ? "active-link" : ""}>
            Another Link
          </Link>
        </li>
        */}
			</ul>
		</nav>
	);
}

