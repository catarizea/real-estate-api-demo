import { z } from '@hono/zod-openapi';

const key = process.env.PEXELS_API_KEY;

type Args = {
  query: string;
  perPage: number;
  page: number;
};

const PexelImageSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  src: z.object({
    original: z.string(),
    large2x: z.string(),
    large: z.string(),
    medium: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string(),
  }),
});

type PexelResponseImage = z.infer<typeof PexelResponseSchema>;

type PexelResponse = {
  error?: string;
  photos: PexelResponseImage[];
};

const PexelResponseSchema = z.array(PexelImageSchema);

const getPexelsImages = async ({
  query,
  perPage,
  page,
}: Args): Promise<string[] | null> => {
  if (!key) {
    return null;
  }

  try {
    const data = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&size=small&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: key,
        },
      },
    );

    if (!data.ok) {
      return null;
    }

    const resp = (await data.json()) as PexelResponse;

    if (resp.error || !resp.photos) {
      return null;
    }

    const valid = PexelResponseSchema.safeParse(resp.photos);

    if (!valid.success) {
      return null;
    }

    return valid.data.map((p) => {
      const matches = p.src.original.match(/\/[0-9]+\//gi);

      if (!matches || !matches.length) {
        throw new Error('Invalid image url');
      }

      return matches[0].replace(/\//gi, '');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

export default getPexelsImages;
