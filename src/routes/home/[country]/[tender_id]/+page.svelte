<script>
	import { SpeedDial, SpeedDialButton, Card, Button, Spinner } from 'flowbite-svelte';
	import {
		ArrowsRepeatOutline,
		CheckSolid,
		MinusSolid,
		LightbulbSolid
	} from 'flowbite-svelte-icons';

	import { PUBLIC_API_IP } from '$env/static/public';
	console.log(PUBLIC_API_IP)
	export let data;

	let isLoading = false;
	/**
	 * @param {any} annotation
	 */
	async function annotateTender(annotation) {
		isLoading = true;
		const processingTraining = await (async () => {
			const response = await fetch(
				`${PUBLIC_API_IP}/dgcnect/annotate_tender/${data.country}/${data.tender_id}`,
				{
					method: 'POST',
					body: JSON.stringify({
						Annotation: annotation
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Headers': '*'
					}
				}
			);
			return await response.json();
		})();
		isLoading = false;
		window.location.href = `/home/${data.country}/${data.tender_id}`;
	}

	async function retrainCountry() {
		isLoading = true;
		const processingTraining = await (async () => {
			const response = await fetch(`${PUBLIC_API_IP}/dgcnect/retrain_country/${data.country}`, {
				method: 'POST',
				body: JSON.stringify({
					StopWords: []
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*'
				}
			});
			return await response.json();
		})();
		isLoading = false;
	}
</script>

<SpeedDial color="blue" defaultClass="fixed right-8 bottom-8" pill={true}>
	Annotate
	<SpeedDialButton
		on:click={() => {
			annotateTender(1);
		}}
		name="Innovative"
		class="bg-green-500"
	>
		<CheckSolid class="w-5 h-5 text-white" />
	</SpeedDialButton>
	<SpeedDialButton
		on:click={() => {
			annotateTender(0);
		}}
		name="Non-Innovative"
		class="bg-red-500"
	>
		<MinusSolid class="w-5 h-5 text-white" />
	</SpeedDialButton>
	<SpeedDialButton
		on:click={() => {
			retrainCountry();
		}}
		name="Retrain Model"
		class="bg-yellow-300"
	>
		<ArrowsRepeatOutline class="w-5 h-5 text-white" />
	</SpeedDialButton>
</SpeedDial>

<div class="modelLabelPrediction">
	<h2 class="subtitle">Model Prediction</h2>
	<div class="labelPrediction">
		<span class="text-gray-500">Annotation</span>
		{#if data.tender_details.Label == 1}
			<div class="inononDiv">
				<LightbulbSolid class="text-green-500" />
				<span class="text-green-500 text-lg">Innovative</span>
			</div>
		{:else if data.tender_details.Label == 2}
			<div class="inononDiv">
				<LightbulbSolid class="text-grey-500" />
				<span class="text-grey-500 text-lg">Not Labeled</span>
			</div>
		{:else}
			<div class="inononDiv">
				<LightbulbSolid class="text-red-500" />
				<span class="text-red-500 text-lg">Non-Innovative</span>
			</div>
		{/if}
		<span class="text-gray-500">Prediction</span>
		{#if data.tender_details.Prediction == 1}
			<div class="inononDiv">
				<LightbulbSolid class="text-green-500" />
				<span class="text-green-500 text-lg">Innovative</span>
				<span class="text-green-500 text-lg"
					>({Math.round(data.tender_details.PredictionProbability * 100)}%)</span
				>
			</div>
		{:else}
			<div class="inononDiv">
				<LightbulbSolid class="text-red-500" />
				<span class="text-red-500 text-lg">Non-Innovative</span>
				<span class="text-red-500 text-lg"
					>({Math.round(data.tender_details.PredictionProbability * 100)}%)</span
				>
			</div>
		{/if}
	</div>
</div>

<div class="localExplainability">
	<div class="tokenImportance">
		<div class="subtitleRow">
			<h2 class="subtitle">Token Importance</h2>
			<a href={`/home/popout/${data.country}/${data.tender_id}`}><Button>Popout</Button></a>
		</div>

		<p>
			{#each data.tender_details.WordScores as wordScore, index}
				<span
					style="background-color: {wordScore[1] > 0
						? `rgba(255, 0, 0,${Math.min(1, wordScore[1])})`
						: wordScore[1] < 0
						? `rgba(0, 0, 255,${-Math.max(-1, wordScore[1])})`
						: 'rgba(0, 0, 0, 0)'};"
					>{wordScore[0]}
				</span>
			{/each}
		</p>
	</div>

	<div class="tokenPlot">
		<h2 class="subtitle">Token Importance Plot</h2>
		<img src={'data:image/png;base64,' + data.tender_details.Plot} alt="token importance" />
	</div>
</div>

{#if isLoading}
	<div class="spinnerBackground">
		<Spinner class="w-24 h-24" />
		<p class="spinnerText">This may take a while...</p>
	</div>
{/if}

<style>
	.localExplainability {
		display: flex;
		flex-direction: row;
	}

	.subtitleRow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.modelLabelPrediction {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		margin: 20px;
		margin-bottom: 0px;
		padding: 20px;
		padding-top: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
	}

	.labelPrediction {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.inononDiv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 20px;
	}

	.tokenImportance {
		width: 50%;
		height: 60vh;
		margin: 20px;
		overflow-y: scroll;
		background-color: white;
		padding: 50px;
		padding-top: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
	}

	.tokenPlot {
		width: 50%;
		margin: 20px;
		height: 60vh;
		background-color: white;
		padding: 50px;
		padding-top: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
	}

	.subtitle {
		font-size: 24px;
		color: grey;
		text-align: center;
		margin-bottom: 10px;
		flex: 3;
	}

	.spinnerBackground {
		z-index: 100;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		background-color: rgba(255, 255, 255, 0.8);
	}

	.spinnerText {
		font-size: 24px;
		margin-top: 20px;
		color: black;
		text-align: center;
	}
</style>
