<script>
    import Tab from "./Tab.svelte";
</script>

<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" stroke="none" fill="none">
    <image href="organ/console.png" width="1920" />
    <Tab spriteSrcs={["organ/stops/white00.png", "organ/stops/white01.png"]} name={"Tibia\nClausa"} length="8" abbreviation="TIBIA" textColor="black" x={150} y={100} width={72} height={90} />
</svg>

<style>
svg {
    font-family: Arial;
}
</style>