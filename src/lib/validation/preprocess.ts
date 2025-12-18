import { z } from 'zod';

export const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

export const numberFromForm = (opts: { min?: number; max?: number } = {}) =>
  z.preprocess(
    emptyToUndefined,
    z
      .number()
      .int()
      .min(opts.min ?? 0)
      .max(opts.max ?? Number.MAX_SAFE_INTEGER),
  );
  
export const dateFromForm = z.preprocess(emptyToUndefined, z.coerce.date());

