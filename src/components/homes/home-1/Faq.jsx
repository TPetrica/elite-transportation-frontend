import { faqs } from "@/data/faq";
import { Collapse } from "bootstrap";
import { useEffect, useState } from "react";

export default function Faq() {
	const [activeIndex, setActiveIndex] = useState(null);
	const [collapseInstances, setCollapseInstances] = useState([]);

	useEffect(() => {
		// Initialize all collapse elements
		const instances = Array.from(
			document.querySelectorAll(".accordion-collapse")
		).map((element) => new Collapse(element, { toggle: false }));
		setCollapseInstances(instances);
	}, []);

	const handleToggle = (index) => {
		// If clicking the currently active item, just close it
		if (activeIndex === index) {
			collapseInstances[index]?.hide();
			setActiveIndex(null);
			return;
		}

		// Close the previously active item
		if (activeIndex !== null) {
			collapseInstances[activeIndex]?.hide();
		}

		// Open the clicked item
		collapseInstances[index]?.show();
		setActiveIndex(index);
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
											aria-controls={`collapse${i}`}
										>
											{elm.question}
										</button>
									</h5>
									<div
										id={`collapse${i}`}
										className={`accordion-collapse collapse`}
										aria-labelledby={`heading${i}`}
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
