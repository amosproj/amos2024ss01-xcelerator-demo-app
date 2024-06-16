import { faker } from '@faker-js/faker';

function generateCase() {
    return {
        handle: `AA-${faker.datatype.number({ min: 1, max: 999 }).toString().padStart(3, '0')}`,
        dueDate: faker.date.future().toISOString(),
        notifyAssignee: faker.datatype.boolean(),
        title: faker.lorem.words(3),
        type: faker.helpers.arrayElement([ 'PLANNED', 'INCIDENT', 'ANNOTATION' ]),
        status: faker.helpers.arrayElement([ 'OPEN', 'INPROGRESS', 'ONHOLD', 'DONE', 'OVERDUE', 'CANCELLED', 'ARCHIVED' ]),
        assignedTo: faker.name.fullName(),
        description: faker.lorem.sentence(),
        source: 'AHM',
        priority: faker.helpers.arrayElement([ 'EMERGENCY', 'MEDIUM', 'HIGH', 'LOW' ]),
        createdBy: faker.internet.email(),
        createdDate: faker.date.recent().toISOString(),
        eTag: faker.datatype.uuid(),
        modifiedBy: faker.internet.email(),
        modifiedDate: faker.date.recent().toISOString(),
        overdue: faker.datatype.boolean(),
    };
}

function generatePushCard() {
    return {
        facilityId: 1,
        icon: 'battery-empty',
        notification: '99+',
        ...generateCase(),
    };
}

export const cases = Array.from({ length: 10 }, generatePushCard);

