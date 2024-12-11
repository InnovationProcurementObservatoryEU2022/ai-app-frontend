<script>
	// @ts-nocheck

	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { EyeOutline } from 'flowbite-svelte-icons';
	import { Label, Select } from 'flowbite-svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	/**
	 * @type {any}
	 */

	export let data;

	let selectedConfusionEntry = 'TruePositive';

	let confusionEntries = [
		{ value: 'TruePositive', name: 'True Positive' },
		{ value: 'TrueNegative', name: 'True Negative' },
		{ value: 'FalsePositive', name: 'False Positive' },
		{ value: 'FalseNegative', name: 'False Negative' },
		{ value: 'UnlabeledPositive', name: 'Unlabeled Positive' },
		{ value: 'UnlabeledNegative', name: 'Unlabeled Negative' }
	];

	/**
	 * @type {{ value: any; name: any; }[]}
	 */
	let truePositives = [];
	data.country_details.Details.TruePositive.forEach((/** @type {any} */ tenderID) => {
		truePositives.push({ value: tenderID, name: tenderID });
	});
	let trueNegatives = [];
	data.country_details.Details.TrueNegative.forEach((/** @type {any} */ tenderID) => {
		trueNegatives.push({ value: tenderID, name: tenderID });
	});
	let falsePositives = [];
	data.country_details.Details.FalsePositive.forEach((/** @type {any} */ tenderID) => {
		falsePositives.push({ value: tenderID, name: tenderID });
	});
	let falseNegatives = [];
	data.country_details.Details.FalseNegative.forEach((/** @type {any} */ tenderID) => {
		falseNegatives.push({ value: tenderID, name: tenderID });
	});
	let unlabeledPositives = [];
	data.country_details.Details.UnlabeledPositive.forEach((/** @type {any} */ tenderID) => {
		unlabeledPositives.push({ value: tenderID, name: tenderID });
	});
	let unlabeledNegatives = [];
	data.country_details.Details.UnlabeledNegative.forEach((/** @type {any} */ tenderID) => {
		unlabeledNegatives.push({ value: tenderID, name: tenderID });
	});

	let selectedTenderID;
	if (data.tender_id === undefined) {
		console.log('not set');
	} else {
		console.log('set');
		selectedTenderID = data.tender_id;
		let confusionArrays = [
			truePositives,
			trueNegatives,
			falsePositives,
			falseNegatives,
			unlabeledPositives,
			unlabeledNegatives
		];
		let confusionNames = [
			'TruePositive',
			'TrueNegative',
			'FalsePositive',
			'FalseNegative',
			'UnlabeledPositive',
			'UnlabeledNegative'
		];
		let foundItem = false;
		for (let cIndex = 0; cIndex < confusionArrays.length; cIndex++) {
			const confusionArray = confusionArrays[cIndex];
			const confusionName = confusionNames[cIndex];
			for (let index = 0; index < confusionArray.length; index++) {
				const element = confusionArray[index];
				if (element['value'] === selectedTenderID) {
					selectedConfusionEntry = confusionName;
					foundItem = true;
					break;
				}
			}
			if (foundItem) break;
		}
	}

	let selectedTenderIDs = {
		TruePositive: truePositives,
		TrueNegative: trueNegatives,
		FalsePositive: falsePositives,
		FalseNegative: falseNegatives,
		UnlabeledPositive: unlabeledPositives,
		UnlabeledNegative: unlabeledNegatives
	};

	const viewTender = () => {
		if (selectedConfusionEntry && selectedTenderID) {
			window.location.href = `/home/${data.country}/${selectedTenderID}`;
		} else {
			alert('Please select a valid tender ID');
		}
	};
</script>

<Tabs>
	<a href="/home/{data.country}">
		<TabItem open title="Local Explanation">
			<div class="countryDetails">
				<div class="intro">
					<img
						class="documentsImage"
						src="https://cdn-icons-png.flaticon.com/128/1037/1037308.png"
						alt="Documents Icon"
					/>
					<h2 class="tenderChoiceExplanation">
						Please choose a tender ID from the following categories based on annotation - model
						prediction matching: <br />
						True Positive - the annotation and prediction are "Innovative" <br />
						True Negative - the annotation and prediction are "Non-Innovative" <br />
						False Positive - the annotation is "Non-Innovative" and the prediction is "Innovative"
						<br /> False Negative - the annotation is "Innovative" and the prediction is "Non-Innovative"
					</h2>
				</div>
				<div class="selections">
					<div class="confusionSelection">
						<Label>
							Select a confusion matrix entry
							<Select class="mt-2" items={confusionEntries} bind:value={selectedConfusionEntry} />
						</Label>
					</div>
				</div>

				<div class="virtualList">
					<Label>Select a tender ID</Label>
					<VirtualList height="500px" items={selectedTenderIDs[selectedConfusionEntry]} let:item>
						<a
							class="innerVirtualList"
							target="_blank"
							rel="noreferrer"
							href="/home/{data.country}/{item.name}"
						>
							<div class="tenderChoiceDiv">
								{selectedTenderIDs[selectedConfusionEntry].indexOf(item) + 1}: {item.name}
							</div>
						</a>
					</VirtualList>
				</div>
			</div>
			<slot />
		</TabItem>
	</a>

	<a href="/home/{data.country}/global">
		<TabItem title="Global Explanation" />
	</a>
</Tabs>

<style>
	.virtualList {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20px;
		padding: 20px;
	}

	.tenderChoiceDiv {
		display: flex;
		flex-direction: row;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
		justify-content: center;
		align-items: center;
		padding: 2px;
		margin: 2px;
		width: 200px;
		height: 50px;
	}

	.countryDetails {
		margin: 20px;
		background-color: white;
		padding: 50px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
	}

	.selections {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		margin-top: 20px;
	}

	.intro {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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

	.confusionSelection {
		flex: 2;
	}

	.tenderSelection {
		flex: 2;
		padding-left: 20px;
	}

	.viewButton {
		flex: 1;
		padding-left: 20px;
	}
</style>
