<script>
	// @ts-nocheck

	import { Card, Button, Toggle } from 'flowbite-svelte';
	export let data;

	let countryToImageURL = {
		HR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/500px-Flag_of_Croatia.svg.png',
		BE: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/500px-Flag_of_Belgium.svg.png',
		BG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/500px-Flag_of_Bulgaria.svg.png',
		HU: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/500px-Flag_of_Hungary.svg.png',
		PT: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/500px-Flag_of_Portugal.svg.png',
		BG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/500px-Flag_of_Bulgaria.svg.png',
		LV: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/512px-Flag_of_Latvia.svg.png',
		NO: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/500px-Flag_of_Norway.svg.png',
		EL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/500px-Flag_of_Greece.svg.png',
		SK: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/500px-Flag_of_Slovakia.svg.png',
		DK: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/500px-Flag_of_Denmark.svg.png',
		LT: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/500px-Flag_of_Lithuania.svg.png',
		ES: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/500px-Bandera_de_Espa%C3%B1a.svg.png',
		SI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/500px-Flag_of_Slovenia.svg.png',
		CZ: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/500px-Flag_of_the_Czech_Republic.svg.png',
		CY: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/500px-Flag_of_Cyprus.svg.png',
		NL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/500px-Flag_of_the_Netherlands.svg.png',
		SE: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/500px-Flag_of_Sweden.svg.png',
		EE: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/500px-Flag_of_Estonia.svg.png',
		FI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/500px-Flag_of_Finland.svg.png',
		DE: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/500px-Flag_of_Germany.svg.png',
		IE: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/500px-Flag_of_Ireland.svg.png',
		RO: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/512px-Flag_of_Romania.svg.png',
		MT: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/512px-Flag_of_Malta.svg.png',
		PL: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/512px-Flag_of_Poland.svg.png',
		IT: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/512px-Flag_of_Italy.svg.png',
		FR: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/512px-Flag_of_France.svg.png',
		AT: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/512px-Flag_of_Austria.svg.png',
		LU: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/512px-Flag_of_Luxembourg.svg.png',
		UK: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/512px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
		CH: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/512px-Flag_of_Switzerland_%28Pantone%29.svg.png'
	};
</script>

<div class="navigationInfo">
	<div class="introDiv">
		<p class="infoText">
			<img
				src="https://commission.europa.eu/themes/contrib/oe_theme/dist/ec/images/logo/positive/logo-ec--en.svg"
				class="h-24 mr-8"
				alt="EU Commision logo"
			/>DG CNECT - DG for Communications Networks, Content and Technology
		</p>
		<p class="longerIntroText">
			The purpose of the Project is to conduct the second round of benchmarking to measure the
			progress across different countries in Europe on implementing national policy frameworks and
			investments on innovation procurement, across sectors of public interest and across strategic
			expenditure categories, such as ICT. The purpose of the Project is also to collect for the
			second time, not only quantitative but also qualitative, evidence about the implementation
			progress, in a way that enables benchmarking progress in a comparable manner across different
			countries and enables analysing trends compared with the first benchmarking round. The third
			objective of the Project is to provide the data that is collected in a way that it can be
			integrated easily into relevant European official yearly innovation statistics, scoreboards
			and benchmarking exercises across Europe (in particular the DESI and EDPR for what concerns
			the ICT sector and the EU Innovation Scoreboard and ERA Scoreboards).
		</p>
	</div>
	<div class="countryNavigation">
		<div class="selectCountry">Select a country to begin</div>
		<div />
		<p>
			{#each data.countries as countryInfo}
				<Card
					img={countryToImageURL[countryInfo.Country2Alpha]}
					href="/home/{countryInfo.Country2Alpha}"
					horizontal
					class="mb-4 mt-5"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{countryInfo.CountryName}
					</h5>
					<p class="mb-3 font-normal text-gray-500 dark:text-gray-400 leading-tight">
						Total number of tenders: {countryInfo.Metadata.NumExamples}
					</p>
					<p class="mb-3 font-normal text-gray-500 dark:text-gray-400 leading-tight">
						Number of innovative: {countryInfo.Metadata.NumInnovative}
					</p>
					<p class="mb-3 font-normal text-gray-500 dark:text-gray-400 leading-tight">
						Number of non-innovative: {countryInfo.Metadata.NumNonInnovative}
					</p>
				</Card>
			{/each}
		</p>
	</div>
</div>

<style>
	:root {
		background-color: #f3f4f6;
	}

	.navigationInfo {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: start;
		background-color: white;
		margin: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 10px;
	}

	.introDiv {
		flex: 2;
		padding: 50px;
	}

	.infoText {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: rgb(95, 95, 95);
		font-size: 24px;
	}

	.selectCountry {
		text-align: center;
		color: rgb(95, 95, 95);
		font-size: 24px;
	}

	.longerIntroText {
		text-align: justify;
		color: grey;
		font-size: 20px;
		margin-top: 20px;
	}

	.countryNavigation {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		margin: 50px;
	}
</style>
