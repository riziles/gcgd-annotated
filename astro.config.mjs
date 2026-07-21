// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://riziles.github.io',
	base: '/gcgd-annotated',

	integrations: [
		starlight({
			title: 'Annotated Blog',
			description: 'An annotated blog with hover-summary effects',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/riziles/gcgd-annotated' },
			],
			sidebar: [
				{
					label: 'Posts',
					items: [
						{ label: 'Home', slug: '' },
						{ label: 'The Carrier-Free Gospel', slug: 'posts/great-work' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
