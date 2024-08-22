import { base, Faker, ko } from '@faker-js/faker';

export const faker = new Faker({
  locale: [ko, base],
});
