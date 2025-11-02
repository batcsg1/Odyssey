<script>
  let open = $state(false);

  let openMenu = () => (open = !open);
</script>

<header>
  <h1>&#123; odyssey &#125;</h1>
  <nav id="hamburger-parent">
    {#if !open}
      <button onclick={openMenu}>☰</button>
    {:else}
      <button onclick={openMenu}>✖</button>
    {/if}
  </nav>
  {#if open}
    <nav id="hamburger">
      <ul>
        {#each [{ name: "HOME", href: "/" }, { name: "ABOUT", href: "/about" }, { name: "THE SOLAR SYSTEM", href: "/solar-system" }, { name: "THE GREATER COSMOS", href: "/cosmos" }] as { name, href }, i}
          <li>
            <a href={href}>{name}</a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>

<style>
  header {
    background-color: black;
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1em dashed #333;
    position: sticky;  
    top: 0;
  }
  h1{
    color: white;
    padding: 0.1em 1em 0.1em 1em;
  }
  button {
    color: white;
    padding: 0.5em 0.8em 0.5em 0.8em;
    background-color: #1d1c1cff;
    border: none;
    font-size: xx-large;
    border-radius: 0.2em;
    margin-right: 1em;
    font-weight: bolder;
    transition: ease 0.5s;
    box-shadow: 3px 3px 0px white;
  }
  button:hover {
    background-color: white;
    color: #333;
    transition: ease 0.5s;
    transform: scale(1.1);
    box-shadow: 5px 5px 0px #333;
  }
  #hamburger-parent {
    position: relative;
  }
  #hamburger {
    position: absolute;
    right: 0%;
    margin-right: 0.5em;
    top: 100%;
    background-color: white;
    padding: 0.9em 4em 0.9em 1em;
    border-right: #333 dashed 0.1em;
  }
  #hamburger ul {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  #hamburger a{
    color: #333;
    display: block;          
    width: 100%;          
    padding: 0.5em 1em 0.5em 1em;
  }
  #hamburger li {
    padding: 0.2em;
    transition: ease 0.5s;
    border-radius: 0.3em;
    list-style: circle;
  }
  #hamburger li:hover {
    transition: ease 0.5s;
    background-color: #333;
    cursor: pointer;
    text-decoration: underline;
    transform: scale(1.05);
  }
  #hamburger li:hover a {
    transition: ease 0.5s;
    color: white;
    text-decoration: underline;
  }
</style>
