import { z } from 'zod'

export const petTypeSchema = z.enum(['CACHORRO', 'GATO', 'PASSARO', 'ROEDOR', 'REPTIL', 'PEIXE'])