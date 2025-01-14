import { faqs } from "@/data/faq";

export default function FAQ() {
	return (
		<section className="section">
			<div className="container-sub">
				<div className="mt-60">
					<h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
						Elite Transportation: Frequently Asked Questions
					</h2>
					<div className="content-single wow fadeInUp">
						{faqs.map((faq) => (
							<div key={faq.id} className="mb-8">
								<p className="mb-4">
									<strong>{faq.question}</strong>
								</p>
								<p className="mb-8">{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

