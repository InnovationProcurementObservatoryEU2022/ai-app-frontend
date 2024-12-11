<script>
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';

	export let form;
</script>

<div class="loginDiv">
	<div class="imageDiv">
		<img
			src="https://commission.europa.eu/themes/contrib/oe_theme/dist/ec/images/logo/positive/logo-ec--en.svg"
			class="mr-3 h-36"
			alt="EU Commision logo"
		/>
	</div>
	<form class="flex flex-col space-y-6" method="POST">
		{#if form?.wrongLogin}
			<p class="text-red-500">Wrong username/password, please try again</p>
		{/if}
		<Label class="space-y-2">
			<span>Username</span>
			<Input name="username" placeholder="username" required />
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input type="password" name="password" placeholder="•••••" required />
		</Label>
		<Button type="submit" class="w-full1">Login to your account</Button>
	</form>
</div>

<style>
	.loginDiv {
		display: flex;
		height: 80vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.imageDiv {
		padding-bottom: 50px;
	}
</style>
