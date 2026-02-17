<script>
  let { form } = $props();
  const { error } = form ?? {};
  import bgImage from "$lib/Images/login-background.jpg";
  import logo from "$lib/Images/logo-light.png";
</script>

<main style="--bg-url: url({bgImage})">
  <form method="POST" action="?/login">
    <a href="/"><img src={logo} alt="odyssey" height="80" /></a>
    <h2>Login</h2>
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Type your email address"
    />

    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Password"
    />

    <div id="button-container">
      <button type="submit" id="login">Sign in now</button>
      <button type="submit" id="register">Register</button>
    </div>

    {#if error}
    <p class="message">{error}</p>
    {/if}

    <p>🄯 2026 Samuel Batchelor</p>

  </form>
</main>

<style>
  .message{
    color: red;
  }
  main {
    background-image: var(--bg-url);
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    background-color: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    box-shadow: 0.8em 0.8em 0em black;
  }
  form h2 {
    text-align: center;
    font-weight: 600;
    font-size: 1.5em;
  }
  label {
    font-size: small;
  }
  input {
    border: none;
    border-bottom: 0.1em solid rgb(173, 170, 170);
    padding: 0em 0em 0.3em 0em;
    margin-bottom: 0.5em;
  }
  button {
    color: white;
    border: none;
    padding: 0.5em;
    transition: 0.3s ease;
  }
  button:hover {
    transition: 0.3s ease;
  }

  #button-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding-block: 1em;
    border-bottom: 0.1em solid rgb(173, 170, 170);
  }
  #login {
    background-color: black;
    border: 0.05em solid #333;
  }
  #register {
    background-color: gray;
    border: 0.05em solid gray;
  }

  #login:hover,
  #register:hover {
    background-color: white;
    color: #333;
    border: 0.05em solid #333;
  }

  img {
    margin-bottom: 1em;
  }

  p {
    text-align: center;
    color: gray;
  }
</style>
