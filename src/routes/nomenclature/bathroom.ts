import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteNomenclatureHandler,
  postCreateNomenclatureHandler,
  postListNomenclatureHandler,
  putUpdateNomenclatureHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { bathroom, unit } from '@/models/schema';
import { NomenclatureTag } from '@/types';

import deleteNomenclature from './deleteNomenclature';
import postCreateNomenclature from './postCreateNomenclature';
import postListNomenclature from './postListNomenclature';
import putUpdateNomenclature from './putUpdateNomenclature';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  postListNomenclature(NomenclatureTag.Bathroom),
  postListNomenclatureHandler(bathroom),
);

app.openapi(
  postCreateNomenclature(NomenclatureTag.Bathroom),
  postCreateNomenclatureHandler(bathroom),
);

app.openapi(
  putUpdateNomenclature(NomenclatureTag.Bathroom),
  putUpdateNomenclatureHandler(bathroom),
);

app.openapi(
  deleteNomenclature(NomenclatureTag.Bathroom),
  deleteNomenclatureHandler(bathroom, NomenclatureTag.Bathroom, [
    {
      model: unit,
      tag: NomenclatureTag.Unit,
      parentIdField: 'bathroomId',
    },
  ]),
);

export default app;
