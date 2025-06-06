import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";

export default function Header() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<header className="header sticky-bar stick">
			<div className="container">
				<div className="main-header">
					<div className="header-left">
						<div className="header-logo">
							<Link className="d-flex" to="/">
								<img alt="luxride" src="/assets/imgs/template/logo-nobg.png" />
							</Link>
						</div>
						<div className="header-nav">
							<nav className="nav-main-menu d-none d-xl-block">
								<ul className="main-menu">
									<Nav />
								</ul>
							</nav>
							<div className="burger-icon burger-icon-white">
								<span className="burger-icon-mid"></span>
								<span className="burger-icon-bottom"></span>
							</div>
						</div>
						<div className="header-right">
							<div className="box-button-login d-inline-block align-middle mr-20">
								<Link className="btn btn-white hover-up" to="/booking-time">
									Reservation
								</Link>
							</div>
							<div className="d-none d-xxl-inline-block align-middle mr-10">
								<a
									className="text-14-medium call-phone color-white hover-up"
									href="tel:+1 (435) 901-9158"
								>
									+1 (435) 901-9158
								</a>
							</div>
							{/* <div className="d-none d-xxl-inline-block box-dropdown-cart align-middle mr-10">
                                <Language />
                            </div> */}
							{/* <div className="box-button-login d-inline-block align-middle">
								<Link className="btn btn-white hover-up" to="/booking-time">
									Reservation
								</Link>
							</div> */}
							{/* {user ? (
                                <div className="box-button-login d-inline-block align-middle">
                                    <button
                                        className="btn btn-white hover-up"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="box-button-login d-inline-block mr-10 align-middle">
                                        <Link className="btn btn-default hover-up" to="/login">
                                            Log In
                                        </Link>
                                    </div>
                                    <div className="box-button-login d-none2 d-inline-block align-middle">
                                        <Link className="btn btn-white hover-up" to="/register">
                                            Sign Up
                                        </Link>
                                    </div>
                                </>
                            )} */}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

