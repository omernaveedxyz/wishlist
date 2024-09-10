<script lang="ts">
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';

	import type Item from '$lib/types/item';

	export let wishlist: Item[];
	export let index: number;

	let openDialog = false;

	function toggleDeleteDialog(open: boolean) {
		openDialog = open;
	}

	function deleteItem() {
		wishlist = [...wishlist.slice(0, index), ...wishlist.slice(index + 1)];
		openDialog = false;
	}
</script>

<Dialog.Root
	closeOnOutsideClick={false}
	open={openDialog}
	onOpenChange={(open) => toggleDeleteDialog(open)}
>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost', class: 'hover:text-red-400' })}>
		<Trash2 size={20} />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Delete item</Dialog.Title>
			<Dialog.Description>Are you sure you want to delete this item?</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Title</Label>
				<Input id="name" value={wishlist[index].title} class="col-span-3" disabled />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="link" class="text-right">Link</Label>
				<Input id="link" value={wishlist[index].link} class="col-span-3" disabled />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="price" class="text-right">Price ($)</Label>
				<Input
					type="number"
					id="price"
					value={wishlist[index].price.toFixed(2)}
					class="col-span-3"
					disabled
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={deleteItem}>Delete</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
