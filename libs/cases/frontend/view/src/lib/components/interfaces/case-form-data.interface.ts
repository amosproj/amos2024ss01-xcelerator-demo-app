import { ECasePriority, ECaseType } from '@frontend/cases/shared/models';

/**
 * Data structure for the case form
 */
export interface CaseFormData {
    selectFacility: string;
    title: string;
    dueDate: Date;
    selectPriority: ECasePriority;
    selectType: ECaseType;
    phone: string;
    email: string;
    text: string;
}
