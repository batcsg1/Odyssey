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
    img {
        transition: ease 0.5s;
    }
    img:hover {
        transition: ease 0.5s;
        cursor: pointer;
        transform: scale(1.1);
    }
    button{
        color: white;
        padding: 0.5em 0.8em 0.5em 0.8em;
        background-color: #1d1c1cff;
        border: none;
        font-size: xx-large;
        border-radius: 0.2em;
        margin-right: 1em;
        font-weight: bolder;
        transition: ease 0.5s;
    }
    button:hover{
        background-color: white;
        color: #333;
        transition: ease 0.5s;
        cursor: pointer;
        transform: scale(1.1);
    }
</style>