export const sendToFlutter = (message: string): void => {
	if (window.flutter_inappwebview) {
		window.flutter_inappwebview.callHandler("handleJs", message);
		return;
	}

	if (window.handleJs) {
		window.handleJs.postMessage(message);
		return;
	}

	if (window.handleJs2) {
		window.handleJs2.postMessage(message);
		return;
	}
};
