'use client';

// Libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// Actions
import { updateTodo } from '@/actions/todos';
// Utils
import { formatDatetimeLocal } from '@/lib/utils';
// Validation
import { updateTodoSchema, type UpdateTodoInput } from '@/lib/validation/todos';
// Components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TodoUpdateFormProps {
  title: string;
  description: string | null;
  orderIndex: number | null;
  priority: number | null;
  dueAt: Date | null;
  completedAt: Date | null;
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export function TodoUpdateForm({ title, description, orderIndex, priority, dueAt, completedAt, id }: TodoUpdateFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: title,
      description: description,
      orderIndex: orderIndex,
      priority: priority,
      dueAt: dueAt,
      completedAt: completedAt,
    },
  });

  const onSubmit = (values: UpdateTodoInput) => {
    startTransition(async () => {
      await updateTodo(id, values);
      form.reset(values);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Title */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Description' {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name='priority'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Priority' {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due date */}
        <FormField
          control={form.control}
          name='dueAt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due date</FormLabel>
              <FormControl>
                <Input
                  type='datetime-local'
                  value={field.value ? formatDatetimeLocal(field.value) : ''}
                  onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Completed */}
        <FormField
          control={form.control}
          name='completedAt'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
              <FormControl>
                <Checkbox checked={!!field.value} onCheckedChange={(checked) => field.onChange(checked ? new Date() : undefined)} />
              </FormControl>
              <FormLabel className='mb-0'>Completed {field.value && `(${formatDatetimeLocal(field.value)})`}</FormLabel>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
