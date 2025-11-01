<script>
    import Logo from "$lib/Images/logo-dark.png"

</script>

<header>
    <a href="/"><img src={Logo} alt="Dark Logo" height="140"></a>
    <nav id="hamburger-parent">
        <button>☰</button>
    </nav>
    <nav id="hamburger">
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </nav>
</header>


<style>
    header{
        background-color: black;
        padding: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.1em dashed #333;
        
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
    #hamburger-parent{
        position: relative;
    }
    #hamburger{
        position: absolute;
        right: 0;
        top: 10%;
        z-index: 1000;
        background-color: white;
        padding: 1em;
    }
</style>