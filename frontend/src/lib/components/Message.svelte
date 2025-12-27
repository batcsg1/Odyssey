<script>
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  export let message;
  export let onClose;
</script>

<button
  id="message"
  in:fly={{ x: 200, duration: 300, easing: cubicOut }}
  out:fly={{ x: 200, duration: 200, easing: cubicOut }}
  onclick={onClose}
>
  ✖ | {message}
</button>

<style>
  #message {
    margin-top: 1em;
    text-align: center;
    color: white;
    position: absolute;
    z-index: 2000;
    left: 70%;
    top: 35%;
    background-color: white;
    color: #333;
    border-radius: 0.3em;
    padding: 2em 2em 2em 2em;
    box-shadow: 3px 3px 0px #66aaff;
    font-weight: bolder;
  }

  #message:hover {
    background-color: red;
    color: white;
    cursor: pointer;
    box-shadow: 3px 3px 0px white;
  }
</style>
