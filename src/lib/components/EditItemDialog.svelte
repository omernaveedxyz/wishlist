<script lang="ts">
	import Pencil from 'lucide-svelte/icons/pencil';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';

	import { formSchema } from '$lib/types/formSchema';
	import type Item from '$lib/types/item';
	import type WarningMessage from '$lib/types/warningMessage';

	export let wishlist: Item[];
	export let index: number;

	let openDialog = false;
	let item: Item;
	let warning: WarningMessage;

	function toggleEditDialog(open: boolean) {
		if (open) {
			item = { ...wishlist[index] };
			openDialog = true;
		} else {
			warning = {} as WarningMessage;
			openDialog = false;
		}
	}

	function updateItem() {
		warning = {} as WarningMessage;

		const result = formSchema.safeParse(item);
		if (result.success) {
			wishlist[index] = result.data;
			openDialog = false;
		} else {
			result.error.errors.forEach((error) => {
				const path = error.path[0];
				warning[path as keyof WarningMessage] = error.message;
			});
		}
	}
</script>

<Dialog.Root
	closeOnOutsideClick={false}
	open={openDialog}
	onOpenChange={(open) => toggleEditDialog(open)}
>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost', class: 'hover:text-green-600' })}>
		<Pencil size={20} />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Edit item</Dialog.Title>
			<Dialog.Description>
				Make changes to your item here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Title</Label>
				<Input id="name" bind:value={item.title} class="col-span-3" />
				<div class="flex justify-between col-span-4">
					<p class="text-destructive text-sm">{warning?.title || ''}</p>
					<p class="text-muted-foreground text-sm text-right">
						{item?.title?.length || 0} / 256 characters
					</p>
				</div>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="link" class="text-right">Link</Label>
				<Input id="link" bind:value={item.link} class="col-span-3" />
				<p class="text-destructive text-sm col-start-2 col-span-3">
					{warning?.link || ''}
				</p>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="price" class="text-right">Price ($)</Label>
				<Input type="number" id="price" bind:value={item.price} class="col-span-3" />
				<p class="text-destructive text-sm col-start-2 col-span-3">
					{warning?.price || ''}
				</p>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={updateItem}>Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
