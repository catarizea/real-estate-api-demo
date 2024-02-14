import { CommonSelectItemSchemaType } from '@/types';

const publishDeleteMedia = async (
  id: string,
  oldValues: CommonSelectItemSchemaType,
) => {
  console.log(`publish message for deleted media with id ${id}`);
  console.log(JSON.stringify(oldValues, null, 2));
};

export default publishDeleteMedia;
