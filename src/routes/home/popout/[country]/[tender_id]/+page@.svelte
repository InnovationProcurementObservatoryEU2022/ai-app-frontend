<script>
	export let data;
</script>

<p>
	{#each data.tender_details.WordScores as wordScore, index}
		{wordScore[0] + ' '}
	{/each}
</p>
