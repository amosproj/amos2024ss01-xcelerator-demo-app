// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
globalThis.ngJest = {
	testEnvironmentOptions: {
		errorOnUnknownElements: true,
		errorOnUnknownProperties: true,
	},
};
global.ResizeObserver = class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
};
import 'jest-preset-angular/setup-jest';
