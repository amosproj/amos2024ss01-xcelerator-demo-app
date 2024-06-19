import { IsDefined, IsString } from 'class-validator';

import { ISwagger } from '../interfaces/swagger.interface';

/**
 * The class for environmental variables of the Swagger UI
 */
export class Swagger implements ISwagger {
    /**
     * @inheritdoc
     */
    @IsDefined()
    @IsString()
    urlPath: string;
}
