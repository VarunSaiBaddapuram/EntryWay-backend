const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.coerce.number({ invalid_type_error: 'Phone must be a number' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    cpassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
    role: z.enum(['user', 'admin'], {
      errorMap: () => ({ message: "Role must be 'user' or 'admin'" }),
    }),
  }).refine((data) => data.password === data.cpassword, {
    message: 'Passwords do not match',
    path: ['cpassword'],
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
