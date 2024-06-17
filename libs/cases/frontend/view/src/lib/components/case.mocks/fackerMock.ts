import { faker } from '@faker-js/faker';

import { PriorityEnum, StatusEnum, TypeEnum } from './case.interface';

function generateCase() {
    return {
        handle: `AA-${faker.datatype.number({ min: 1, max: 999 }).toString().padStart(3, '0')}`,
        dueDate: faker.date.future().toISOString(),
        notifyAssignee: faker.datatype.boolean(),
        title: faker.lorem.words(3),
        type: faker.helpers.arrayElement(Object.values(TypeEnum)),
        status: faker.helpers.arrayElement(Object.values(StatusEnum)),
        assignedTo: faker.name.fullName(),
        description: faker.lorem.sentence(),
        source: 'AHM',
        priority: faker.helpers.arrayElement(Object.values(PriorityEnum)),
        createdBy: faker.internet.email(),
        createdDate: faker.date.recent().getTime(),
        eTag: faker.datatype.uuid(),
        modifiedBy: faker.internet.email(),
        modifiedDate: faker.date.recent().getTime(),
        overdue: faker.datatype.boolean(),
    };
}

function generatePushCard() {
    return {
        //facilityId: 1,
        //icon: 'battery-empty',
        //notification: '99+',
        ...generateCase(),
    };
}

export const cases = Array.from({ length: 10 }, generatePushCard);

