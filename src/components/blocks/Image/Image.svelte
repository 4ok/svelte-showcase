<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

    /** @type {string} Image "src" attribute */
    export let src: string;

    /** @type {string} Image "alt" attribute */
    export let alt: string;

    /** @type {string} Text on the image */
    export let caption: string;

    let loading = true;
    let error = false;
    let imgElement: HTMLImageElement;

    const dispatch = createEventDispatcher();

    function subscribeOnLoadEvents() {
        imgElement.addEventListener('load', onLoad);
        imgElement.addEventListener('error', onError);
    }

    function unsubscribeFromLoadEvents() {
        imgElement.removeEventListener('load', onLoad);
        imgElement.removeEventListener('error', onError);
    }

    /*
     * Called when an image is finished loading successfully or unsuccessfully
     */
    function imageFinally() {
        dispatch('imageFinally');
        unsubscribeFromLoadEvents();
    }

    function onLoad() {
        loading = false;
        imageFinally();
    }

    function onError() {
        error = true;
        loading = false;
        imageFinally();
    }

    onMount(() => {
        if (src && src.length) {
            subscribeOnLoadEvents();
        } else {
            error = true;
            loading = false;
            imageFinally();
        }
    })
</script>

<div class="wrapper" class:loading={loading}>
    {#if !loading}
        <div class="caption">
            {caption}
        </div>
    {/if}

    {#if error}
        <div class="not-found">
            Image not found
        </div>
    {:else}
        <img
            class="img"
            loading="lazy"
            src={src}
            alt={alt}
            bind:this={imgElement}
        />
    {/if}
</div>

<style lang="less">
    .wrapper {
        position: relative;
        padding-top: 100%; // height depending on width.
    }

    .img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }

    .caption {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 0.2em 0.6em;
        border-radius: 4px;
        background: #000;
        color: #fff;
        opacity: 0.6;
        z-index: 1;
        font-size: 0.8rem;
    }

    .loading {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 30px;
            height: 30px;
            border: 5px solid #007bff;
            border-right-color: transparent;
            border-radius: 50%;
            animation: spinner 1.2s infinite linear;
        }
    }

    .not-found {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #f8f9fa;
        color: #999;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
</style>

