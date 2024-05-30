/* eslint-disable */
export default {
	displayName: 'common-backend-insight-hub',
	preset: '../../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],

	coverageDirectory: '../../../../coverage/libs/common/backend/insight-hub',
};
