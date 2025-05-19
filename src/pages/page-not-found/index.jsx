import NotFound from "@/components/404";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "404 - Page Not Found | Elite Transportation Park City",
	description: "The page you're looking for could not be found. Return to Elite Transportation Park City homepage.",
	robots: "noindex, follow",
};

export default function PageNotFoundPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<NotFound />
		</DefaultLayout>
	);
}

