import z from 'zod'

export const issueDateSchema = z.coerce.date({ message: 'data inválida', required_error: 'data inválida', invalid_type_error: 'data inválida' })
