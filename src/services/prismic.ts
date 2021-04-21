import Prismic from '@prismicio/client';
const { PRISMIC_ACCESS_TOKEN, PRISMIC_ENDPOINT } = process.env;

export function getPrismicClient(req?: unknown) {
    const prismic = Prismic.client(PRISMIC_ENDPOINT, {
        req,
        accessToken: PRISMIC_ACCESS_TOKEN
    });
    return prismic;
}