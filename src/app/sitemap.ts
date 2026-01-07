import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://ahad-devsite.netlify.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        // Add other routes here if you have multiple pages, e.g.:
        // {
        //   url: 'https://ahad-devsite.netlify.app/about',
        //   lastModified: new Date(),
        //   changeFrequency: 'monthly',
        //   priority: 0.8,
        // },
    ];
}
