import { tasks } from '@/constants';
import { checkPublished } from '@/controllers';
import { preparedFeaturesByProperty } from '@/models/preparedStatements';
import { messagePublisher } from '@/services';

const publishFeatureToProperty = async (propertyId: string) => {
  if (
    process.env.BUN_ENV &&
    ['test', 'postman'].includes(process.env.BUN_ENV)
  ) {
    return;
  }

  const features = await preparedFeaturesByProperty.execute({ propertyId });

  const publishedUnit = await checkPublished(propertyId);

  if (!publishedUnit || publishedUnit.length === 0) {
    return;
  }

  await messagePublisher({
    type: tasks.feature.update,
    payload: {
      features: features.map((f) => f.feature.name),
      unitIds: publishedUnit.map((u) => u.id),
    },
  });
};

export default publishFeatureToProperty;
