if(!self.define){let e,s={};const c=(c,i)=>(c=new URL(c+".js",i).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(i,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let n={};const d=e=>c(e,a),o={module:{uri:a},exports:n,require:d};s[a]=Promise.all(i.map((e=>o[e]||d(e)))).then((e=>(r(...e),n)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CqcPUo0Y.js",revision:null},{url:"assets/index-RbKkfLss.css",revision:null},{url:"index.html",revision:"c9ad30af665bd6f9d6f980331fb83af2"},{url:"registerSW.js",revision:"10abaddb7200dd6249ef3f9739cad814"},{url:"android-chrome-192x192.png",revision:"a01cd5526ce2fc9fc763cccc9048167d"},{url:"android-chrome-36x36.png",revision:"4deb70a62b3fa58c8131a017d6bc8d1d"},{url:"android-chrome-48x48.png",revision:"431680f641a0f96cca6f0e3220c30f53"},{url:"android-chrome-512x512.png",revision:"60f2f785246183f51aa0eb139d4b05b6"},{url:"android-chrome-72x72.png",revision:"0316663dc9022a9bae9b1692bed07c8b"},{url:"apple-touch-icon-57x57-precomposed.png",revision:"23d5658aab17ab9dc1ee804c717c617e"},{url:"apple-touch-icon-57x57.png",revision:"edcd6516056e10d3ab864b38e4a8bc41"},{url:"apple-touch-icon-60x60-precomposed.png",revision:"7115b600200414dec6e68031607a8494"},{url:"apple-touch-icon-60x60.png",revision:"457f7e97aab3c28f68010de83b1b99e1"},{url:"apple-touch-icon-72x72-precomposed.png",revision:"36dde3acc85a46ed4597a1abc0988b59"},{url:"apple-touch-icon-72x72.png",revision:"706186448300c8310922e3520be74c1b"},{url:"apple-touch-icon-76x76-precomposed.png",revision:"512e36f54c57561ee8ff154cc0562bfb"},{url:"apple-touch-icon-76x76.png",revision:"5db95707403c50b6e55e7204ddc8de0b"},{url:"apple-touch-icon-precomposed.png",revision:"5c0e005d52ce9589f73fd4646263e15e"},{url:"apple-touch-icon.png",revision:"5bac407b42d0830dd33b88589ab0ab0f"},{url:"browserconfig.xml",revision:"c3941c928cc097b8a7a4d026499fd2f9"},{url:"favicon-16x16.png",revision:"717fb5ed28fbbea7bca4a589cd8ac8b1"},{url:"favicon-32x32.png",revision:"1952bfab3eac41cc53e06293b3557726"},{url:"favicon.ico",revision:"21d15b17bdc7cc0437c22c7b4480deef"},{url:"GitHub.svg",revision:"a0b00583d93c2f7084ad151ee0849934"},{url:"icon.png",revision:"0b42144ff369a2b2865021e666a43ed1"},{url:"icon.svg",revision:"22af4d37e94888f4040d5cc5e39b3c18"},{url:"mstile-150x150.png",revision:"6cd53c4cff10e0bce9eac8553ffe11e4"},{url:"mstile-310x150.png",revision:"94f67cdc0d9f95d93b93ad6d0b03d992"},{url:"mstile-70x70.png",revision:"5374bafdc4ad95a85b88c8b800bce8e2"},{url:"screenshot-1242x2208.png",revision:"b46f33f58e71f836e000185cebcedf15"},{url:"screenshot-640x1136.png",revision:"c1adaf718bb5218c62102f839d846479"},{url:"screenshot-750x1334.png",revision:"bed220280c98e37adbf20c7dec0bd248"},{url:"assets/berlin.webp",revision:"b2ee93d5380acc742f3e0d42e74f38d0"},{url:"assets/music/99.m4a",revision:"da09fbdfbb5f353e0a648a015eb19d75"},{url:"assets/music/hunter.mp4",revision:"a6ef3129c3ccc56a4285b76e5cebac82"},{url:"assets/music/konga.m4a",revision:"a2d3975b73342d2509a2da97b201c051"},{url:"assets/music/remix.m4a",revision:"4567b840269ee0952d90dc0e4843e684"},{url:"assets/music/she.m4a",revision:"c88a5543fd96978d1e3026f28be00bbf"},{url:"assets/music/star.m4a",revision:"3b3b22c673495dda05a45b2e9c191444"},{url:"assets/music/theme.mp3",revision:"1d766731a12474f9a83111d64451a8e3"},{url:"assets/sfx/bark.mp3",revision:"4c12439c6ea812ffb1c91a7b6f464a11"},{url:"assets/sfx/drop.mp3",revision:"628053aca86541a0c95a95b9d811a926"},{url:"assets/sfx/fall.mp3",revision:"6a29b9d7e1aa11469f8e3e21e725f7b3"},{url:"assets/sfx/flap.mp3",revision:"96c57fa0c596b5e01469e9d596978445"},{url:"assets/sfx/jump.mp3",revision:"88cadb96e8038f0777be39c24cc5d046"},{url:"assets/sfx/quack.mp3",revision:"47fd28770c8e3a31e2c603c6596550e2"},{url:"assets/sfx/shot.mp3",revision:"47855415e9e57ac2c5f0e0c1ac8a90ae"},{url:"assets/sfx/tick.mp3",revision:"8718da1242d3401d7018dfbaa2bf570a"},{url:"fonts/Nanum_Pen_Script/NanumPenScript-Regular.ttf",revision:"6dca00a888adddce462113561de691b7"},{url:"fonts/Nanum_Pen_Script/OFL.txt",revision:"7cd6214d26b06edd32ef742597b137f2"},{url:"fonts/Press_Start_2P/OFL.txt",revision:"99b3402e66b4c5d957e43ab30654670d"},{url:"fonts/Press_Start_2P/PressStart2P-Regular.ttf",revision:"f98cd910425bf727bd54ce767a9b6884"},{url:"manifest.webmanifest",revision:"e66b3df4b458d88283eecc630b66640d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
