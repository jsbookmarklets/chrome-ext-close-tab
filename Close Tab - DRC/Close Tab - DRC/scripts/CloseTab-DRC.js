if (window.DRCsetup === undefined) {
	var recieveRightClick = (function () {
		var counter = 0;
		return function (e) {
			switch (e.which) {
			case 3:
				counter += 1;
				setTimeout(function () {
					if (counter > 0) {
						counter -= 1;
					}
				}, 300);
				if (counter === 2) {
					chrome.runtime.sendMessage({closeTab: true});
				}
				break;
			}
		};
	}());

	var interval = setInterval(function () {
		if (document.body) {
			// document.body events seem to be getting affected by prevention of event bubbling
			// document.body.onmouseup = function (e) {
				// recieveRightClick(e);
			// };

			// Not 100% sure, but it seems that if we register "document.onmouseup"
			// without checking for "document.body", then it may not behave properly.
			// In that case, it seems to be providing a delayed execution of closing the tab
			// (which may be harmful if user keeps on double-right-clicking and the clicks
			// might be received by other tabs as the current tab closes),
			// probably due to the architecture of the browser.
			document.onmouseup = function (e) {
				recieveRightClick(e);
			};

			clearInterval(interval);
		}
	}, 100);

	window.DRCsetup = true;
}
