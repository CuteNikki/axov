'use server';

// Libraries
import { revalidatePath } from 'next/cache';
// Database
import prisma from '@/lib/prisma';
// Validation
import { createTodoSchema, UpdateTodoInput, updateTodoSchema } from '@/lib/validation/todos';

export async function getTodos() {
  return prisma.todo.findMany({
    orderBy: { orderIndex: 'asc' },
  });
}

export async function createTodo(formData: FormData) {
  const parsed = createTodoSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    orderIndex: formData.get('orderIndex'),
    priority: formData.get('priority'),
    dueAt: formData.get('dueAt'),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.todo.create({
    data: parsed.data,
  });
  revalidatePath('/');
  return { success: true };
}

export type UpdateTodoResult = { success: true } | { success: false; errors: Record<string, string[]> };

export async function updateTodo(id: number, values: UpdateTodoInput): Promise<UpdateTodoResult> {
  const parsed = updateTodoSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.todo.update({
    where: { id },
    data: parsed.data,
  });

  await prisma.todo.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePath('/todos');
  return { success: true };
}
