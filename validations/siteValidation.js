const { z } = require('zod');

const siteSchema = z.object({
  body: z.object({
    siteName: z.string().min(2).max(50),
    siteType: z.enum(['MONUMENT', 'MUSEUM', 'HOLYPLACE', 'ARTGALLERY']),
    siteDescription: z.string().optional().default(''),
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
    zip: z.string().optional().default(''),
    zone: z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL']),
    phoneno: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email'),
    adult: z.coerce.number().min(0, 'Adult price must be non-negative'),
    children: z.coerce.number().min(0, 'Children price must be non-negative'),
    foreigner: z.coerce.number().min(0, 'Foreigner price must be non-negative'),
    open: z.string().min(1, 'Opening time is required'),
    close: z.string().min(1, 'Closing time is required'),
    Availability: z.enum(['YES', 'NO']),
    Bestseasonvisit: z.string().min(1, 'Best season is required'),
    image: z.string().optional().default(''),
    _id: z.string(),
    name: z.string(),
    emailuser: z.string().email(),
  }),
});

module.exports = {
  siteSchema,
};
