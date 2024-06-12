import { CasePriority, CaseType } from '@prisma/client';
/**
 * Data structure for the case form
 */
export interface CaseFormData {
    selectFacility: string;
    title: string;
    dueDate: Date;
    selectPriority: CasePriority;
    selectType: CaseType;
    phone: string;
    email: string;
    text: string;
}
