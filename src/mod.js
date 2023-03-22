export function gamePixPlugin() {
	/**
	 * @param {GamePixAdResult} gamepixAdResult
	 * @returns {import("$adlad").ShowFullScreenAdResult}
	 */
	function convertGamepixAdResult(gamepixAdResult) {
		if (gamepixAdResult.success === undefined) {
			return {
				didShowAd: null,
				errorReason: null,
			};
		} else if (typeof gamepixAdResult.success == "boolean") {
			return {
				didShowAd: gamepixAdResult.success,
				errorReason: null,
			};
		}
		return {
			didShowAd: false,
			errorReason: "unknown",
		};
	}

	/** @type {import("$adlad").AdLadPlugin} */
	const plugin = {
		name: "gamepix",
		async initialize(ctx) {
			/** @type {() => void} */
			let resolveInitialize;

			/** @type {Promise<void>} */
			const promise = new Promise((resolve) => {
				resolveInitialize = resolve;
			});

			const scriptEl = document.createElement("script");
			scriptEl.src = "https://integration.gamepix.com/sdk/v3/gamepix.sdk.js";
			document.head.appendChild(scriptEl);
			scriptEl.onload = () => {
				resolveInitialize();
			};

			await promise;
		},
		async showFullScreenAd() {
			const result = await GamePix.interstitialAd();
			return convertGamepixAdResult(result);
		},
		async showRewardedAd() {
			const result = await GamePix.rewardAd();
			return convertGamepixAdResult(result);
		},
	};

	return plugin;
}
