<script>
    import logo from "$lib/Images/logo-dark.png";
</script>

<footer>
    <img src={logo} alt="logo" height="100">

    <section id="footer-bar">
        Terms | Privacy | Login | Site by <strong>Samuel Batchelor</strong>
    </section>

    <section id="copyright">
       © 2025 Samuel Batchelor. All rights reserved.
    </section>
</footer>

<style>
    footer {
        background: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        padding: 3em 1em 3em 1em;
        background: linear-gradient(to top, rgba(0, 0, 0, 1) 97%, rgba(227, 227, 227, 1) 100%, rgba(233, 233, 233, 1) 96%, rgba(255, 255, 255, 1) 100%);
    }

    #copyright{
        padding-top: 1em;
    }

</style>