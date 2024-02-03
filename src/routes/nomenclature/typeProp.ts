import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteNomenclatureHandler,
  postCreateNomenclatureHandler,
  postListNomenclatureHandler,
  putUpdateNomenclatureHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { typeProp } from '@/models/schema';
import { NomenclatureTag } from '@/types';

import deleteNomenclature from './deleteNomenclature';
import postCreateNomenclature from './postCreateNomenclature';
import postListNomenclature from './postListNomenclature';
import putUpdateNomenclature from './putUpdateNomenclature';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  postListNomenclature(NomenclatureTag.TypeProp),
  postListNomenclatureHandler(typeProp),
);

app.openapi(
  postCreateNomenclature(NomenclatureTag.TypeProp),
  postCreateNomenclatureHandler(typeProp),
);

app.openapi(
  putUpdateNomenclature(NomenclatureTag.TypeProp),
  putUpdateNomenclatureHandler(typeProp),
);

app.openapi(
  deleteNomenclature(NomenclatureTag.TypeProp),
  deleteNomenclatureHandler(typeProp),
);

export default app;
