import { checkPublished } from '@/controllers';
import { preparedParkingByProperty } from '@/models/preparedStatements';
import { messagePublisher } from '@/services';

const sendPublishParking = async (
  propertyId: string,
  task: string,
): Promise<void> => {
  const parkings = await preparedParkingByProperty.execute({ propertyId });

  const publishedUnit = await checkPublished(propertyId);

  if (!publishedUnit || publishedUnit.length === 0) {
    return;
  }

  messagePublisher({
    type: task,
    payload: {
      parking: parkings.map((p) => p.name),
      unitIds: publishedUnit.map((u) => u.id),
    },
  });
};

export default sendPublishParking;
