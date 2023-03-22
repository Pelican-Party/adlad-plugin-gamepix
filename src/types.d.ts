interface Window {
	GD_OPTIONS?: {
		gameId: string;
		onEvent(event: GdEvent);
	};
}

interface GamePixAdResult {
	success: boolean | undefined;
}

declare class GamePix {
	static interstitialAd(): Promise<GamePixAdResult>;
	static rewardAd(): Promise<GamePixAdResult>;
}
