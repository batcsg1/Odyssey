<script>
  import Section from "./Section.svelte";
  let { intro, blurb } = $props();
</script>

<section id="intro-blurb">
  {#each [intro, blurb] as section}
    <Section header={section.header} text={section.text}></Section>
  {/each}
</section>

<style>
  #intro-blurb {
    align-self: center;
    max-width: 70em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>
