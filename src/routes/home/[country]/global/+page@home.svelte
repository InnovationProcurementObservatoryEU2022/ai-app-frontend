<script>
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { Tabs, TabItem, Spinner } from 'flowbite-svelte';
	import { SpeedDial, SpeedDialButton, Card } from 'flowbite-svelte';
	import { ArrowsRepeatOutline, CheckSolid } from 'flowbite-svelte-icons';

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox
	} from 'flowbite-svelte';
	import { Drawer, CloseButton } from 'flowbite-svelte';
	import { InfoCircleSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';
	import { PUBLIC_API_IP } from '$env/static/public';
	let hidden1 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	export let data;
	/**
	 * @type {any[]}
	 */
	let tenderAppears = [];

	/**
	 * @param {any} word
	 */
	function showTenderAppears(word) {
		tenderAppears = word[2];
		hidden1 = false;
	}

	let isLoading = false;
	/**
	 * @type {string[]}
	 */
	let stopWords = [];
	/**
	 * @type {any[]}
	 */
	let deletedWords = [];
	async function printCheckedCheckboxes() {
		stopWords = [];
		deletedWords = [];
		console.log('MIU');
		var checked = document.querySelectorAll('.select-checkbox:checked');
		var deletedChecked = document.querySelectorAll('.delete-checkbox:checked');

		checked.forEach((elem) => {
			// @ts-ignore
			stopWords.push(elem.value);
		});
		deletedChecked.forEach((elem) => {
			// @ts-ignore
			deletedWords.push(elem.value);
		});
		console.log(stopWords);
		console.log(deletedWords);
		isLoading = true;
		const processingTraining = await (async () => {
			const response = await fetch(`${PUBLIC_API_IP}/dgcnect/retrain_country/${data.country}`, {
				method: 'POST',
				body: JSON.stringify({
					StopWords: stopWords,
					ReEnabledWords: deletedWords
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
		window.location.href = `/home/${data.country}/global`;
	}
</script>

<Tabs>
	<a href="/home/{data.country}">
		<TabItem title="Local Explanation" />
	</a>

	<a href="/home/{data.country}/global">
		<TabItem open title="Global Explanation">
			<div class="intro">
				<img
					class="documentsImage"
					src="https://cdn-icons-png.flaticon.com/128/587/587874.png"
					alt="Globe Icon"
				/>
				<h2 class="tenderChoiceExplanation">
					This is a global token importance list for the currently trained model <br />
					You can disable unwanted tokens by selecting "DELETE" and retraining the model
				</h2>
			</div>
			<div class="deletedWords">
				<h2 class="tenderChoiceExplanation">
					This list contains previously deleted words. You can re-enable them by selecting the
					checkmark next to the word and retraining the model
				</h2>
				<br />
				<div class="deletedWordList">
					{#each data.global_details.DeletedWords as deletedWord}
						<div class="deletedWord">
							<h2 style="margin-right: 5px;">{deletedWord}</h2>
							<Checkbox class="delete-checkbox" value={deletedWord} />
						</div>
					{/each}
				</div>
			</div>
			<div class="tables">
				<div class="topTable">
					<h1>Positive Tokens</h1>
					<Table hoverable={true}>
						<TableHead class="bg-red-300">
							<TableBodyCell>Token</TableBodyCell>
							<TableHeadCell>Token Value</TableHeadCell>
							<TableHeadCell>Delete</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each data.global_details.TopWords as topWord}
								<TableBodyRow>
									<TableBodyCell
										><Button color="light" on:click={() => showTenderAppears(topWord)}
											>{topWord[0]}</Button
										></TableBodyCell
									>
									<TableBodyCell>{topWord[1]}</TableBodyCell>
									<TableBodyCell>
										<Checkbox class="select-checkbox" value={topWord[0]} />
									</TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</div>

				<div class="bottomTable">
					<h1>Negative Tokens</h1>
					<Table hoverable={true}>
						<TableHead class="bg-blue-300">
							<TableBodyCell>Token</TableBodyCell>
							<TableHeadCell>Token Value</TableHeadCell>
							<TableHeadCell>Delete</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each data.global_details.BottomWords as botWord}
								<TableBodyRow>
									<TableBodyCell
										><Button color="light" on:click={() => showTenderAppears(botWord)}
											>{botWord[0]}</Button
										></TableBodyCell
									>
									<TableBodyCell>{botWord[1]}</TableBodyCell>
									<TableBodyCell>
										<Checkbox class="select-checkbox" value={botWord[0]} />
									</TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</div>
		</TabItem>
	</a>
</Tabs>

<div class="speedDial">
	<SpeedDial color="blue" defaultClass="fixed right-8 bottom-8" pill={true}>
		<ArrowsRepeatOutline slot="icon" class="w-8 h-8 text-white" />
		Rerun Training
		<SpeedDialButton name="Rerun" class="bg-green-500" on:click={printCheckedCheckboxes}>
			<CheckSolid class="w-5 h-5 text-white" />
		</SpeedDialButton>
	</SpeedDial>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
	<div class="flex items-center">
		<CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
	</div>
	<p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
		This token appeared in the following tenders:
	</p>
	<div class="grid grid-cols-2 gap-4">
		{#each tenderAppears as tenderAppear}
			<Button color="light" href="/home/{data.country}/{tenderAppear}">{tenderAppear}</Button>
		{/each}
	</div>
</Drawer>

{#if isLoading}
	<div class="spinnerBackground">
		<Spinner class="w-24 h-24" />
		<p class="spinnerText">Training the model, this may take a few minutes...</p>
	</div>
{/if}

<style>
	.tables {
		display: flex;
		flex-direction: row;
		z-index: -1;
	}

	.speedDial {
		z-index: 10;
	}

	.intro {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 20px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
		margin: 10px;
		color: black;
	}
	.documentsImage {
		height: 8vw;
		width: auto;
	}
	.tenderChoiceExplanation {
		font-size: 16px;
		color: grey;
		margin-left: 80px;
	}

	.deletedWords {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		flex-wrap: wrap;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
		margin: 10px;
	}

	.deletedWordList {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.deletedWord {
		display: flex;
		flex-direction: row;
		box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
		border-radius: 10px;
		padding: 8px;
		margin-right: 5px;
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

	.topTable {
		width: 50%;
		padding: 20px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
		margin: 10px;
	}

	.bottomTable {
		width: 50%;
		padding: 20px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
		margin: 10px;
	}

	h1 {
		color: grey;
		font-size: 22px;
		text-align: center;
		padding-bottom: 20px;
	}
</style>
