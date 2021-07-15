<script>
    import Tab from "./Tab.svelte";

    export let organStore;

    const reedConfig = {
        spriteSrcs: ["organ/stops/red00.png", "organ/stops/red01.png"],
        textColor: "white"
    };

    const fluteConfig = {
        spriteSrcs: ["organ/stops/white00.png", "organ/stops/white01.png"],
        textColor: "black"
    };

    const stringConfig = {
        spriteSrcs: ["organ/stops/yellow00.png", "organ/stops/yellow01.png"],
        textColor: "black"
    };

    const couplerConfig = {
        spriteSrcs: ["organ/stops/black00.png", "organ/stops/black01.png"],
        textColor: "black"
    };

    const accompConfig = {
        xOffset: 100,
        yOffset: 300
    }
</script>

<svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" stroke="none" fill="none">
    <image href="organ/console.png" width="1920" />
    <Tab id="accomp-16-tibia" config={{...fluteConfig, name: "Tibia", length: "16", "abbreviation": "TIBIA"}} x={accompConfig.xOffset} y={accompConfig.yOffset} on:change />
    <Tab id="accomp-8-violin-celeste" config={{...stringConfig, name: "Violin\nCeleste", length: "8", "abbreviation": "CEL"}} x={accompConfig.xOffset + 80} y={accompConfig.yOffset} on:change />
    <Tab id="accomp-8-viol-d-orchestra" config={{...fluteConfig, name: "Viol\nD'Orch", length: "8", "abbreviation": "VIOL"}} x={accompConfig.xOffset + 160} y={accompConfig.yOffset} on:change />
    <Tab id="accomp-8-violin" config={{...fluteConfig, name: "Violin", length: "8", "abbreviation": "VIOL"}} x={accompConfig.xOffset + 240} y={accompConfig.yOffset} on:change />
    <Tab id="accomp-8-viola" config={{...fluteConfig, name: "Viola", length: "8", "abbreviation": "VIOL"}} x={accompConfig.xOffset + 320} y={accompConfig.yOffset} on:change />
    <Tab id="accomp-8-trumpet" config={{...reedConfig, name: "Trumpet", length: "8", "abbreviation": "TRUM"}} x={accompConfig.xOffset + 400} y={accompConfig.yOffset} on:change />

    <Tab id="accomp-8-vox-humana" config={{...reedConfig, name: "Vox\nHumana", length: "8", "abbreviation": "VOX"}} x={accompConfig.xOffset} y={accompConfig.yOffset - 100} on:change />
    <Tab id="accomp-8-oboe-horn" config={{...reedConfig, name: "Oboe\nHorn", length: "8", "abbreviation": "OBOE"}} x={accompConfig.xOffset + 80} y={accompConfig.yOffset - 100} on:change />
    <Tab id="accomp-8-saxophone" config={{...reedConfig, name: "Saxophone", length: "8", "abbreviation": "SAX"}} x={accompConfig.xOffset + 160} y={accompConfig.yOffset - 100} on:change />
    <Tab id="accomp-4-violin" config={{...fluteConfig, name: "Violin", length: "4", "abbreviation": "VIOL"}} x={accompConfig.xOffset + 240} y={accompConfig.yOffset - 100} on:change />
    <Tab id="accomp-4-viola" config={{...fluteConfig, name: "Viola", length: "4", "abbreviation": "VIOL"}} x={accompConfig.xOffset + 320} y={accompConfig.yOffset - 100} on:change />
    <Tab id="accomp-4-flute" config={{...fluteConfig, name: "Concert\nFlute", length: "4", "abbreviation": "FLUTE"}} x={accompConfig.xOffset + 400} y={accompConfig.yOffset - 100} on:change />

    <Tab id="accomp-4-oboe-horn" config={{...reedConfig, name: "Oboe\nHorn", length: "4", "abbreviation": "OBOE"}} x={accompConfig.xOffset} y={accompConfig.yOffset - 200} on:change />
    <Tab id="accomp-4-vox-humana" config={{...reedConfig, name: "Vox\nHumana", length: "4", "abbreviation": "VOX"}} x={accompConfig.xOffset + 80} y={accompConfig.yOffset - 200} on:change />
    <Tab id="accomp-2-2/3-tibia" config={{...fluteConfig, name: "Nazard", length: "2 2/3", "abbreviation": "NAZ"}} x={accompConfig.xOffset + 160} y={accompConfig.yOffset - 200} on:change />
    <Tab id="accomp-2-tibia" config={{...fluteConfig, name: "Piccolo", length: "2", "abbreviation": "PICC"}} x={accompConfig.xOffset + 240} y={accompConfig.yOffset - 200} on:change />
    <Tab id="accomp-2-tibia" config={{...fluteConfig, name: "Harp", length: " ", "abbreviation": "HARP"}} x={accompConfig.xOffset + 320} y={accompConfig.yOffset - 200} on:change />
</svg>

<style>
svg {
    font-family: Arial;
}
</style>