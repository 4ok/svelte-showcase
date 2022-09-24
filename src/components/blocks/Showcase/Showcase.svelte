<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import { fade } from 'svelte/transition';
    import Card from '../Card/Card.svelte';
    import { loadCard, type Card as CardType } from './api';

    const SHOW_CARD_TIMEOUT = 30 * 1000; // 30 sec

    const documentBody = document.documentElement;

    let showcaseElement: HTMLElement;
    let showcaseTop = 0;
    let showcaseHeight = 0;
    let showcaseGap = 0;
    let cardHeight = 0;
    let showCardTimerId: ReturnType<typeof setTimeout>;
    let resizeTimerId: ReturnType<typeof setTimeout>;
    let loading = true;
    let items: CardType[] = [];

    async function addCard() {
        const item = await loadCard();
        items.push(item);
        items = items;
    }

    // Getting first card
    addCard();

    $: if (items.length) {
        calcCardHeight();
        resetTimerShowCard();
    }

    function handleCardImageFinally() {
        loading = false;
    }

    async function handleClickNewCard() {
        // If last image in the list is not loaded, start the timer again
        if (loading) {
            resetTimerShowCard();
            return;
        }

        loading = true;

        addCard();
        resetTimerShowCard();
    }

    function clearTimerShowCard() {
        clearTimeout(showCardTimerId);
    }

    /*
     * Set the timer to show a new "Card"
     */
    function resetTimerShowCard() {
        clearTimerShowCard();
        showCardTimerId = setTimeout(handleClickNewCard, SHOW_CARD_TIMEOUT);
    }

    /*
     * After receiving a data, we wait for the tick for calculate a card height
     */
    async function calcCardHeight() {
        await tick();
        const lastCardElement: HTMLElement = showcaseElement.querySelector('.card');
        cardHeight = lastCardElement.offsetHeight + showcaseGap;
    }

    function scrollToLastCard() {
        const top = showcaseTop
            + showcaseHeight
            - cardHeight;

        documentBody.scroll({
            top,
            behavior: 'smooth'
        });
    };

    /*
     * Start observing resize for "showcase" element
     */
    function resizeObserverShowcase() {
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(scrollToLastCard);
        });

        resizeObserver.observe(showcaseElement);
    }

    onMount(() => {
        const styleGap = window
            .getComputedStyle(showcaseElement)
            .getPropertyValue('gap');

        showcaseGap = parseInt(styleGap, 10) || 0;
        showcaseTop = showcaseElement.offsetTop;

        resizeObserverShowcase();

        // Disable or enable timer depending on the tab activity
        document.addEventListener('visibilitychange', () => {
            switch (document.visibilityState) {
                case 'hidden': {
                    clearTimerShowCard();
                    break;
                }
                case 'visible': {
                    resetTimerShowCard();
                    break;
                } 
            }
        })
    });

    onDestroy(() => {
        clearTimeout(showCardTimerId)
        clearInterval(resizeTimerId)
    });
</script>

<h1>Showcase</h1>

<ul
    class="showcase"
    bind:this={showcaseElement}
    bind:offsetHeight={showcaseHeight}
>
    {#each items as data, index}
        {@const isLastItem = index === items.length - 1}

        <li class="item" transition:fade>
            <Card
                title={data.title}
                extra={data.extra}
                desc={data.desc}
                tags={data.tags}
                image={data.image}
                on:imageFinally|once={handleCardImageFinally}
            />

            {#if isLastItem}
                <button
                    class="add-new-card"
                    title="Add a new card"
                    disabled={loading}
                    on:click|once={handleClickNewCard}
                >
                    ＋
                </button>
            {/if}
        </li>
    {/each}
</ul>

<h2>Lorem ipsum</h2>

{#each new Array(10).fill(undefined) as _}
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fugit deserunt soluta dolore quidem magnam architecto ipsa at molestiae pariatur esse rem debitis error asperiores, dolorem dolor? Repellat, sunt assumenda.
    </p>
{/each}

<style lang="less">
    .showcase {
        list-style-type: none;
        margin: 32px 0;
        padding: 0;
        display: grid;
        gap: 24px;
        grid-template-columns: 33.33% 33.33% 33.33%;
        width: calc(100% - 60px);

        @media (max-width: 1200px) {
            grid-template-columns: 50% 50%;
        }

        @media (max-width: 800px) {
            grid-template-columns: 1fr;
            width: 100%;
            margin-bottom: 80px;
        }
    }

    .item {
        position: relative;
    }

    .add-new-card {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -60px;
        background: #28a745;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;
        border: 0;

        &:hover {
            opacity: 1;
        }

        &:disabled {
            opacity: 0.3;
            pointer-events: none;
        }

        @media (max-width: 800px) {
            top: auto;
            left: 50%;
            bottom: -60px;
            transform: translateX(-50%);
        }
    }
</style>
