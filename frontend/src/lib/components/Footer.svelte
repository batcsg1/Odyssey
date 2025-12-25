<script>
    import logo from "$lib/Images/logo-dark.png";
    import sb from "$lib/Images/sb-logo.png";
</script>

<footer>
    <h1>{`{ odyssey }`}</h1>

    <section id="footer-bar">
        Terms | Privacy | Login | Site by <img src={sb} alt="sb" height="30">
    </section>

    <section id="copyright">
       © 2025 <img src={sb} alt="sb" height="30"> - All rights reserved.
    </section>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        padding: 2em 1em 2em 1em;
        background: linear-gradient(to top, rgba(0, 0, 0, 1) 97%, rgba(227, 227, 227, 1) 100%, rgba(233, 233, 233, 1) 96%, rgba(255, 255, 255, 1) 100%);
    }

    h1{
        font-weight: bolder;
        padding: 0.3em;
    }

    #footer-bar{
        padding-top: 1em;
        border-top: 0.1em dashed #666;
    }

    #copyright{
        padding-top: 1em;
    }

</style>