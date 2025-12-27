<script>
  let { message = $bindable() } = $props();

  const hideMessage = () => (message = "");
</script>

<button
  id="message"
  transition:fly={{ x: 200, duration: 300, easing: cubicOut }}
  onclick={hideMessage}
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
  }

  #message:hover {
    background-color: red;
    color: white;
    cursor: pointer;
    box-shadow: 3px 3px 0px white;
  }
</style>
