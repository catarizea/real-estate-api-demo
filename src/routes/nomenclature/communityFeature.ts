import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteNomenclatureHandler,
  postCreateNomenclatureHandler,
  postListNomenclatureHandler,
  putUpdateNomenclatureHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { communityFeature } from '@/models/schema';
import { NomenclatureTag } from '@/types';

import deleteNomenclature from './deleteNomenclature';
import postCreateNomenclature from './postCreateNomenclature';
import postListNomenclature from './postListNomenclature';
import putUpdateNomenclature from './putUpdateNomenclature';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  postListNomenclature(NomenclatureTag.CommunityFeature),
  postListNomenclatureHandler(communityFeature),
);

app.openapi(
  postCreateNomenclature(NomenclatureTag.CommunityFeature),
  postCreateNomenclatureHandler(communityFeature),
);

app.openapi(
  putUpdateNomenclature(NomenclatureTag.CommunityFeature),
  putUpdateNomenclatureHandler(communityFeature),
);

app.openapi(
  deleteNomenclature(NomenclatureTag.CommunityFeature),
  deleteNomenclatureHandler(communityFeature),
);

export default app;
