import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: z.optional(image()),
            
            // 👇 新增以下欄位，讓 Astro 放行你的 Obsidian 標籤
            category: z.string().optional(),
            tags: z.array(z.string()).or(z.string()).optional(),
            era: z.union([z.string(), z.number()]).optional(),
            region: z.string().optional(),
            // 筆者用於文章歸屬與首頁篩選；舊文章預設為 Sayaka。
            writer: z.enum(['Sayaka', 'Divano']).default('Sayaka'),
            // 編輯只用於署名，不會影響筆者分類；沒有編輯時省略此欄。
            editor: z.enum(['Sayaka', 'Divano']).optional(),
        }),
});

export const collections = { blog };
