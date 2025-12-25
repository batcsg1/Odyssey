<script>
  import { page } from "$app/stores";

  let currentPath = $derived($page.url.pathname);

  let isLoggedIn = $derived($page.data.user != null);

  let open = $state(false);

  let openMenu = () => (open = !open);

  let y = $state(0);

  // $effect(() => {
  // 	if (y > 100){
  //     message = "Yay"
  //   } else {
  //     message = "Nope"
  //   }
  // });

  // let isShrunk = $derived.by(() => {
  //   if (y > 100){
  //     return 'Yay'
  //   }else{
  //     return 'Nope'
  //   }
  // })

  let isTransparent = $derived(y > 30);

  let menu = $derived([
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "THE SOLAR SYSTEM", href: "/solar-system" },
    { name: "THE INTERSTELLAR", href: "/interstellar" },
    isLoggedIn
      ? { name: "LOGOUT", href: "" }
      : { name: "LOGIN", href: "/login" },
  ]);

  import logo from "$lib/Images/logo-dark.png";
</script>

<svelte:window bind:scrollY={y} />

<header class:transparent={isTransparent}>
  <h1><a href="/">{`{ odyssey }`}</a></h1>
  <nav id="hamburger-parent">
    {#if !open}
      <button class:transparent={isTransparent} onclick={openMenu}>☰</button>
    {:else}
      <button class:transparent={isTransparent} onclick={openMenu}>✖</button>
    {/if}
  </nav>
  {#if open}
    <nav id="hamburger">
      <ul>
        {#each menu as { name, href }, i}
          <li>
            <a class:currentPath={href === currentPath} {href}>{name}</a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>

<style>
  header {
    background: #000;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 95%,
      rgba(227, 227, 227, 1) 100%,
      rgba(233, 233, 233, 1) 96%,
      rgba(255, 255, 255, 1) 100%
    );
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: 0.3s ease;
  }

  header.transparent {
    background: rgba(0, 0, 0, 0.3);
    transition: 0.3s ease;
  }

  header.transparent h1 {
    font-size: x-large;
    transition: font-size 0.3s ease;
  }

  h1 {
    color: white;
    padding: 0.1em 1em 0.1em 1em;
    font-size: xx-large;
  }
  h1 a {
    color: white;
    font-weight: bolder;
    transition: ease 0.3s;
    display: inline-block;
  }
  h1 a:hover {
    transition: ease 0.3s;
    transform: scale(1.1);
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

  button.transparent {
    background-color: transparent;
    box-shadow: none;
  }

  button.transparent:hover {
    background-color: white;
  }

  /* Hamburger Menu Styles */

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
    box-shadow: 6px 6px 0px #66aaff;
  }
  #hamburger ul {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  #hamburger a {
    color: #333;
    display: block;
    width: 100%;
    padding: 0.5em 1em 0.5em 1em;
  }

  #hamburger a.currentPath {
    font-weight: bolder;
    color: #66aaff;
    text-decoration: underline;
  }

  #hamburger li {
    padding: 0.2em;
    transition: ease 0.5s;
    border-radius: 0.3em;
    list-style: none;
  }
  #hamburger li:hover {
    transition: ease 0.5s;
    background-color: #66aaff;
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
