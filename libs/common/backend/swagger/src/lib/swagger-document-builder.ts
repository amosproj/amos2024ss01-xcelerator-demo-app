import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_TAG_INFORMATION } from './const/swagger-tag-information.const';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../../../../package.json');
import { SwaggerUI } from './swagger-ui.class';

export class SwaggerDocumentBuilder {
	constructor(
		private readonly _app: INestApplication,
		private readonly _swaggerOptions: { urlPath: string },
		private readonly _apiUrl: string,
		private readonly _logger: Logger = new Logger('Swagger'),
	) {}

	private _buildConfig() {
		const docBuilder = new DocumentBuilder()
			.setTitle('Siemens Xcelerator UI API')
			.setDescription('This is the API documentation for the Siemens Xcelerator UI')
			.setVersion(version)
			.addBasicAuth()
			.addBearerAuth(
				{
					bearerFormat: 'Bearer',
					scheme: 'Bearer',
					type: 'http',
					in: 'Header',
				},
				'JWTAuthorization',
			);

		Object.entries(SWAGGER_TAG_INFORMATION).forEach(([tag, tagInformation]) => {
			docBuilder.addTag(tag, tagInformation.description);
		});

		return docBuilder.build();
	}

	private _createDocument() {
		const config = this._buildConfig();
		return SwaggerModule.createDocument(this._app, config);
	}

	setupSwagger() {
		const document = this._createDocument();
		const swaggerUI = new SwaggerUI(this._swaggerOptions.urlPath);
		SwaggerModule.setup(
			this._swaggerOptions.urlPath,
			this._app,
			document,
			swaggerUI.customOptions,
		);

		this._logger.log(`Swagger UI is available at ${this._apiUrl}/swagger`);
	}
}
