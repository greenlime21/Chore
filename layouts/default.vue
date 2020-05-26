<template>
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" >
    <nuxt />
  </div>
</template>

<style>
:root {
  --main-color: rgba(242, 196, 208, 1);
  --sub-color: rgba(189, 227, 242, 1);
  --base-color: rgba(242, 242, 242, 1);
  --dark-color: rgba(217, 175, 139, 1);
  --point-color: rgb(242, 106, 75);
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
  color: rgb(80, 80, 80);
  overflow-y: scroll;
  overflow-x: hidden;
  width: calc(100vw - 10px);
}
button, input, select, textarea {
  font-family : 'Baloo 2', cursive;
  font-size   : 100%;
  outline: none;
  border: none;
}
.explanation{
  width: 60vw;
  margin: 30px auto;
  text-align: center;
}
::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-track{
  background: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 2px #777;
}
::-webkit-scrollbar-thumb{
  background: #ccc;
  border-radius: 10px;
  box-shadow: none;
}
@media screen and (max-width: 1024px) {
  body {
    width: 100vw;
  }
}
@media screen and (max-width: 767px) {
  body {
    width: 100vw;
  }
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>
