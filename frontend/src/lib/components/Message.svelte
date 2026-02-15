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
    position: fixed;
    z-index: 2000;
    /* These coordinates now stick to the screen corner */
    top: 20%;
    left: 2em;

    background-color: rgba(8, 7, 13, 0.7);
    border: 0.05em dashed white;
    color: white;
    border-radius: 0.3em;
    padding: 2em;
    font-weight: bolder;
  }

  #message:hover {
    background-color: rgba(45, 14, 14, 0.7);
    color: red;
    cursor: pointer;
  }
</style>
