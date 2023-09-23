import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

export const addPostSchema = z.object({
  title: z.string().transform(value => sanitizeHtml(value)),
  name: z.string().transform(value => sanitizeHtml(value)),
  content: z.string().transform(value => sanitizeHtml(value)),
  filePath: z.string().optional(),
  fileOriginalName: z.string().optional(),
});



export type AddPostSchema = z.infer<typeof addPostSchema>;

