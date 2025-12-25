<script>
  let { form } = $props();
  const { error } = form ?? {};
</script>

<main>
  <section>
    <h1>{`{ odyssey }`}</h1>
  </section>
  <form method="POST" action="?/login">
    <h2>Login</h2>
    <input type="email" id="email" name="email" placeholder="Email Address" />
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Password"
    />
    <button type="submit">Sign in now</button>

    {#if error}
      <p class="error">{error}</p>
    {/if}
  </form>
</main>

<style>
  .error {
    color: #ffb3b3;
    margin-bottom: 1em;
    text-align: center;
  }
  main {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
    gap: 8em;
    justify-content: center;
    color: white;
    background: #2a7b9b;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(56, 145, 157, 0.7) 70%,
      rgba(60, 208, 183, 0.9) 100%
    );
  }
  h1 {
    font-size: 4em;
    font-weight: bolder;
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.5);
    border: 0.1em solid white;
    padding: 2em;
    border-radius: 0.3em;
    box-shadow: 0.6em 0.6em 0em white;
  }
  form input {
    margin-bottom: 1em;
    padding: 0.5em 2em 0.5em 0.9em;
    border-radius: 0.3em;
    border: none;
    outline: none;
    background-color: rgba(145, 144, 144, 0.1);
  }
  form button {
    padding: 0.7em;
    border: none;
    border-radius: 0.3em;
    background-color: #66aaff;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  h2 {
    text-align: center;
    margin-bottom: 1em;
    border-bottom: 0.1em solid white;
    padding: 0.7em;
  }
</style>
