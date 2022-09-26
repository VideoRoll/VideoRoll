/**
 * @jest-environment jsdom
 */

import VideoRoll from '../src/inject/VideoRoll';

describe('VideoRoll', () => {
	test('auto scale', () => {
		const videoDom = document.createElement('video');
		videoDom.width = 800;
		videoDom.height = 400;
		expect(VideoRoll.getScaleNumber(videoDom, videoDom, 90)).toBeGreaterThan(3);
	});
})
