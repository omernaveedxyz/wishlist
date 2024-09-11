<script lang="ts">
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';

	import type Item from '$lib/types/item';
	import EditItemDialog from './EditItemDialog.svelte';
	import DeleteItemDialog from './DeleteItemDialog.svelte';

	export let wishlist: Item[];

	$: totalCost = wishlist
		.reduce((accumulator, current) => accumulator + current.price, 0)
		.toFixed(2);
</script>

<div class="w-full max-w-4xl">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[75%]">Title</Table.Head>
				<Table.Head class="w-[5%] text-center">Link</Table.Head>
				<Table.Head class="w-[20%] text-right">Price ($)</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each wishlist as item, index}
				{@const price = item.price.toFixed(2)}

				<Table.Row>
					<Table.Cell class="break-all">{item.title}</Table.Cell>
					<Table.Cell>
						<Button variant="ghost" class="hover:text-sky-700">
							<a href={item.link} target="_blank">
								<ExternalLink size={20} class="hover:text-sky-700" />
							</a>
						</Button>
					</Table.Cell>
					<Table.Cell class="text-right">{price}</Table.Cell>
					<Table.Cell>
						<EditItemDialog bind:wishlist {index} />
						<DeleteItemDialog bind:wishlist {index} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Caption>Total Cost: ${totalCost}</Table.Caption>
	</Table.Root>
</div>
