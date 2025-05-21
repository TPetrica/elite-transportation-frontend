import { faqs } from "@/data/faq";
import { useState } from "react";

export default function Faq() {
	const [activeIndex, setActiveIndex] = useState(null);

	const handleToggle = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className="section pt-80 mb-30 bg-faqs">
			<div className="container-sub">
				<div className="box-faqs">
					<div className="text-center">
						<h2 className="color-brand-1 mb-20 wow fadeInUp">
							Frequently Asked Questions
						</h2>
					</div>
					<div className="mt-60 mb-40">
						<div className="accordion wow fadeInUp" id="accordionFAQ">
							{faqs.map((elm, i) => (
								<div key={i} className="accordion-item">
									<h5 className="accordion-header" id={`heading${i}`}>
										<button
											className={`accordion-button text-heading-5 ${
												activeIndex !== i ? "collapsed" : ""
											}`}
											type="button"
											onClick={() => handleToggle(i)}
											aria-expanded={activeIndex === i}
										>
											{elm.question}
										</button>
									</h5>
									<div
										className={`accordion-collapse collapse ${
											activeIndex === i ? "show" : ""
										}`}
									>
										<div className="accordion-body">{elm.answer}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}