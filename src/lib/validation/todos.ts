// Library for validating
import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().trim().max(2055, 'Description is too long').nullable(),
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().trim().max(2055, 'Description is too long').nullable(),
  orderIndex: z.number().int().nonnegative().nullable(),
  priority: z.number().int().min(1).max(5).nullable(),
  dueAt: z.date().nullable(),
  completedAt: z.date().nullable(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
