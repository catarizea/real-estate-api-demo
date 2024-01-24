import { logger } from '@/services';
import { bathroomsLoad, bedroomsLoad } from '@/utils/db/seed/load';

const prefix = '[DB SEED]';

const fail = (message: string): void => {
  logger.error(`${prefix} ${message}`);
  process.exit(1);
};

const bathroomIds = await bathroomsLoad();

if (!bathroomIds || !bathroomIds.length) {
  fail('loading bathrooms error');
}

logger.info(`${prefix} success bathrooms loaded: ${bathroomIds.length} items`);

const bedroomIds = await bedroomsLoad();

if (!bedroomIds || !bedroomIds.length) {
  fail('loading bedrooms error');
}

logger.info(`${prefix} success bedrooms loaded: ${bedroomIds.length} items`);

logger.info(`${prefix} success db seed`);
process.exit(0);
