import { menuItems } from "@/data/menu";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
	const { pathname } = useLocation();

	// Function to determine if the link is active
	const isActive = (path) => {
		if (path === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(path);
	};

	return (
		<>
			{menuItems.map((item) => (
				<li key={item.id}>
					<Link
						className={`${isActive(item.link) ? "active-link" : ""}`}
						to={item.link}
					>
						{item.title}
					</Link>
				</li>
			))}
		</>
	);
}
