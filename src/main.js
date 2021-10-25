import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		deckChoice: 'valuesDeck'
	}
});

export default app;