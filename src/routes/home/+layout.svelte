<script>
	import '../../app.postcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/home">
		<a href="/home"
			><img
				src="https://commission.europa.eu/themes/contrib/oe_theme/dist/ec/images/logo/positive/logo-ec--en.svg"
				class="mr-3 h-6 sm:h-9"
				alt="EU Commision logo"
			/></a
		>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Tender Visualization</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/home">Home</NavLi>
		<NavLi href="/home/about">About</NavLi>
		<NavLi href="/logout" class="text-red-500">Logout</NavLi>
	</NavUl>
</Navbar>
<slot />
