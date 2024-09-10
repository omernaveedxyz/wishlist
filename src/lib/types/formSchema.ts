import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(1).max(256),
	link: z.string().url(),
	price: z.coerce.number().nonnegative().finite()
});
