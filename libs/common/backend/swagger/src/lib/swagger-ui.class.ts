import { SwaggerCustomOptions } from '@nestjs/swagger/dist/interfaces';

export class SwaggerUI {
	constructor(private readonly applicationUrl: string) {}

	private customSiteTitle = 'Swagger UI - Siemens Xcelerator UI API';
	private siemensIcon =
		'https://cdn.icon-icons.com/icons2/2699/PNG/512/siemens_logo_icon_170741.png';
	private customCss = `
  .topbar-wrapper { content:url('${this.siemensIcon}'); inline-size:4rem; height:auto; }
  .topbar-wrapper svg { visibility: hidden; }`;

	private swaggerOptions = {
		persistAuthorization: true,
	};

	public customOptions: SwaggerCustomOptions = {
		customfavIcon: 'https://www.siemens.com/favicon.ico',
		customSiteTitle: this.customSiteTitle,
		customCss: this.customCss,
		swaggerOptions: this.swaggerOptions,
		useGlobalPrefix: true,
	};
}
