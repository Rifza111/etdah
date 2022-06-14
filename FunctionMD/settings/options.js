 const { color } = require('../function.js')
 const fs = require('fs')

 module.exports = {
 monayawal: 1000,
 limitawal: 15,
 banchat: false,
 info: {
   owner: ["6283110928302@s.whatsapp.net", "6287708357324@s.whatsapp.net"],
   ownerct: ["6283110928302","6287708357324"],
   ownerName: "©rifza.p.p",
   botName: "Thunder-XM_Legacy",
   igowner: "https://www.instagram.com/rifza.p.p",
   version: "^4.0.1"
   },
 api: {
 ss: "f43beb"
   },
 rpg: {
   darahawal: 100,
   besiawal: 15,
   goldawal: 10,
   emeraldawal: 5,
   umpanawal: 5,
   potionawal: 1
   },
 textpro: {
      blackpink: "https://textpro.me/create-blackpink-logo-style-online-1001.html",
       lightglow: "https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html",      
        glass: "https://textpro.me/green-glass-text-effect-910.html",
        hoorror_blood: "https://textpro.me/horror-blood-text-effect-online-883.html",
        sand: "https://textpro.me/sand-engraved-3d-text-effect-989.html",
        magma: "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html",
        sketch: "https://textpro.me/create-a-sketch-text-effect-online-1044.html",
        batman: "https://textpro.me/make-a-batman-logo-online-free-1066.html",
        demon: "https://textpro.me/create-green-horror-style-text-effect-online-1036.html",
        ice: "https://textpro.me/ice-cold-text-effect-862.html",
        sci_fi: "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html",
        sea_metal: "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html",
        skeleton: "https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html",
        transformer: "https://textpro.me/create-a-transformer-text-effect-online-1035.html",
       warning: "https://textpro.me/road-warning-text-effect-878.html",
      denim: "https://textpro.me/denim-text-effect-online-919.html",
      pornhub: "https://textpro.me/pornhub-style-logo-online-generator-free-977.html"
      }
 }
  
  const LordThunder = require.resolve(__filename)
  fs.watchFile(LordThunder, () => {
  fs.unwatchFile(LordThunder)
  console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'orange'))
  delete require.cache[LordThunder]
  require(LordThunder)
  } )