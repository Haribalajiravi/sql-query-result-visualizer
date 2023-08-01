import { faker } from '@faker-js/faker';

/**
 * Generates SQL mock results based on given length
 *
 * @param length no. of results
 * @returns generated mock result
 */
export const getMockUserData = (length: number) =>
  Array.from({ length }, () => ({
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  }));
