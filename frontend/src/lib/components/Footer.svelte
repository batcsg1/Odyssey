<script>
  import logo from "$lib/Images/logo-dark-nobg.png";

  function toRoman(num) {
    const romanValues = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    for (const { value, numeral } of romanValues) {
      const count = Math.floor(num / value);
      result += numeral.repeat(count);
      num -= value * count;
    }
    return result;
  }

  const currentYear = new Date().getFullYear();

  let romanYear = toRoman(currentYear);
</script>

<footer>
  <h1><a href="/"><img src={logo} alt="odyssey" height="60" /></a></h1>

  <section id="footer-bar">
    Terms | Privacy | <a href="/login">Login</a>
  </section>

  <a href="https://batchelornz.com">
    <img
      src="https://raw.githubusercontent.com/batcsg1/batcsg1/refs/heads/main/Logo.png"
      alt="sb"
      height="150"
    />
  </a>

  <section id="copyright">
    <strong>Copyleft 🄯 {romanYear} Samuel Batchelor.</strong> Freely
    distributable and modifiable under the
    <a href="https://github.com/batcsg1/Odyssey/blob/main/LICENSE"
      >GNU Affero General Public License v3.0</a
    >.
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

  h1 {
    font-weight: bolder;
    padding: 0.3em;
    font-size: xx-large;
  }

  img {
    transition: ease 0.3s;
  }
  img:hover {
    transform: scale(1.1);
    transition: ease 0.3s;
  }

  #footer-bar {
    padding: 1em;
    border-top: 0.1em dashed #666;
  }

  #footer-bar a {
    color: white;
    text-decoration: none;
  }

  #copyright {
    padding-top: 1em;
    text-align: center;
    max-width: 25em;
  }
</style>
