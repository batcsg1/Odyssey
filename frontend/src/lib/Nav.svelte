<script>
    import Logo from "$lib/Images/logo-dark.png"

</script>

<header>
    <img src={Logo} alt="Dark Logo" height="140">
    <button>☰</button>
    
</header>


<style>
    header{
        background-color: black;
        padding: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button{
        color: white;
        padding: 0.5em 0.8em 0.5em 0.8em;
        background-color: #333;
        border: none;
        font-size: xx-large;
        border-radius: 0.2em;
        margin-right: 1em;
        font-weight: bolder;
    }
</style>