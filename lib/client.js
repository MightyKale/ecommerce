import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// do once per project
export const client = sanityClient({
    projectId: 'mnizhbk1',
    dataset: 'production',
    apiVersion: '2023-07-11',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);