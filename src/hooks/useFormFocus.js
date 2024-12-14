import { useEffect } from "react";

export const useFormFocus = () => {
	useEffect(() => {
		const setupInputBehavior = () => {
			const inputs = document.querySelectorAll(
				".form-comment input, .form-comment textarea, .form-comment select"
			);

			const handleFocus = (e) => {
				const formGroup = e.target.closest(".form-group");
				if (formGroup) {
					formGroup.classList.add("focused");
					e.target.classList.add("filled");
				}
			};

			const handleBlur = (e) => {
				if (!e.target.value) {
					const formGroup = e.target.closest(".form-group");
					if (formGroup) {
						formGroup.classList.remove("focused");
						e.target.classList.remove("filled");
					}
				}
			};

			inputs.forEach((element) => {
				// Set initial state
				if (element.value) {
					const formGroup = element.closest(".form-group");
					if (formGroup) {
						formGroup.classList.add("focused");
						element.classList.add("filled");
					}
				}

				element.addEventListener("focus", handleFocus);
				element.addEventListener("blur", handleBlur);
			});

			return () => {
				inputs.forEach((element) => {
					element.removeEventListener("focus", handleFocus);
					element.removeEventListener("blur", handleBlur);
				});
			};
		};

		const cleanup = setupInputBehavior();

		// Setup observer for dynamic content
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.addedNodes.length) {
					cleanup();
					setupInputBehavior();
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			cleanup();
			observer.disconnect();
		};
	}, []);
};
