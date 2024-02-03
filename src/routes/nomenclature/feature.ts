import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteNomenclatureHandler,
  postCreateNomenclatureHandler,
  postListNomenclatureHandler,
  putUpdateNomenclatureHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { feature } from '@/models/schema';
import { NomenclatureTag } from '@/types';

import deleteNomenclature from './deleteNomenclature';
import postCreateNomenclature from './postCreateNomenclature';
import postListNomenclature from './postListNomenclature';
import putUpdateNomenclature from './putUpdateNomenclature';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  postListNomenclature(NomenclatureTag.Feature),
  postListNomenclatureHandler(feature),
);

app.openapi(
  postCreateNomenclature(NomenclatureTag.Feature),
  postCreateNomenclatureHandler(feature),
);

app.openapi(
  putUpdateNomenclature(NomenclatureTag.Feature),
  putUpdateNomenclatureHandler(feature),
);

app.openapi(
  deleteNomenclature(NomenclatureTag.Feature),
  deleteNomenclatureHandler(feature),
);

export default app;
