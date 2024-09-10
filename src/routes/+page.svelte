<script lang="ts">
	import '../app.css';
	import AddItemCard from '$lib/components/AddItemCard.svelte';
	import ToogleLightDarkModeButton from '$lib/components/ToogleLightDarkModeButton.svelte';
	import WishlistTable from '$lib/components/WishlistTable.svelte';

	import type Item from '$lib/types/item';

	let wishlist: Item[] = JSON.parse(window.localStorage.getItem('wishlist') || '[]');

	$: window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
</script>

<ToogleLightDarkModeButton />
<div class="m-2 flex flex-col items-center gap-8">
	<h1 class="text-6xl font-bold">Wishlist</h1>
	<AddItemCard bind:wishlist />
	<WishlistTable bind:wishlist />
</div>
