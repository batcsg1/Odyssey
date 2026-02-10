<script>
    import logo from "$lib/Images/logo-dark.png";
</script>

<footer>
    <h1>odyssey</h1>

    <section id="footer-bar">
        Terms | Privacy | <a href="/login">Login</a>
    </section>

    <a href="https://batchelornz.com">
        <img src="https://raw.githubusercontent.com/batcsg1/batcsg1/refs/heads/main/Logo.png" alt="sb" height="150">
    </a>

    <section id="copyright">
       Copyleft 🄯 2026 Samuel Batchelor. Freely distributable and modifiable under the <a href="https://github.com/batcsg1/Odyssey/blob/main/LICENSE">GNU Affero General Public License v3.0</a>.
    </section>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        padding: 2em 1em 2em 1em;
        border-top: 0.2em solid white;
    }

    h1{
        font-weight: bolder;
        padding: 0.3em;
        font-size: xx-large;
    }

    img {
        transition: ease 0.3s;
    }
    img:hover{
        transform: scale(1.1);
        transition: ease 0.3s;
    }

    #footer-bar{
        padding: 1em;
        border-top: 0.1em dashed #666;
    }

    #footer-bar a{
        color: white;
        text-decoration: none;
    }

    #copyright{
        padding-top: 1em;
        text-align: center;
    }

</style>