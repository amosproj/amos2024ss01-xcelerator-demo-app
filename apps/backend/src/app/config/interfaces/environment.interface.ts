export interface IEnvironmentVariables {
	/* APP */
	BACKEND_PORT?: number;
	BACKEND_HOST?: string;
	BACKEND_NAME?: string;
	/* DATABASE */
	POSTGRES_HOST?: string;
	POSTGRES_PORT?: number;
	POSTGRES_USER?: string;
	POSTGRES_PASSWORD?: string;

	/* Insight Hub */
	INSIGHT_HUB_API_URL?: string;
	INSIGHT_HUB_API_KEY?: string;
}
