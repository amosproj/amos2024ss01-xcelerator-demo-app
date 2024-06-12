import { InjectionToken } from '@angular/core';

import { IAppEnvironment } from '../interfaces';

export const APP_CONFIG = new InjectionToken<IAppEnvironment>('@xd/common/frontend/environment');
