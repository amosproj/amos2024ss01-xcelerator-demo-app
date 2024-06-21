import { EPumpStatus } from '@frontend/facilities/backend/models';
import { EColorVariant } from 'common-shared-models';

export const StatusToColorRecord: Record<EPumpStatus, EColorVariant> = {
	[EPumpStatus.REGULAR]: EColorVariant.SUCCESS,
	[EPumpStatus.SUSPICIOUS]: EColorVariant.WARNING,
	[EPumpStatus.FAULTY]: EColorVariant.CRITICAL,
};
