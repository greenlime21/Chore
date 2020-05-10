<template>
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet" />
    <nuxt />
  </div>
</template>

<style>
:root {
  --main-color: rgba(242, 196, 208, 1);
  --sub-color: rgba(189, 227, 242, 1);
  --base-color: rgba(242, 242, 242, 1);
  --dark-color: rgba(217, 175, 139, 1);
  --point-color: rgba(242, 106, 75, 1);
}

html {
  font-family: 'Baloo 2', cursive, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  background: var(--base-color);
}
button, input, select, textarea {
  font-family : 'Baloo 2', cursive;
  font-size   : 100%;
  outline: none;
  border: none;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>