<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';

	import { formSchema } from '$lib/types/formSchema';
	import type Item from '$lib/types/item';
	import type WarningMessage from '$lib/types/warningMessage';

	export let wishlist: Item[];

	let item = {} as Item;
	let warning: WarningMessage;

	function addItem() {
		warning = {} as WarningMessage;

		const result = formSchema.safeParse(item);
		if (result.success) {
			wishlist = [...wishlist, result.data];
		} else {
			result.error.errors.forEach((error) => {
				const path = error.path[0];
				warning[path as keyof WarningMessage] = error.message;
			});
		}
	}
</script>

<Card.Root class="w-full max-w-xl">
	<Card.Header>
		<Card.Title>Add Item</Card.Title>
		<Card.Description>Add an item to the wishlist</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="w-full flex flex-col gap-8 items-center">
			<div class="flex w-full max-w-xl flex-col gap-1.5">
				<Label for="title">Title</Label>
				<Input id="title" placeholder="Title" maxlength={256} bind:value={item.title} />
				<div class="flex justify-between">
					<p class="text-destructive text-sm">{warning?.title || ''}</p>
					<p class="text-muted-foreground text-sm text-right">
						{item?.title?.length || 0} / 256 characters
					</p>
				</div>
			</div>
			<div class="flex w-full max-w-xl flex-col gap-1.5">
				<Label for="link">Link</Label>
				<Input id="link" placeholder="Link" bind:value={item.link} />
				<p class="text-destructive text-sm">{warning?.link || ''}</p>
			</div>
			<div class="flex w-full max-w-xl flex-col gap-1.5">
				<Label for="price">Price ($)</Label>
				<Input id="price" type="number" placeholder="Price" bind:value={item.price} />
				<p class="text-destructive text-sm">{warning?.price || ''}</p>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-end">
		<Button on:click={addItem}>Add</Button>
	</Card.Footer>
</Card.Root>
