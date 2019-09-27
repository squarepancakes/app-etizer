const originalFetch = window.fetch;

export const mockOnce = data => {
	if (window.fetch === originalFetch) {
		window.fetch = jest.fn();
	}
	window.fetch.mockResolvedValueOnce({
		json: jest.fn().mockResolvedValue(data)
	});
};

export const restoreMock = () => {
	if (window.fetch !== originalFetch) {
		window.fetch.restoreMock();
	}
};

export default {
	mockOnce,
	restoreMock
};
