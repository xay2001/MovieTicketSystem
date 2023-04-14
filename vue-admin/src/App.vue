<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<style>
    .app {
        font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
        letter-spacing: 1px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        width: 100%;
    }

    body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }

    html {
        width: 100%;
        height: 100%;
    }

    a{
      text-decoration: none;
      color: #409EFF;
    }
</style>
