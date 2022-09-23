<script context="module" lang="ts">
    import colors from './colors';

    export type Tag = string;

    const countColors = colors.length;
</script>

<script lang="ts">
    export let list: Tag[];
</script>

<div class="tags">
    {#each list as tag, i}
        <div class="tag" style="background: {colors[i % countColors]}">
            {tag}
        </div>
    {/each}
</div>

<style>
    .tags {
        margin-top: 16px;
        display: flex;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        gap: 8px;
        padding-bottom: 16px;
    }

    .tag {
        padding: 0.2em 0.6em;
        font-size: 0.8rem;
        border-radius: 4px;
        white-space: nowrap;
    }
</style>

