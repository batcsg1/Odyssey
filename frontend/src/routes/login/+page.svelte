<script>
    let { form } = $props();
</script>

<main>
  <section>
    <h1>{`{ odyssey }`}</h1>
  </section>
  <form method="POST" action="?/login">
    <h2>Login</h2>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email Address"
    />
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Password"
    />
    <button data-cy="submit" type="submit">Sign in now</button>
  </form>
</main>

<style>
    main{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100vh;
        justify-content: space-around;
        color: white;
    }
    h1{
        font-size: 4em;
        font-weight: bolder;
    }
    form{
        display: flex;
        flex-direction: column;
        background-color: rgba(0,0,0,0.1);
        border: 0.1em solid white;
        padding: 2em;
        border-radius: 0.3em;
    }
    form input{
        margin-bottom: 1em;
        padding: 0.5em 2em 0.5em 2em;
        border-radius: 0.3em;
        border: none;
        outline: none;
        background-color: rgba(145, 144, 144, 0.1);
    }
    form button{
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
