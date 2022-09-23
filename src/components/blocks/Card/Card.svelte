<script lang="ts">
    import Image from "../Image/Image.svelte";
    import type { CardImage } from "../Showcase/api";
    import Tags, { type Tag } from "../Tags/Tags.svelte";


    /** @type {Image} Props for "Image" component */
    export let image: CardImage;

    /** @type {string} Title */
    export let title: string;

    /** @type {string} Extra info */
    export let extra: string;

    /** @type {string} Description */
    export let desc: string;

    /** @type {string} Tags, comma-separated string */
    export let tags: string;

    let tagsList: Tag[];

    $: tagsList = tags
        .split(',')
        .map(str => str.trim());
</script>

<section class="card">
    <Image
        src={image.src}
        alt={title}
        caption={image.caption}
        on:imageFinally
    />

    <div class="text">
        <div class="extra overflow">
            {extra}
        </div>
        <h2 class="title overflow">
            {title}
        </h2>
        <div class="desc overflow">
            {desc}
        </div>

        <Tags list={tagsList} />
    </div>
</section>

<style lang="less">
    .card {
        padding: 16px 16px 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        transition: border-color 0.4s;

        &:hover {
            border-color: rgba(0, 0, 0, 0.3);
        }
    }

    .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .extra {
        color: #999;
        margin-top: 16px;
        font-size: 0.8rem;
    }

    .title {
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0;
    }

    .desc {
        margin-top: 8px;
    }
</style>

