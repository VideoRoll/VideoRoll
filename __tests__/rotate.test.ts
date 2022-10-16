/*
 * @description:
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
/**
 * @jest-environment jsdom
 */

import VideoRoll from "../src/inject/VideoRoll";

declare interface IExpect extends jest.Expect {
	toBeWithinRange: Function;
}

declare const expect: IExpect;

expect.extend({
	toBeWithinRange(received, floor, ceiling) {
		const pass = received >= floor && received <= ceiling;
		if (pass) {
			return {
				message: () =>
					`expected ${received} not to be within range ${floor} - ${ceiling}`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`expected ${received} to be within range ${floor} - ${ceiling}`,
				pass: false,
			};
		}
	},
});

/**
 * mock video
 * @param params
 */
function getMockVideo(params: {
	videoWidth: number;
	videoHeight: number;
	wrapWidth: number;
	wrapHeight: number;
}) {
	// mock videoElement
	const { videoWidth, videoHeight, wrapWidth, wrapHeight } = params;

	const video = {
		videoWidth,
		videoHeight,
		offsetWidth: wrapWidth,
		offsetHeight: wrapHeight
	} as HTMLVideoElement;

	return video;
}

describe("test auto scale", () => {
	test("horizontal wrap and horizontal video", () => {
		const video = getMockVideo({
			videoWidth: 800,
			videoHeight: 400,
			wrapWidth: 800,
			wrapHeight: 400
		});

		expect(VideoRoll.getScaleNumber(video, video, 90)).toEqual([
			expect.toBeWithinRange(0.5, 0.6),
			expect.toBeWithinRange(0.5, 0.6)
		]);

		expect(VideoRoll.getScaleNumber(video, video, 180)).toEqual([
			expect.toBeWithinRange(1, 1),
			expect.toBeWithinRange(1, 1)
		]);

		expect(VideoRoll.getScaleNumber(video, video, 270)).toEqual([
			expect.toBeWithinRange(0.5, 0.6),
			expect.toBeWithinRange(0.5, 0.6)
		]);

		expect(VideoRoll.getScaleNumber(video, video, 0)).toEqual([
			expect.toBeWithinRange(1, 1),
			expect.toBeWithinRange(1, 1)
		]);
	});

	test("horizontal wrap and vertical video", () => {
		const video1 = getMockVideo({
			videoWidth: 200,
			videoHeight: 800,
			wrapWidth: 800,
			wrapHeight: 400
		});

		expect(VideoRoll.getScaleNumber(video1, video1, 90)).toEqual([
			expect.toBeWithinRange(2, 2),
			expect.toBeWithinRange(2, 2)
		]);

		expect(VideoRoll.getScaleNumber(video1, video1, 180)).toEqual([
			expect.toBeWithinRange(1, 1),
			expect.toBeWithinRange(1, 1)
		]);

		expect(VideoRoll.getScaleNumber(video1, video1, 270)).toEqual([
			expect.toBeWithinRange(2, 2),
			expect.toBeWithinRange(2, 2)
		]);

		expect(VideoRoll.getScaleNumber(video1, video1, 0)).toEqual([
			expect.toBeWithinRange(1, 1),
			expect.toBeWithinRange(1, 1)
		]);

		const video2 = getMockVideo({
			videoWidth: 720,
			videoHeight: 1280,
			wrapWidth: 720,
			wrapHeight: 405
		});

		expect(VideoRoll.getScaleNumber(video2, video2, 90)).toEqual([
			expect.toBeWithinRange(1.7, 1.8),
			expect.toBeWithinRange(1.7, 1.8)
		]);

		expect(VideoRoll.getScaleNumber(video2, video2, 180)).toEqual([
			expect.toBeWithinRange(1, 1),
			expect.toBeWithinRange(1, 1)
		]);

		expect(VideoRoll.getScaleNumber(video2, video2, 270)).toEqual([
			expect.toBeWithinRange(1.7, 1.8),
			expect.toBeWithinRange(1.7, 1.8)
		]);

		expect(VideoRoll.getScaleNumber(video2, video2, 0)).toEqual([
			expect.toBeWithinRange(1, 1),
			expect.toBeWithinRange(1, 1)
		]);
	});
});
