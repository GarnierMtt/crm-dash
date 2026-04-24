<script lang="ts">

</script>

<div class="navbar">
    <div class="ariane">
        <button title="menue"><img src="/H.png" alt="Logo HORTEN"/></button>
        <a href="/">Dashboard</a>
    </div>
    <div>
        <button title="menue"><img src="/search.svg" alt="Logo HORTEN"/></button>
        <button title="menue"><img src="/bell.svg" alt="Logo HORTEN"/></button>
        <button title="menue"><img src="/profile.png" alt="Logo HORTEN"/></button>
    </div>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .navbar {
        background-color: var(--objColor);
        height: 3em;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    } 
    .navbar > div > * {
        margin: .2em;
        font-size: 2em;
    }

    button{
        height: 100%;
    }
    img {
        height: 100%;
    }

    .ariane > a {
        text-decoration: none;
        text-decoration-color: var(--highlightColor);
        color: var(--textColor);
    }
    .ariane > a:hover {
        text-decoration-line: underline;
    }
</style>