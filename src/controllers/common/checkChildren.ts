import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { CommonChild, NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';
import { ErrorSchema } from '@/validators';

const checkChildren = async (
  parentTag: NomenclatureTag,
  children: CommonChild[],
  id: string,
): Promise<ErrorSchema | null> => {
  for (const child of children) {
    const { model, tag, parentIdField } = child;

    const existingChildren = await db
      .select()
      .from(model)
      .where(eq(model[parentIdField as keyof typeof model.$inferSelect], id));

    if (existingChildren.length) {
      return badRequestResponse({
        reason: 'conflict',
        message: `Cannot delete item with id ${id} from ${parentTag} because it has children of type ${tag}. Please delete all the children first or assign to them another parent id.`,
        path: [parentTag, tag],
      });
    }
  }

  return null;
};

export default checkChildren;
