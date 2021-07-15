<script>
    export let x = 0;
    export let y = 0;
    export let textSize = 12;
    export let text = "";
    export let textColor = "black";

    const lines = text.split("\n");
    const spacing = 1.1;
</script>

<text {x} y={y - (textSize * spacing * lines.length) / 2} alignment-baseline="middle" fill={textColor} style="--text-size: {textSize}px">
    {#each lines as line}
        <tspan x={x} dy="{textSize * spacing}">
            {line}
        </tspan>
    {/each}
</text>

<style>
    text {
        text-anchor: middle;
        user-select: none;
        pointer-events: none;
        font-size: var(--text-size);
    }
    
</style>