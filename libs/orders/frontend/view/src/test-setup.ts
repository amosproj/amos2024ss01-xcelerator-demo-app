// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
globalThis.ngJest = {
	testEnvironmentOptions: {
		errorOnUnknownElements: true,
		errorOnUnknownProperties: true,
	},
};
import 'jest-preset-angular/setup-jest';
