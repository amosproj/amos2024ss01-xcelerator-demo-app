/* eslint-disable */
export default {
<<<<<<<< HEAD:libs/facilities/backend/timeseries/jest.config.ts
	displayName: 'facilities-backend-timeseries',
========
	displayName: 'common-backend-insight-hub',
>>>>>>>> 08884c1 (refactor: move @frontend/common/backend/insight-hub):libs/common/backend/insight-hub/jest.config.ts
	preset: '../../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
<<<<<<<< HEAD:libs/facilities/backend/timeseries/jest.config.ts
	coverageDirectory: '../../../../coverage/libs/facilities/backend/timeseries',
========
	coverageDirectory: '../../../../coverage/libs/common/backend/insight-hub',
>>>>>>>> 08884c1 (refactor: move @frontend/common/backend/insight-hub):libs/common/backend/insight-hub/jest.config.ts
};
