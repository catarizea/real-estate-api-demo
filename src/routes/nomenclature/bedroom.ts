import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteNomenclatureHandler,
  postCreateNomenclatureHandler,
  postListNomenclatureHandler,
  putUpdateNomenclatureHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { bedroom } from '@/models/schema';
import { NomenclatureTag } from '@/types';

import deleteNomenclature from './deleteNomenclature';
import postCreateNomenclature from './postCreateNomenclature';
import postListNomenclature from './postListNomenclature';
import putUpdateNomenclature from './putUpdateNomenclature';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  postListNomenclature(NomenclatureTag.Bedroom),
  postListNomenclatureHandler(bedroom),
);

app.openapi(
  postCreateNomenclature(NomenclatureTag.Bedroom),
  postCreateNomenclatureHandler(bedroom),
);

app.openapi(
  putUpdateNomenclature(NomenclatureTag.Bedroom),
  putUpdateNomenclatureHandler(bedroom),
);

app.openapi(
  deleteNomenclature(NomenclatureTag.Bedroom),
  deleteNomenclatureHandler(bedroom),
);

export default app;
