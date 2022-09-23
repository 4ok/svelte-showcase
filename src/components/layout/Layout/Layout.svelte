<script>
    import Header from "../Header/Header.svelte";
    import Body from "../Body/Body.svelte";
    import Footer from "../Footer/Footer.svelte";
</script>

<div class="layout">
    <Header />
    <Body>
        <slot />
    </Body>
    <Footer />
</div>

<style>
    .layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 320px;
        min-height: 100vh;
    }
</style>
