## common-backend-models

### Description

This package contains the models used in the backend of the application. The models are used to type the config fields provided by the config service.

### Explanation

The models are inside the common domain, this domain is shared between all apps and services. Hence, every service can use the models to type the config fields.

#### Example

The example below shows how to use the models to type the config fields. The `BackendConfig` class is used to type the config fields. The `app` const is typed due to the infer option set to true.

```typescript
import { BackendConfig } from 'common-backend-interfaces';
...

function main() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<BackendConfig>);

	const app = configService.get('app', { infer: true });

    console.log(`Server is running on port ${app.port}`);
}
```
