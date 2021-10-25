<script>
	import { onMount } from "svelte";
	import { valuesDeck, numbersDeck } from './decks.js'
	export let deckChoice

	let activeDeck = []
	let activeCards = []
	let winners = []
	let losers = []

// TODO revise card picking algorithm
//	instead of picking a random card from the deck, which could posibly leave a single card before winner cards are added back in

//	1.  get deck
// 	2.  shuffle all cards into activedeck
//	3.  pick cards
//	4.  if activeDeck.length < 2
//		5.  shuffle winners, push onto activeDeck
//		6.  

	const pickRandomCards = (numberOfCards) => {
		const picked = []
		for(let i=0; i<numberOfCards; i++){
			picked.push( activeDeck.splice(Math.floor(Math.random() * activeDeck.length), 1)[0] )
			activeDeck = activeDeck
		}
		return picked
	}

	const handleClickCard = (pickedIndex) => {
		winners.push(...activeCards.splice(pickedIndex, 1))
		losers.push(...activeCards)
		winners = winners
		losers = losers
		activeCards = [...pickRandomCards(2, activeDeck)]
		console.log('winners=',winners,'losers=', losers)
	}

	onMount(() => {
		switch ( deckChoice ){
			case 'valuesDeck':
				activeDeck = [...valuesDeck]
				break;
			default:
				activeDeck = [...numbersDeck]
				break;
		}
		activeCards = pickRandomCards(2, activeDeck)
		console.log('active',activeCards)
	})
</script>

<main>
	<h2>{deckChoice}</h2>
	<section>
		
		<button>Start over</button>
		<div class="card-area">
			<div 
				class="left card-spot"
				on:click={()=>handleClickCard(0)}
			>
				{#if activeCards.length > 0}
					<div class="active-card">
						<h2>{activeCards[0].value}</h2>
						<p>{activeCards[0].text}</p>
					</div>
				{/if}
			</div>
			<div 
				class="right card-spot"
				on:click={()=>handleClickCard(1)}
			>
				{#if activeCards.length > 0}
					<div class="active-card">
						<h2>{activeCards[1].value}</h2>
						<p>{activeCards[1].text}</p>
					</div>
				{/if}
				
			</div>
		</div>
	</section>
	<section class="info">
		<div>
			Active deck size {activeDeck.length}
		</div>
		<div>Wins:<br>
			{#each winners as value}
				<div>{value.value}</div>
			{/each}
		</div>
		<div>Losses:<br>
			{#each losers as value}
				<div>{value.value}</div>
			{/each}
		</div>
	</section>
</main>

<style>
	main{
		display:grid;
		place-items: center;
	}
	main section{

		width: calc( 100% - 40px);
		max-width: 800px;
		height: 500px;
	}
	button{
		width: 100%;
	}
	section.info{
		width: 500;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.card-area{
		height: 300px;;
		display: flex; 
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 20px;
	}
	.card-spot{
		
		width: 50%;
		height: 100%
	}
	.active-card{
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: linear-gradient(azure, beige);
		border-radius: 5px;
		box-shadow: 0 0 10px 2px black;

	}
</style>