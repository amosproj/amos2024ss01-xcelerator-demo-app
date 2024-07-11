import { IAppEnvironment } from 'common-frontend-models';

export const environment: IAppEnvironment = {
	production: false,
	apiUrl: process.env.XD_API_URL,
	secretKey: process.env.XD_SECRET_KEY,
};
