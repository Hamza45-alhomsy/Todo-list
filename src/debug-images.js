// // Runtime helper to help debug image loading issues.
// // It logs every <img> element on the page, prints its resolved src and sizes,
// // and adds a temporary outline so you can visually spot images that are rendered but invisible.

// function inspectImages() {
// 	try {
// 		const imgs = Array.from(document.getElementsByTagName("img"));
// 		if (!imgs.length) {
// 			console.info("[debug-images] No <img> elements found in the DOM yet.");
// 		}
// 		imgs.forEach((img, i) => {
// 			const src = img.src || img.getAttribute("src");
// 			const naturalW = img.naturalWidth;
// 			const naturalH = img.naturalHeight;
// 			const comp = window.getComputedStyle(img);
// 			console.info(`[debug-images] img[${i}] src=`, src);
// 			console.info(
// 				`  natural: ${naturalW}x${naturalH}, computed: ${comp.width} x ${comp.height}, display=${comp.display}, visibility=${comp.visibility}, opacity=${comp.opacity}`,
// 			);

// 			// Add a visible outline so it's easy to see if the image element exists but is invisible/oversized
// 			img.style.outline = "3px dashed rgba(255,0,0,0.7)";
// 			img.style.outlineOffset = "4px";

// 			if (!img.complete || naturalW === 0) {
// 				console.warn(`[debug-images] image not loaded or zero-size: ${src}`);
// 			}
// 		});
// 	} catch (err) {
// 		console.error("[debug-images] error inspecting images:", err);
// 	}
// }

// // Run a few times with a short delay to catch images that load a bit later
// setTimeout(inspectImages, 500);
// setTimeout(inspectImages, 1500);
// setTimeout(inspectImages, 3000);

// export {};
