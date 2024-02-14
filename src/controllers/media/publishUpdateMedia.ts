import { CommonSelectItemSchemaType, CommonUpdateItemSchema } from '@/types';

const publishUpdateMedia = async (
  id: string,
  newValues: CommonUpdateItemSchema & { updatedAt: Date },
  oldValues: CommonSelectItemSchemaType,
) => {
  console.log(`publish message for updated media with id ${id}`);
  console.log(JSON.stringify(newValues, null, 2));
  console.log(JSON.stringify(oldValues, null, 2));
};

export default publishUpdateMedia;
