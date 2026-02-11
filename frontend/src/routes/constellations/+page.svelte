<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";
  import ConstellationTable from "$lib/components/tables/ConstellationTable.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";
  import Content from "$lib/components/Content.svelte";

  let { data } = $props();
  const { constellations, error } = data;

  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));
</script>

<Header {location} />

<Content>
  <img
    src="https://i0.wp.com/astronomicca.com/wp-content/uploads/2023/10/alexander-andrews-fsH1KjbdjE8-unsplash-edited.jpg?resize=640%2C1002&ssl=1"
    alt="Orion-Nebula"
    width="30%"
  />
  <h2>What are Constellations?</h2>
  <p>
    Constellations are patterns of stars that have been identified and named by
    various cultures throughout history. They often represent mythological
    figures, animals, or objects and have been used for navigation,
    storytelling, and as a way to organize the night sky. There are 88
    officially recognized constellations, each with its own unique set of stars
    and stories.
  </p>
</Content>

<figure id="image-section">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/3/36/Orion_tjt.jpg"
    alt="The constellation Orion with Betelgeuse and the Orion Nebula"
    width="400"
  />

  <figcaption>
    <section>
      <h3>Orion</h3>
      <p>
        The constellation Orion, with Betelgeuse the reddish star at the top
        left. Also visible are Barnard’s Loop and the Orion Nebula (M42).
      </p>

      <small class="credit">
        Image credit:
        <a
          href="https://commons.wikimedia.org/wiki/File:Orion_tjt.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikimedia Commons
        </a>
        · © T. TheStarmon &mdash; licensed under
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-SA 3.0
        </a>
      </small>
    </section>
  </figcaption>
</figure>

<ConstellationTable {constellations} {error} {location} />

<style>
  /* ---------- IMAGE FEATURE SECTION ---------- */

  #image-section {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 2.5em;
    padding: 2.5em;
    background: #1d1a20;
    border: 0.1em solid rgb(31, 51, 66);
    box-shadow: 0.5em 0.5em 6em rgb(33, 23, 72);
    align-items: center;
  }

  #image-section img {
    width: 100%;
    height: auto;
    border-radius: 0.4em;
    border: 0.1em solid rgb(31, 51, 66);
    box-shadow: 0 0 1.5em rgba(0, 0, 0, 0.6);
  }

  #image-section figcaption section {
    max-width: none;
    gap: 1.4em;
  }

  #image-section h3 {
    margin: 0;
    padding: 0;
    border: none;
    text-align: left;
    font-size: 1.8em;
    font-weight: bold;
    color: #ffffff;
  }

  #image-section p {
    line-height: 1.6;
    color: #ddd;
  }

  /* ---------- IMAGE CREDIT ---------- */

  .credit {
    margin-top: 1.2em;
    font-size: 0.75em;
    color: #9aa7b2;
  }

  .credit a {
    color: #66aaff;
    text-decoration: none;
  }

  .credit a:hover {
    text-decoration: underline;
  }

  /* ---------- RESPONSIVE ---------- */

  @media (max-width: 900px) {
    #image-section {
      grid-template-columns: 1fr;
      padding: 2em;
    }

    #image-section img {
      max-width: 28em;
      margin-inline: auto;
    }

    #image-section figcaption {
      text-align: center;
    }

    #image-section h3 {
      text-align: center;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 2.2em;
    max-width: 50em;
  }
</style>
