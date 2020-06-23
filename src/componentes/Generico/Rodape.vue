<template>
    <div>
        <footer class="footer">
            <ul class="footer-menushare">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Google Plus</a>
                </li>
            </ul>

            <p>Copyright The Arduino Store</p>
            <p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            </p>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Rodape"
    }
</script>

<style scoped>
    * {
        font-size: 18px;
    }

    .footer {
        background-color: #25303e;
        color: #83969f;
        text-align: center;
        padding-bottom: 2em;
    }

    .footer-menushare {
        background-color: #303d4c;
        padding: .5em;
    }

    .footer-menushare li {
        display: inline-block;
        margin: 0 1em;
    }

    .footer-menushare a {
        font-size: 1.1em;
        text-decoration: none;
        color: white;
    }
</style>