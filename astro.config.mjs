// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://YOUR_USERNAME.github.io',
	base: '/gcdg-annoted',

	integrations: [
		starlight({
			title: 'Annotated Blog',
			description: 'An annotated blog with hover-summary effects',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/YOUR_USERNAME/gcdg-annoted' },
			],
			sidebar: [
				{
					label: 'Posts',
					items: [
						{ label: 'Home', slug: '' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
