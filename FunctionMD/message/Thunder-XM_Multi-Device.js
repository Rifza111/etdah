 "use strict";
 const fs = require('fs')
 const cron = require('node-cron')
 const uptime = process.uptime();
 const { spawn, exec } = require('child_process')
 const axios = require("axios")
 const Exif = require('../sticker/exif.js');
 const util = require("util");
 const exif = new Exif();
 const { getBuffer } = require('../function.js')
 const moment = require("moment-timezone")
 const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')  
 const ffmpeg = require('fluent-ffmpeg')
 const {getContentType, downloadContentFromMessage } = require('@adiwajshing/baileys');
 const { 
  color, 
  runtime,
  fetchJson, 
  getRandom,
  webp2mp4File,
  pickRandom, 
  randomInt, 
  genMath
 } = require('../function.js')
 const { 
  yta, 
  ytv, 
  searchResult 
 } = require('../scrape/ytdl')
 const {
   ramalan_jodoh, 
   ramalanJodoh,
   tafsir_mimpi,
   nomer_hoki,
   ramalan_cinta,
   suami_istri,
   ramalan_jodoh_bali,
   arti_nama,
   kecocokan_nama,
   kecocokan_nama_pasangan,
   tanggal_jadian_pernikahan,
   sifat_usaha_bisnis,
   pekerjaan_weton_lahir,
   rejeki_hoki_weton,
   ramalan_nasib,
   cek_potensi_penyakit,
   perhitungan_feng_shui,
   arti_kartu_tarot,
   petung_hari_baik,
   hari_sangar_taliwangke,
   primbon_hari_naas,
   rahasia_naga_hari,
   primbon_arah_rejeki,
   ramalan_peruntungan,
   weton_jawa,
   sifat_karakter_tanggal_lahir,
   potensi_keberuntungan,
   primbon_memancing_ikan,
   masa_subur,
   zodiak,
   shio
  } = require('../scrape/primbon') 
 const { detikNews } = require('../scrape/detik') 
 const { textpro } = require('../scrape/textpro') 
 const { textpro2 } = require('../scrape/textpro2') 
 const { wallpaperaccess } = require('../scrape/wallpaperaccess') 
 const { TiktokDownloader } = require('../scrape/tiktokdl') 
 const { igDownloader } = require('../scrape/igdl') 
 const { pinterest } = require('../scrape/pinterest') 
 const { lirik } = require('../scrape/lirik')
 const { kbbi } = require('../scrape/kbbi')
 const { AioVideoDl } = require('../scrape/aiovideodl')
 const { tebakgambar } = require('../scrape/tebakgambar')
 const { twitter } = require('../scrape/twitter')
 const Options = require('../settings/options.js')
 const afk = require("../../storage/user/afk.js");
 const tebakbendera = fs.readFileSync('./storage/result/tebakbendera.json');
 let _afk = JSON.parse(fs.readFileSync('./storage/user/afk.json'));
 let _limit = JSON.parse(fs.readFileSync('./storage/user/limit.json'));
 let _buruan = JSON.parse(fs.readFileSync('./storage/user/hasil_buruan.json'));
 let _darahOrg = JSON.parse(fs.readFileSync('./storage/user/darah.json'))
 const _math = JSON.parse(fs.readFileSync('./storage/user/math.json'))
 const _tbkgmbr = JSON.parse(fs.readFileSync('./storage/user/tebakgambar.json'))
 const _tbkbendera = JSON.parse(fs.readFileSync('./storage/user/tebakbendera.json'))
 let textproo = Options.textpro
 let thumb = fs.readFileSync('./storage/image/thumb.jpg') 
 let OwnerNumber = Options.info.owner
 let banChats = Options.banchat 
 module.exports = async (
    sock,
    m,
    store   
    ) => { 
   
   try{            
   const from = m.key.remoteJid    
   const CMD = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
   const prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#'	      
   const chatmessage = (m.xtype === 'conversation') ? m.message.conversation : (m.xtype === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
   const ordermessage = (m.xtype === 'conversation') ? m.message.conversation : (m.xtype == 'imageMessage') ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.xtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
   const chats = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''   	
   const args = ordermessage.trim().split(/ +/).slice(1)          
   const order = ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase()
   const q = args.join(' ')       
   const isCmd = ordermessage.startsWith(prefix)   
   const isGroup = from.endsWith('@g.us') 
   const itulho = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid 
   const isOwner = OwnerNumber.includes(itulho)  
   const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'    
   const groupMetdata = isGroup ? await sock.groupMetadata(from) : ''
   const groupMembers = isGroup ? groupMetdata.participants : ''
   const groupName = isGroup ? await groupMetdata.subject : ''   
   const groupAdmins = isGroup ? m.getGroupAdmins(groupMembers) : ''
   const penghunigc = isGroup ? m.getGroupMembers(groupMembers) : ''
   const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
   const isGroupAdmins = groupAdmins.includes(m.sender)
   
   function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
   }
   let LETT = 1;
   let head = `╭─╼[ ${Options.info.botName} ]╾➲`
   let left = "│"
   let branch = "├"
   let bracketmenu = "┞─╼「"
   let F = "」"
   let A = "┟"
   let B = "┞"
   let stick = "╿"
   let tayime = "🕒 *Time:*"
   let runtz = "⏱️*Runtime:*"
   let taipye = "💻 *Type:*"
   let borderlist = "╭╾───────────────╼╮"
   let borderlistend = "╰╾───────────────╼╯"
   let opener = "╭─────────────────╮"
   let closing = "╰─────────────────╯"
   let headtqto = "╭╾─「 Thanks To✨ 」╾───╮"
   let endbordertqto = "╰╾───────────────╾╯"
   let end = "╰╾────────────────╼▢"
const MenuList = `${head}
${left}${opener}
${left}${left}${tayime} ${time}         
${left}${closing} 
${left}${opener}
${left}${left}${m.sayingtime + m.timoji} 
${left}${left}${m.pushName}        
${left}${closing}
${left}${opener}
${left}${left}🪧 *Bot Name:* 
${left}${left}  ${Options.info.botName}
${left}${left}${taipye} Baileys-md
${left}${left}🩸 *Version:* ${Options.info.version} 
${left}${left}${runtz}    
${left}${left}  ${runtime(process.uptime())}          
${left}${closing}
${left}${borderlist}
${left}${left} LIST MENU 📄         
${left}${borderlistend}
${bracketmenu} 📁️DEFAULT ${F}
${branch}${LETT++}. ${prefix}menu
${branch}${LETT++}. ${prefix}test
${branch}${LETT++}. ${prefix}temp
${branch}${LETT++}. ${prefix}listsection1
${branch}${LETT++}. ${prefix}listsection2
${bracketmenu} ️⬇️DOWNLOADER ${F}
${branch}${LETT++}. ${prefix}play _query_
${branch}${LETT++}. ${prefix}lagu _query_
${branch}${LETT++}. ${prefix}musik _query_
${branch}${LETT++}. ${prefix}twitter _link_
${branch}${LETT++}. ${prefix}tiktokvideo _link_
${branch}${LETT++}. ${prefix}tiktokaudio _link_
${branch}${LETT++}. ${prefix}instagramdownload _link_
${branch}${LETT++}. ${prefix}instagramdl _link_
${branch}${LETT++}. ${prefix}igdownload _link_
${branch}${LETT++}. ${prefix}igdl _link_
${branch}${LETT++}. ${prefix}youtubemp4 _link_
${branch}${LETT++}. ${prefix}youtubemp3 _link_
${branch}${LETT++}. ${prefix}fb _link_
${branch}${LETT++}. ${prefix}fbvid _link_
${branch}${LETT++}. ${prefix}facebook _link_
${branch}${LETT++}. ${prefix}fbdl _link_
${branch}${LETT++}. ${prefix}facebookdl _link_
${branch}${LETT++}. ${prefix}facebookdownload _link_
${bracketmenu} 🖨️CONVERTER ${F}
${branch}${LETT++}. ${prefix}toimg
${branch}${LETT++}. ${prefix}tomp4
${branch}${LETT++}. ${prefix}tomp3
${branch}${LETT++}. ${prefix}togif
${branch}${LETT++}. ${prefix}unduh
${branch}${LETT++}. ${prefix}sticker
${branch}${LETT++}. ${prefix}stiker
${branch}${LETT++}. ${prefix}s
${branch}${LETT++}. ${prefix}stickergif
${branch}${LETT++}. ${prefix}sgif
${branch}${LETT++}. ${prefix}stikergifm
${branch}${LETT++}. ${prefix}stikgif
${bracketmenu} 🖥️BAILEYS DOCS ${F}
${branch}${LETT++}. ${prefix}delete
${branch}${LETT++}. ${prefix}del
${bracketmenu} 🏢GROUP ${F}
${branch}${LETT++}. ${prefix}add
${branch}${LETT++}. ${prefix}kick
${branch}${LETT++}. ${prefix}promote
${branch}${LETT++}. ${prefix}demote
${bracketmenu} 🏞️RPG ${F}
${branch}${LETT++}. ${prefix}berburu
${branch}${LETT++}. ${prefix}mancing
${branch}${LETT++}. ${prefix}menambang
${branch}${LETT++}. ${prefix}mining
${branch}${LETT++}. ${prefix}heal
${bracketmenu} 🖌️️TEXTPRO ${F}
${branch}${LETT++}. ${prefix}sci_fi _text_
${branch}${LETT++}. ${prefix}blackpink
${branch}${LETT++}. ${prefix}lightglow
${branch}${LETT++}. ${prefix}glass
${branch}${LETT++}. ${prefix}hoorror_blood
${branch}${LETT++}. ${prefix}sand
${branch}${LETT++}. ${prefix}pornhub
${branch}${LETT++}. ${prefix}sketch
${branch}${LETT++}. ${prefix}magma
${branch}${LETT++}. ${prefix}batman
${branch}${LETT++}. ${prefix}demon
${branch}${LETT++}. ${prefix}sci_fi
${branch}${LETT++}. ${prefix}ice
${branch}${LETT++}. ${prefix}sea_metal
${branch}${LETT++}. ${prefix}skeleton
${branch}${LETT++}. ${prefix}transformer
${branch}${LETT++}. ${prefix}warning
${branch}${LETT++}. ${prefix}denim
${bracketmenu} ℹ️INFO ${F}
${branch}${LETT++}. ${prefix}owner
${branch}${LETT++}. ${prefix}runtime    
${branch}${LETT++}. ${prefix}profile
${branch}${LETT++}. ${prefix}inventori
${branch}${LETT++}. ${prefix}leaderboard
${bracketmenu} 🖼️RANDOM IMAGE_ ${F}
${branch}${LETT++}. ${prefix}waifu
${branch}${LETT++}. ${prefix}neko    
${branch}${LETT++}. ${prefix}awoo
${branch}${LETT++}. ${prefix}megumin
${branch}${LETT++}. ${prefix}shinobu
${bracketmenu} 🛍️Transaksi 🛒 ${F}
${branch}${LETT++}. ${prefix}jual _barang_ _jumlah_
${branch}${LETT++}. ${prefix}sel _barang_ _jumlah_
${branch}${LETT++}. ${prefix}buy _barang_ _jumlah_
${branch}${LETT++}. ${prefix}beli _barang_ _jumlah_
${bracketmenu} 🎮Game ${F}
${branch}${LETT++}. ${prefix}math _mode_
${branch}${LETT++}. ${prefix}tebakgambar
${branch}${LETT++}. ${prefix}tebakbendera
${bracketmenu} 🔍Searching ${F}
${branch}${LETT++}. ${prefix}wallpaperaccess _query_
${branch}${LETT++}. ${prefix}pinterest _query_
${branch}${LETT++}. ${prefix}lirik _query_
${bracketmenu} 📖Primbon ${F}
${branch}${LETT++}. ${prefix}artinama _name_
${branch}${LETT++}. ${prefix}ramalanjodoh _name|name_

${left}
${stick}${headtqto}
${left}${A} Rifza 
${left}${B} Arifi Razzaq
${left}${A} Deff
${left}${B} Katame
${left}${A} Yuda
${stick}${borderlistend}
${end}
`         
   //Participant Mention
   const mentionByTag = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByreply = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""       
   const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
   mention != undefined ? mention.push(mentionByreply) : []
   const mentionUser = mention != undefined ? mention.filter(n => n) : []    
   const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
   const reply = async (teks) => {
   sock.sendMessage(from, 
        { text: teks, mentions: [m.sender] },
        { quoted : m })  
    }      
 
   let fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: '6283136505591-1604595598@g.us' } : {})}, message: { "contactMessage":{"displayName": `Thunder-Multi`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;rifza;;;\nFN:rifza\nitem1.TEL;waid=6287708357324:6287708357324\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}                   
   
   //function Afk
   const isAfkOn = afk.checkAfkUser(m.sender, _afk)    
   //public/self
   if (banChats === true) { if (!m.key.fromMe && !isOwner) return }	

   if (isGroup) {	
    for (let x of mentionUser) {
    if (afk.checkAfkUser(x, _afk) && !isCmd) {
    const getId = afk.getAfkId(x, _afk)
    const getReason = afk.getAfkReason(getId, _afk)
    const sejak = afk.getAfkSejak(getId, _afk) 
    const cptl = `*「 AFK MODE 」*\n\n*Sssttt! Orang itu sedang afk, harap jangan ganggu*\n*Alasan*  : ${getReason}\n*Sejak* : ${sejak}`
    if (m.key.fromMe){ return }
    reply(cptl)
    }
   }
   
   if (afk.checkAfkUser(m.sender, _afk) && !isCmd) {
    const pep = `*@${m.sender.split("@")[0]}* telah kembali dari AFK!\n\n*Selama* : ${clockString(new Date - afk.getAfkTime(m.sender, _afk))}`
    reply(pep)
    _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
    fs.writeFileSync('./storage/user/afk.json', JSON.stringify(_afk))
    } 
   }
   
   //function rpg
   const { 
     addInventoriDarah, 
      cekDuluJoinAdaApaKagaDiJson, 
      addDarah, 
      kurangDarah, 
     getDarah 
   }  = require('../../storage/user/darah.js')
   const { 
     cekInventoryAdaAtauGak, 
      addInventori,  
       addBesi, 
       addEmas, 
       addEmerald,
       addUmpan,
       addPotion,
       kurangBesi, 
       kurangEmas, 
       kurangEmerald, 
       kurangUmpan,
       kurangPotion,
       getBesi, 
      getEmas, 
     getEmerald,
     getUmpan,
    getPotion
   } = require('../../storage/user/alat_tukar.js')
   const { 
    addInventoriMonay, 
    cekDuluJoinAdaApaKagaMonaynyaDiJson, 
    addMonay, 
    kurangMonay, 
   getMonay 
   } = require('../../storage/user/monay.js')
   const { 
    addInventoriLimit, 
    cekDuluJoinAdaApaKagaLimitnyaDiJson, 
    addLimit, 
    kurangLimit, 
    getLimit 
   } = require('../../storage/user/limit.js')
   const { 
    cekDuluHasilBuruanNya, 
     addInventoriBuruan, 
     addIkan,
      addAyam, 
      addKelinci, 
      addDomba, 
      addSapi,
      addGajah,
      kurangIkan,
      kurangAyam, 
      kurangKelinci, 
      kurangDomba, 
      kurangSapi,
      kurangGajah,
      getIkan,
      getAyam, 
      getKelinci, 
      getDomba,
     getSapi,
    getGajah
   } = require('../../storage/user/buruan.js')
   let DarahAwal =  Options.rpg.darahawal
   const isDarah = cekDuluJoinAdaApaKagaDiJson(m.sender)   
   const isCekDarah = getDarah(m.sender)
   const isUmpan = getUmpan(m.sender)
   const isPotion = getPotion(m.sender)
   const isIkan = getIkan(m.sender)
   const isAyam = getAyam(m.sender)
   const iskelinci = getKelinci(m.sender)
   const isDomba = getDomba(m.sender)
   const isSapi = getSapi(m.sender)
   const isGajah = getGajah(m.sender)
   const isMonay = getMonay(m.sender)
   const isLimit = getLimit(m.sender)
   const isBesi = getBesi(m.sender)
   const isEmas = getEmas(m.sender)
   const isEmerald = getEmerald(m.sender)
   const isInventory = cekInventoryAdaAtauGak(m.sender)
   const isInventoriBuruan = cekDuluHasilBuruanNya(m.sender)
   const isInventoryLimit = cekDuluJoinAdaApaKagaLimitnyaDiJson(m.sender)
   const isInventoryMonay = cekDuluJoinAdaApaKagaMonaynyaDiJson(m.sender)
   const ikan = ['🐟','🐠','🐡']     
   cron.schedule('0 0 * * *', () => {
     const reset = []
     _darahOrg = reset
     console.log('Darah di reset')
     fs.writeFileSync('./storage/user/darah.json', JSON.stringify(_darahOrg))
     console.log('Success!')
     }, 
     {
      scheduled: true,
      timezone: 'Asia/Jakarta'
     }
   )  
      //--------------------[ MATH ]--------------------\\
       if (_math.hasOwnProperty(m.sender.split('@')[0]) && !isCmd && !m.key.fromMe) {
        let jawaban = _math[m.sender.split('@')[0]].jawaban
        if (chatmessage.toLowerCase() == jawaban) { 
       addMonay(_math[m.sender.split('@')[0]].user, _math[m.sender.split('@')[0]].monay)
       reply(`Selamat jawaban kamu benar🥳🎉\n\n[🎁]Kamu mendapatkan hadiah sebanyak ${_math[m.sender.split('@')[0]].monay} monay\n\nTotal monay kamu: ${getMonay(_math[m.sender.split('@')[0]].user)}`)
       delete _math[m.sender.split('@')[0]]
           fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
        } else {
        reply("Jawaban Salah!")
       }
     } 
     //--------------------[ TEBAK GAMBAR ]--------------------\\
     if (_tbkgmbr.hasOwnProperty(m.sender.split('@')[0]) && !isCmd && !m.key.fromMe) {
     let jawaban = _tbkgmbr[m.sender.split('@')[0]].jawaban
        if (chatmessage.toLowerCase() == jawaban) { 
       addMonay(_tbkgmbr[m.sender.split('@')[0]].user, _tbkgmbr[m.sender.split('@')[0]].monay)
       reply(`Selamat jawaban kamu benar🥳🎉\n\n[🎁]Kamu mendapatkan hadiah sebanyak ${_tbkgmbr[m.sender.split('@')[0]].monay} monay\n\nTotal monay kamu: ${getMonay(_tbkgmbr[m.sender.split('@')[0]].user)}`)
       delete _tbkgmbr[m.sender.split('@')[0]]
           fs.writeFileSync("./storage/user/tebakgambar.json", JSON.stringify(_tbkgmbr))
        } else {
        reply("Jawaban Salah!")
       }
     }
     //--------------------[ TEBAK BENDERA ]--------------------\\
     if (_tbkbendera.hasOwnProperty(m.sender.split('@')[0]) && !isCmd && !m.key.fromMe) {
     let jawaban = _tbkbendera[m.sender.split('@')[0]].jawaban
        if (chatmessage.toLowerCase() == jawaban) { 
       addMonay(_tbkbendera[m.sender.split('@')[0]].user, _tbkbendera[m.sender.split('@')[0]].monay)
       reply(`Selamat jawaban kamu benar🥳🎉\n\n[🎁]Kamu mendapatkan hadiah sebanyak ${_tbkbendera[m.sender.split('@')[0]].monay} monay\n\nTotal monay kamu: ${getMonay(_tbkbendera[m.sender.split('@')[0]].user)}`)
       delete _tbkbendera[m.sender.split('@')[0]]
           fs.writeFileSync("./storage/user/tebakbendera.json", JSON.stringify(_tbkbendera))
        } else {
        reply("Jawaban Salah!")
       }
     }
      
      if (chatmessage.includes(`assalamualaikum`) || chatmessage.includes(`Asalamu'alaikum`) || chatmessage.includes(`Assalamualaikum`) || chatmessage.includes(`Asalamualaikum`) || chatmessage.includes(`asalamu'alaikum`) || chatmessage.includes(`assalamu'alaikum`) || chatmessage.includes(`Assalamu'alaikum`) || chatmessage.includes(`Assalamu'alaikum`) || chatmessage.includes(`asalamualaikum`) || chatmessage.includes(`asalamu'alaikum`)) {       
        sock.sendMessage(from, 
        { text: 'Waalaikumsalam' }, 
        { quoted : m })  
       }    
    if (chatmessage.includes(`kontol`) || chatmessage.includes(`Kontol`)){
       sock.sendMessage(from, 
        { text: '🗿' }, 
        { quoted : m })  
       }        
    if (chatmessage.startsWith("> ") && isOwner) {
	   console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;33mEVAL\x1b[1;37m]', time, color(`Action from the owner`, 'cyan'))
		const ev = (val) => {
        var pekok = JSON.stringify(val, null, 2)
        var nyir = util.format(pekok)
        if (pekok === undefined) {
        nyir = util.format(val)}
        return reply(nyir)}
        try {
        reply(util.format(eval(`;(async () => { ${chatmessage.slice(2)} })()`)))
        } catch (e) {
        reply(util.format(e))
        }
	    } 
	   else 
	    if (chatmessage.startsWith("$ ") && isOwner) {
        console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;33mEXEC\x1b[1;37m]', time, color(`Action from the owner`, 'cyan'))
        exec(chatmessage.slice(2), (err, stdout) => {
	    if (err) return reply(`${err}`)
	    if (stdout) reply(`${stdout}`)
	    })
        } 
        else 
        if (chatmessage.startsWith("=> ") && isOwner) {
	    console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;33mEVAL\x1b[1;37m]', time, color(`Action from the owner`, 'cyan'))
	    try {
	    let vul =  eval(chatmessage.slice(2))
	    if (typeof vul !== 'string') vul = require("util").inspect(vul)
		reply(`${vul}`)
        } catch (err) {
		reply(`${err}`)
	   }
     }  
  if (isCmd && !isGroup)
     console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;33mCMD\x1b[1;37m]', time, color(`${prefix + order} [${args.length}]`, 'purple'), 'from', color(m.pushName))
   
  if (isCmd && isGroup)
     console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;33mCMD\x1b[1;37m]', time, color(`${prefix + order} [${args.length}]`, 'purple'), 'from', color(m.pushName), 'in', color(groupName, 'orange'))

 switch (order) {

  case 'twitter':{
   if (!args[0]) return reply('Linknya mana?')
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
      kurangLimit(m.sender, 1)
      reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
      try{
      const TW = await twitter(`${q}`)
      let responzeId = TW.desc
      if (responzeId.includes("undefined")) return reply('Undefined')
      sock.sendMessage(from, { video: { url : TW.HD }, caption: TW.desc, gifPlayback: true}, { quoted: m } )
      console.log(TW)
      } catch { reply('err') }
   }
  break
  case 'fb': case 'fbdl': case 'facebook': case 'facebookdl': case 'facebookdownload': case 'fbvid':{
   if (!args[0]) return reply('Linknya mana?')
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
      kurangLimit(m.sender, 1)
      reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
      const FB = await AioVideoDl(`${q}`)
      let thumb = FB.thumbnail     
      let medi = FB.medias
      let media = Math.floor(Math.random() * medi.length);
      let medias = medi[media]; 
      console.log(medias)
      let link = medias.url
      let textz = `*[ FACEBOOK VIDEO ]*\n\n*Title* : ${FB.title}\n*Size* : ${medias.formattedSize}\n*Url* : ${FB.url}\n\n_Harap tunggu, permintaan anda sedang di proses....._`
      await sock.sendMessage(from, { image: { url : thumb }, caption: textz}, { quoted: m } )
      await sock.sendMessage(from, { video: { url : link }, caption: 'Done✓'}, { quoted: m } )
    if (!e) return reply('e')
   }
  break
  case 'lirik':{
  if (!args[0]) return reply('Lirik lagu apa?')
   const LR = await lirik(`${q}`)
   let tumbnail = LR.thumb
   if (tumbnail.includes("undefined")) return reply('Tidak ditemukan')
   sock.sendMessage(from, { image: { url : tumbnail }, caption: LR.lirik}, { quoted: m } )
  }
  break
 case 'kbbi':{
 if (!q) return reply('Harap sertakan kata!')
 let kbi = await kbbi(`${q}`)
 console.log(kbi)
 if (kbi.error === true){
 reply(kbi.message)
 } else {
 let textz = `*Title* : ${kbi.data.title}\n*Arti* : ${kbi.data.arti}`
 reply(textz) 
 } }
 break
  case 'Instagramdownload': case 'instagramdl': case 'igdownload': case 'igdl':{
   if (!args[0]) return reply('Linknya mana?')
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
      kurangLimit(m.sender, 1)
      reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
    try{
    let anu = await igDownloader(`${q}`)
     .then((data) => { 
      let linck = data.result.link
      let desksz = data.result.desc
     if (linck.includes("mp4")){
       sock.sendMessage(from, { video: { url : linck }, caption: desksz}, { quoted: m } )
      } else 
     if (linck.includes("jpg")){
       sock.sendMessage(from, { image: { url : linck }, caption: desksz}, { quoted: m } )
     }
     console.log(data)
    }
    )
   } catch { reply('err') }
  }
  break
 case 'tebakbendera':{
 if (_tbkbendera.hasOwnProperty(m.sender.split('@')[0])) return reply("Masih ada permainan yang sedang berlangsung")   
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
   kurangLimit(m.sender, 1)
   reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
   let upah = randomInt(500, 600)   
   let waktu = 60000
   /*
   / 1000 = 1 detik
   / 60000 = 1 menit
   >_tbkbendera
   */
   let datta = tebakbendera
   let jsonData = JSON.parse(datta);
   let xm = Math.floor(Math.random() * jsonData.length);
   let data = jsonData[xm];
   console.log(data)//hasil di tampilkan di cmd
   let jawaban = data.name
   let gambar = data.img
   let teks = `*TEBAK BENDERA*\n\nSebutkan nama bendera pada gambar tersebut!\nWaktu : ${waktu}s`
   _tbkbendera[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: waktu, monay: upah }  
  fs.writeFileSync("./storage/user/tebakbendera.json", JSON.stringify(_tbkbendera))
  sock.sendMessage(from, { image: { url: gambar }, caption: teks }, { quoted: m })
   await sleep(_tbkbendera[m.sender.split('@')[0]].time)
   if (_tbkbendera.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _tbkbendera[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/tebakbendera.json", JSON.stringify(_tbkbendera)) 
    }
 }
 break
 case 'tebakgambar':{
  if (_tbkgmbr.hasOwnProperty(m.sender.split('@')[0])) return reply("Masih ada permainan yang sedang berlangsung")   
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
   kurangLimit(m.sender, 1)
    reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
   let upah = randomInt(500, 600)   
   let waktu = 60000
   /*
   / 1000 = 1 detik
   / 60000 = 1 menit
   */
   let data = await tebakgambar()
   let jawaban = data.jawaban
   console.log(data)
   _tbkgmbr[m.sender.split('@')[0]] = { user: m.sender, jawaban: data.jawaban.toLowerCase(), time: waktu, monay: upah }  
  fs.writeFileSync("./storage/user/tebakgambar.json", JSON.stringify(_tbkgmbr))
   var teks = `*TEBAK GAMBAR*\n\nPetunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${waktu}s`
   sock.sendMessage(from, { image: { url: data.img }, caption: teks }, { quoted: m })
   await sleep(_tbkgmbr[m.sender.split('@')[0]].time)
   if (_tbkgmbr.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _tbkgmbr[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/tebakgambar.json", JSON.stringify(_tbkgmbr)) 
    }
 }
 break

  case 'math':{
   //Created by Rifza
    if (_math.hasOwnProperty(m.sender.split('@')[0])) return reply("Masih ada permainan yang sedang berlangsung")   
     let operators = {
      '+': '+',
      '-': '-',
      '*': '×'
     }  
  if (!args[0]) return reply("Mode : \nnoob | easy | medium | hard | extreme | deathzone")
  let mode = args[0]   
  if (args[0] === "noob"){
  let a = randomInt(-5, 5)
  let b = randomInt(10, 1)
  let op = pickRandom(['+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 500 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)    
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else if (args[0] === "easy"){
  let a = randomInt(-9, 9)
  let b = randomInt(99, 9)
  let op = pickRandom(['+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 1500 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else if (args[0] === "medium"){
  let a = randomInt(-99, 9)
  let b = randomInt(999, -99)
  let op = pickRandom(['*', '+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 3500 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else if (args[0] === "hard"){
  let a = randomInt(-999, 99)
  let b = randomInt(9999, -999)
  let op = pickRandom(['*', '+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 5000 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m })  
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else if (args[0] === "extreme"){
  let a = randomInt(-999, 99)
  let b = randomInt(999999, -99999)
  let op = pickRandom(['*', '+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 10000 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else if (args[0] === "veryextreme"){
  let a = randomInt(-9999, 999)
  let b = randomInt(99999999, -99999)
  let op = pickRandom(['*', '+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 25000 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else if (args[0] === "deathzone"){
  let a = randomInt(-99999, 9999)
  let b = randomInt(9999999999, -9999999)
  let op = pickRandom(['*', '+', '-'])
  let up = `${a} ${operators[op]} ${b}` 
  let result = (new Function(`return ${a} ${op} ${b < 0 ? `(${b})` : b}`))()  
  let jawaban = `${result}`
  _math[m.sender.split('@')[0]] = { user: m.sender, jawaban: jawaban.toLowerCase(), time: 60000, monay: 35000 }  
  fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math))
  console.log(jawaban)
  reply(`berapa hasil dari ${up}, waktu 60 detik!`)
  await sleep(_math[m.sender.split('@')[0]].time)
   if (_math.hasOwnProperty(m.sender.split('@')[0])) {
      sock.sendMessage(from, { text: jawaban, mentions: [m.sender] },{ quoted : m }) 
      delete _math[m.sender.split('@')[0]]
      fs.writeFileSync("./storage/user/math.json", JSON.stringify(_math)) 
    }
  } else reply('Mode itu tidak ada jancuk!')
  
  } 
  break
case 'member':{
if (!isGroup) return reply('Fitur ini hanya bisa digunakan di group!') 
if (!m.key.fromMe && !isOwner) return reply(mess.only.owner)
reply(penghunigc)
}
break
  case 'salin':
   if (!m.key.fromMe && !isOwner) return reply(mess.only.owner)
   await sock.groupCreate(q, penghunigc)
  break
  case 'culik':{
   if (!isGroup) return reply('Fitur ini hanya bisa digunakan di group!') 
   if (!m.key.fromMe && !isOwner) return reply(mess.only.owner)
   if (args.length < 1) return reply('Harap sertakan nomor target!!')  
   let mems = []
    for (let i of groupMembers) {
    i.id !== null ? mems.push(i.id) : ''
}
  sock.groupParticipantsUpdate(
     args[0], 
     mems,
     "add")
   }
   break

   case 'add':{
   if (!isGroup) return reply('Khusus Grup')
   if (!isGroupAdmins) return reply('Khusus Admin')
   if (!isBotGroupAdmins) return reply('Bot Bukan Admin')
   if (args[1]){
    let number = m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    sock.groupParticipantsUpdate(from, [number], "add")
   } 
  else 
   {
    sock.groupParticipantsUpdate(from, mentionUser, "add")
   }
   }
  break
  case 'kick':{
   if (!isGroup) return reply('Khusus Grup')
   if (!isGroupAdmins) return reply('Khusus Admin')
   if (!isBotGroupAdmins) return reply('Bot Bukan Admin')
   console.log(mentionUser)
   sock.groupParticipantsUpdate(from, mentionUser, "remove")
   }
  break
  case 'limituser':{      
   let txt = `「 *ALL LIMIT USER* 」\n\n`
     for (let i of _limit){
     txt += `➸ *ID :* @${i.id.split("@")[0]}\n➸ *Limit* : ${i.limit}\n`
     }
    reply(txt)       
  }
 break
 case 'leaderboard':{      
   let txt = `「 *LEADERBOARD* 」\n\n`
     for (let i of _buruan){
     txt += `➸ *ID :* ${i.id}\n`
     txt += `*🐟Ikan* : ${i.ikan}\n`
     txt += `*🐔Ayam* : ${i.ayam}\n`
     txt += `*🐇Kelinci* : ${i.kelinci}\n`
     txt += `*🐑Domba* : ${i.domba}\n`
     txt += `*🐄Sapi* : ${i.sapi}\n`
     txt += `*🐘Gajah* : ${i.gajah}\n\n`
     }
    reply(txt)       
  }
 break
case 'mining': case 'menambang':{
  if (!isInventory){ addInventori(m.sender) }
  if (isCekDarah < 1) return reply('Kamu kelelahan!, cobalah heal menggunakan potion') 
  let besi = [1,2,5,0,3,0,1,1,4,1,5,0,0]
  let emas = [0,1,2,3,0,0,0,1,1,0,0,2]
  let emerald = [0,0,1,0,0,1,0,2,1,0,0,1]
  var besinya = besi[Math.floor(Math.random() * besi.length)]  
  var emasnya = emas[Math.floor(Math.random() * emas.length)]  
  var emeraldnya = emerald[Math.floor(Math.random() * emerald.length)]  
  setTimeout( () => {
  let caption = `[ HASIL MENAMBANG ]\n*Besi* : ${besinya}\n*Emas* : ${emasnya}\n*Emerald* : ${emeraldnya}`
  let buttons = [
      {
       buttonId: `${prefix + order}`, 
       buttonText: {
        displayText: 'Menambang lagi⛏️'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: './storage/image/tambang.jpg' },
      caption: caption,
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
   
   }, 7000)  
  setTimeout( () => {
  reply(`@${m.sender.split("@")[0]} Mulai menambang🎣`)     
  }, 1500)
  kurangDarah(m.sender, 10)
  addBesi(m.sender, besinya)
  addEmas(m.sended, emasnya)
  addEmerald(m.sender, emeraldnya)	     
  }   
  break  
  //transaksi
 case 'beli': case 'buy':{
 if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } 
 if (!isInventoryMonay){ addInventoriMonay(m.sender) }
 if (!isInventory){ addInventori(m.sender) }
 if (!q) return reply('Mau beli apa?\n*Berikut listnya*\n> potion\n> umpan\n> limit')
 var anu = args[1]
  if (args[0] === 'potion'){
  let noh = 100000 * anu
 if (!args[1]) return reply(`Example : ${prefix + order} potion 2\n 1 potion = 100000 monay`)
 if (isMonay < noh) return reply('Sisa monay kamu tidak mencukupi untuk pembelian ini')
 kurangMonay(m.sender, noh)
 var apalu = anu * 1
 addPotion(m.sender, apalu)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Sisa monay kamu* : ${getMonay(m.sender)}\n*Potion kamu* : ${getPotion(m.sender)}`)
  }, 2000) 
 } else 
 if (args[0] === 'umpan'){
  let noh = 5000 * anu
 if (!args[1]) return reply(`Example : ${prefix + order} umpan 2\n 1 umpan = 2500 monay`)
 if (isMonay < noh) return reply('Sisa monay kamu tidak mencukupi untuk pembelian ini')
 kurangMonay(m.sender, noh)
 var apalu = anu * 1
 addUmpan(m.sender, apalu)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Sisa monay kamu* : ${getMonay(m.sender)}\n*Umpan kamu* : ${getUmpan(m.sender)}`)
  }, 2000) 
  } else 
  if (args[0] === 'limit'){
  let noh = 35000 * anu
 if (!args[1]) return reply(`Example : ${prefix + order} limit 2\n 1 limit = 35000 monay`)
 if (isMonay < noh) return reply('Sisa monay kamu tidak mencukupi untuk pembelian ini')
 kurangMonay(m.sender, noh)
 var apalu = anu * 1
 addLimit(m.sender, apalu)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Sisa monay kamu* : ${getMonay(m.sender)}\n*Limit kamu* : ${getLimit(m.sender)}`)
  }, 2000) 
  } else { reply("Format salah!") }
 }
 break
 case 'sel': case 'jual':{//BY LORD RIFZA
 if (!q) return  reply(`Mau jual apa?\n*Kamu bisa yang ada di list berikut*\n> ikan\n> ayam\n> kelinci\n> domba\n> sapi\n> gajah\n> besi\n> emas\n> emerald`)
 if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } 
 if (!isInventoryMonay){ addInventoriMonay(m.sender) }
 if (!isInventory){ addInventori(m.sender) }
 var anu = args[1]
 if (args[0] === 'ikan'){
 if (isIkan < anu) return reply('Ikan kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} ikan 2\n 1 ikan = 1500 monay`)
 kurangIkan(m.sender, anu)
 let monaynya = 1500 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Ikan kamu* : ${getIkan(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'ayam'){
 if (isAyam < anu) return reply('Ayam kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} ayam 2\n 1 ayam = 2500 monay`)
 kurangAyam(m.sender, anu)
 let monaynya = 2500 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Ayam kamu* : ${getAyam(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'kelinci'){
 if (isKelinci < anu) return reply('Kelinci kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} kelinci 2\n 1 kelinci = 3000 monay`)
 kurangKelinci(m.sender, anu)
 let monaynya = 3000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Kelinci kamu* : ${getKelinci(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'domba'){
 if (isDomba < anu) return reply('Domba kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} domba 2\n 1 domba = 5000 monay`)
 kurangDomba(m.sender, anu)
 let monaynya = 5000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Domba kamu* : ${getDomba(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'sapi'){
 if (isSapi < anu) return reply('Sapi kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} sapi 2\n 1 sapi = 10000 monay`)
 kurangSapi(m.sender, anu)
 let monaynya = 10000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Sapi kamu* : ${getSapi(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'gajah'){
 if (isGajah < anu) return reply('Gajah kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} gajah 2\n 1 gajah = 15000 monay`)
 kurangGajah(m.sender, anu)
 let monaynya = 15000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Gajah kamu* : ${getGajah(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'besi'){
 if (isBesi < anu) return reply('Besi kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} besi 2\n 1 besi = 15000 monay`)
 kurangBesi(m.sender, anu)
 let monaynya = 16000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa Besi kamu* : ${getBesi(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'emas'){
 if (isEmas < anu) return reply('Emas kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} emas 2\n 1 emas = 50000 monay`)
 kurangEmas(m.sender, anu)
 let monaynya = 50000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa emas kamu* : ${getEmas(m.sender)}`)
  }, 2000) 
 } else
 if (args[0] === 'emerald'){
 if (isEmerald < anu) return reply('Emerald kamu tidak mencukupi untuk transaksi ini')
 if (!args[1]) return reply(`Example : ${prefix + order} emerald 2\n 1 emerald = 100000 monay`)
 kurangEmerald(m.sender, anu)
 let monaynya = 100000 * anu
 addMonay(m.sender, monaynya)
  setTimeout( () => {
  reply(`Transaksi berhasil ✔️\n*Monay kamu* : ${getMonay(m.sender)}\n*Sisa emerald kamu* : ${getEmerald(m.sender)}`)
  }, 2000) 
 } else { reply("Format salah!") }

 }
 break

 case 'heal':{
 if (!isCekDarah < 1) return reply('Kamu hanya bisa heal ketika darah kamu 0')
 if (isCekDarah > 100) return reply('Darah kamu sudah penuh')
 if (isPotion < 1) return reply('Kamu tidak punya potion, cobalah beli dengan cara #buypotion _jumlah_') 
 addDarah(m.sender, 100)
 kurangPotion(m.sender, 1)
 reply('Berhasil, darah kamu sudah full')
 }
 break
 case 'berburu':{
 //Peringatan!!!!, ini buatan rifza. jangan claim punya lu:)
 if (!isDarah){ addInventoriDarah(m.sender, DarahAwal) }
 if (isCekDarah < 1) return reply('Darah kamu habis, cobalah heal menggunakan potion') 
 if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } 
  let luka = ["Tertusuk duri saat berburu","Terpeleset ke jurang saat berburu","Tercakar hewan buas","Tidak berhati-hati","Terjerat akar","Terjatuh saat berburu"]
  let location = ["Hutan rimba","Hutan Amazon","Hutan tropis","Padang rumput","Hutan afrika","Pegunungan"]
   var ikanmu = Math.ceil(Math.random() * 10)
   var ayam = Math.ceil(Math.random() * 8)
   var kelinci = Math.ceil(Math.random() * 7)
   var dombanya = [3,0,4,0,5,4,6,0,1,0,2,3,0,3,0,1]
   var sapinya = [2,0,3,0,4,0,5,0,1,0,2,0,3,0,1]
   var gajahnya = [1,0,4,0,2,0,1,0,2,1,3,0,1]
   var domba = dombanya[Math.floor(Math.random() * dombanya.length)] 
   var sapi = sapinya[Math.floor(Math.random() * sapinya.length)] 
   var gajah = gajahnya[Math.floor(Math.random() * gajahnya.length)]    
   var lukanya = luka[Math.floor(Math.random() * luka.length)]
   var lokasinya = location[Math.floor(Math.random() * location.length)]
 if (lokasinya === 'Hutan rimba') {
    var image = './storage/image/rimba.jpg'
   } else
 if (lokasinya === 'Hutan Amazon') {
    var image =  './storage/image/amazon.jpg'
   } else
 if (lokasinya === 'Hutan tropis') {
    var image = './storage/image/tropis.jpg'
   } else
 if (lokasinya === 'Padang rumput') {
    var image = './storage/image/padang_rumput.jpg'
   } else
 if (lokasinya === 'Hutan afrika') {
    var image = './storage/image/afrika.jpg'
   } else
 if (lokasinya === 'Pegunungan') {
   var image = './storage/image/pegunungan.jpg'
   }
 setTimeout( () => {
  let teksehmazeh = `_[ HASIL BURUAN ]_\n`
     teksehmazeh += `*🐟Ikan* : ${ikanmu}\n`
     teksehmazeh += `*🐔Ayam* : ${ayam}\n`
     teksehmazeh += `*🐇Kelinci* : ${kelinci}\n`
     teksehmazeh += `*🐑Domba* : ${domba}\n`
     teksehmazeh += `*🐄Sapi* : ${sapi}\n`
     teksehmazeh += `*🐘Gajah* : ${gajah}\n\n`
     teksehmazeh += `_[ INFO ]_\n`
     teksehmazeh += `*Lokasi* : ${lokasinya}\n`
     teksehmazeh += `*Terluka* : ${lukanya}, darah - 10\n`
     teksehmazeh += `*Sisa darah* : ${getDarah(m.sender)}\n`
    let buttons = [
      {
       buttonId: `${prefix + order}`, 
       buttonText: {
        displayText: 'Berburu lagi️🏹'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: image },
      caption: teksehmazeh,
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })      
  }, 5000)  
 setTimeout( () => {
  reply(`@${m.sender.split("@")[0]} Mulai berburu di ${lokasinya}`)     
  }, 1000) 
 addIkan(m.sender, ikanmu) 
   addAyam(m.sender, ayam) 
   addKelinci(m.sender, kelinci)
   addDomba(m.sender, domba)
   addSapi(m.sender, sapi)
  addGajah(m.sender, gajah)
 kurangDarah(m.sender, 10)
 }
 break
case 'owner': case 'creator': {
sock.sendContact(from, Options.info.ownerct, m)
}
break
 //primbon
  case 'artinama':{
  if (!q) return reply('Namanya siapa?')
  let namalu = await arti_nama(q)
  let teksnya = `[ *NAMA* : ${namalu.message.nama} ]\n*Arti* : ${namalu.message.arti}`
  reply(teksnya)
  console.log(namalu)
  }
  break
 case 'ramalanjodoh':{
  if (!args[0]) return reply(`Contoh!:\n #${command} anjay|anjayani`)
  if (!args.join(" ").split("|")[1]) return reply(`Contoh!:\n #${command} anjay|anjayani`)
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
   kurangLimit(m.sender, 1)
   reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
    let get_args = args.join(" ").split("|")
    let kon = get_args[0]
    let kun = get_args[1]
    const vvv = await ramalanJodoh(kon, kun).catch(e => {reply(pesan.eror)})
    const textnya = `
✔️Positif : ${vvv.positif}
----------------------------------------------------
➖Negatif : ${vvv.negatif}
`
   console.log(vvv)
    let buttons = [
      {
       buttonId: `#owner`, 
       buttonText: {
        displayText: 'Owner'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: vvv.thumb },
      caption: `*[👩‍❤️‍👨] R A M A L  J O D O H [💑]*\n\n${textnya}`,
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
   }
   break 
  case 'inventori': case 'profile':{
   if (!isDarah){ addInventoriDarah(m.sender, DarahAwal) }
   if (!isInventory){ addInventori(m.sender) }
   if (!isInventoriBuruan){ addInventoriBuruan(m.sender) }
    try {
       var ppuser = await sock.profilePictureUrl(m.sender, 'image')
         } 
       catch 
         {
       var ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
         }
  let teksehmazeh = `_[ 👩🏻‍💼INFO USER👨🏻‍💼 ]_\n\n`
     teksehmazeh += `*❤️Darah kamu* : ${getDarah(m.sender)}\n`
     teksehmazeh += `*💵Monay kamu* : ${getMonay(m.sender)}\n`
     teksehmazeh += `*◻️️Besi kamu* : ${getBesi(m.sender)}\n`
     teksehmazeh += `*🌟Emas Kamu* : ${getEmas(m.sender)}\n`
     teksehmazeh += `*💎Emerald Kamu* : ${getEmerald(m.sender)}\n`
     teksehmazeh += `*⏺️Limit kamu* : ${getLimit(m.sender)}\n`
     teksehmazeh += `*🪱Umpan kamu* : ${getUmpan(m.sender)}\n`
     teksehmazeh += `*🧪Potion Kamu* : ${getPotion(m.sender)}\n\n`
     teksehmazeh += `_[ 🐺HASIL BURUAN🐺 ]_\n`
     teksehmazeh += `*🐟Ikan* : ${getIkan(m.sender)}\n`
     teksehmazeh += `*🐔Ayam* : ${getAyam(m.sender)}\n`
     teksehmazeh += `*🐇Kelinci* : ${getKelinci(m.sender)}\n`
     teksehmazeh += `*🐑Domba* : ${getDomba(m.sender)}\n`
     teksehmazeh += `*🐄Sapi* : ${getSapi(m.sender)}\n`
     teksehmazeh += `*🐘Gajah* : ${getGajah(m.sender)}\n\n`
     let buttons = [
      {
       buttonId: `Mbuh`, 
       buttonText: {
        displayText: 'Ok'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: ppuser },
      caption: teksehmazeh,
      footer: `_*${Options.info.botName}*_`,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
  }
  break
  case 'mancing':{
  if (!isInventoriBuruan){ addInventoriBuruan(m.sender) } 
  if (isUmpan < 1) return reply('Umpan kamu habis!, cobalah berburu dan ubah dagingnya menjadi umpan')
  reply("1 umpan terpakai")
  var ikannya = ikan[Math.floor(Math.random() * ikan.length)]
  var ditangkap = Math.ceil(Math.random() * 20)
  setTimeout( () => {
  let caption = `Hasil tangkapan : ${ikannya}\n> Jumlah tangkapan : ${ditangkap}`
  let buttons = [
      {
       buttonId: `${prefix + order}`, 
       buttonText: {
        displayText: 'Mancing lagi🎣'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: './storage/image/mancing.jpg' },
      caption: caption,
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
   
   }, 7000)  
  setTimeout( () => {
  reply(`@${m.sender.split("@")[0]} Mulai memancing🎣`)     
  }, 1500)
  kurangUmpan(m.sender, 1)
  addIkan(m.sender, ditangkap)	     
  }   
  break  
  case 'darah':{
  if (!isDarah){ addInventoriDarah(m.sender, DarahAwal) }
  let dapat =  getDarah(m.sender)
  reply(`${dapat}`)
  }
  break
  case 'bacok':{
  if (isCekDarah < 1) return reply('Darah kamu habis')
   kurangDarah(m.sender, 10)
  reply('success✔️')
  }
  break
  case 'menu2':{  
   let button = [{
     index: 1, 
      urlButton: {
       displayText: 'My Github', 
       url: 'https://github.com/Rifza123'
       } 
     },     
     {
     index: 2, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
      } 
    },
    { 
     index: 3, 
      quickReplyButton: {
       displayText: 'Click2', 
       id: '#tes'
        } 
     },
     {
     index: 4, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
        } 
      },]
      m.templateButon5IMG(from, MenuList, Options.info.botName, thumb, button, m)
   }
   break
case 'komeng':
   let buttons = [{
     index: 1, 
      urlButton: {
       displayText: 'My Github', 
       url: 'https://github.com/Rifza123'
       } 
     },     
     {
     index: 2, 
      quickReplyButton: {
       displayText: '⏱️Runtime', 
       id: '#runtime'
      } 
    },
    { 
     index: 3, 
      quickReplyButton: {
       displayText: '👤Owner', 
       id: '#owner'
        } 
     },
     {
     index: 4, 
      quickReplyButton: {
       displayText: '👨Profile', 
       id: '#profile'
        } 
      }]
    await m.sendButton(
    from, 
    MenuList,
    Options.info.botName,
    buttons,
    thumb,     
    await m.createMsg(
     from, 
     {
     document: {
    url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pptx'
    }, 
    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
    fileName: 'Dasha - Ramadhan | Itsvn'
     }
     )
    )
   break

   case 'menu':
   let buttonold = [{
     index: 1, 
      urlButton: {
       displayText: 'My Github', 
       url: 'https://github.com/Rifza123'
       } 
     },     
     {
     index: 2, 
      quickReplyButton: {
       displayText: '⏱️Runtime', 
       id: '#runtime'
      } 
    },
    { 
     index: 3, 
      quickReplyButton: {
       displayText: '👤Owner', 
       id: '#owner'
        } 
     },
     {
     index: 4, 
      quickReplyButton: {
       displayText: '👨Profile', 
       id: '#profile'
        } 
      }]
    await m.sendButton(
    from, 
    MenuList,
    Options.info.botName,
    buttonold,
    thumb, 
    await m.createMsg(
     from, 
     {
     video: {
      url: './storage/video/menu1.mp4', 
      caption: "Not detected"
      }, 
      gifPlayback: true
     }
     )
    )
   break
   case 'tes':{
     m.reply(from, 'hallo', { quoted : m } )
   }
   break
   case 'temp':{
   const templateMessage = {
    text: "Hi it's a template message",
    footer: 'Hello World',
    templateButtons: [
     {
     index: 1, 
      urlButton: {
       displayText: 'My Github', 
       url: 'https://github.com/Rifza123'
      } },
     {
     index: 2, 
     callButton: {
      displayText: 'Owner', 
       phoneNumber: '6287708357324'
      } },
     {
     index: 3, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
       } },
    { 
     index: 4, 
      quickReplyButton: {
       displayText: 'Click2', 
       id: '#tes'
       } },
     {
     index: 5, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
       } },
     ],
    }
   const sendm =  sock.sendMessage(
    from, 
    templateMessage
    )
   }
  break  
  case 'runtime':{
    const templateMessage = {
    text: "ACTIVE FOR",
    footer: `${runtime(process.uptime())}`,
    templateButtons: [
     {
     index: 1, 
      urlButton: {
       displayText: 'My Github', 
       url: 'https://github.com/Rifza123'
       } }
      ]
     }
     await sock.sendMessage(
       from, 
       templateMessage
      )
    }
  break  
  case 'listsection1':{
  // send a list message!
   const sections = [
    {
	title: "Section",
	rows: [
	   {
	    title: "List1", 
	    rowId: "option"
	   },	    
     ]
    }    
    ]

  const listMessage = {
   text: "This is a list",
   footer: "This is footer text",
   title: "List message",
   buttonText: "Required, text on the button to view the list",
   sections
   }

  sock.sendMessage(from, listMessage, {quoted:m})


  }
  break
  case 'listsection2':{
  // send a list message!
   const sections = [
    {
	title: "Section 1",
	rows: [
	    {
	     title: "Option 1", 
    	 rowId: "option1"
	    },
	    {
	     title: "Option 2", 
	     rowId: "option2", 
	     description: "This is a description"
	    }
     ]
    },
    {
	title: "Section 2",
	rows: [
	    {
	     title: "Option 3", 
	     rowId: "option3"
	     },
	    {
	     title: "Option 4", 
	     rowId: "option4", 
	     description: "This is a description V2"
	    }
       ]
     },
    ]

  const listMessage = {
   text: "This is a list",
   footer: "This is footer text",
   title: "List message",
   buttonText: "Required, text on the button to view the list",
   sections
   }

  sock.sendMessage(from, listMessage, {quoted:m})


  }
  break
  
  case 'detiknews': case 'detik':{
  if (args.length < 1) return m.reply(from, 'Cari berita apa?', { quoted : m } )
  const aku_biji = await detikNews(args.join(' ')).catch(e => console.log("Undefined"))
  console.log(aku_biji)   
  let sections = []   
  for (let i = 0; i < aku_biji.length; i++) {
  const list = {title: `${aku_biji[i].Title}`,
  rows: [
	    {
	     title: `Result detik news ${i + 1}`, 
	     rowId: `#reply ${aku_biji[i].Link}`,
	     description: ``
	    }, 
	    ]
     }
     sections.push(list)   
     }
  const sendm =  sock.sendMessage(
      from, 
      {
       text: "Cari berita di detik.com",
       footer: Options.info.botName,
       title: "[ DETIK NEWS SEARCH 🔎 ]",
       buttonText: "Click and see search results➡️",
       sections
      }, {quoted:m}
    )  
   }
  break

  case 'reply':{
  let textz = q || 'undefined'
  m.reply(from, textz, { quoted : m } )
  }
  break

  case 'play': case 'lagu': case 'musik':{//INI BUATAN RIFZA!!
   if (args.length < 1) return m.reply(from, 'lagu apa?', { quoted : m } )
   const fresh =  await searchResult(args.join(' '))
   console.log(fresh)
    let sections = []   
    for (let i = 0; i < fresh.length; i++) {    
    const list = {title: `${i + 1}. ${fresh[i].title}`,
     rows: [
	    {
	     title: "[ 🎵 ] MP3", 
	     rowId: `#youtubemp3 ${fresh[i].url}`,
	     description: `👤Artist : ${fresh[i].artist}\n\n💽Album : ${fresh[i].album}\n\n📊Duration : ${fresh[i].duration.label}\n\n🔎Source : ${fresh[i].isYtMusic ? 'YouTube Music' : 'YouTube'}\n\nℹ️Id : ${fresh[i].id}`,
	    },
	    {
	     title: "[ ▶️ ] MP4", 
	     rowId: `#youtubemp4 ${fresh[i].url}`, 
	     description: `👤Artist : ${fresh[i].artist}\n\n💽Album : ${fresh[i].album}\n\n📊Duration : ${fresh[i].duration.label}\n\n🔎Source : ${fresh[i].isYtMusic ? 'YouTube Music' : 'YouTube'}\n\nℹ️Id : ${fresh[i].id}`,
	    },
       ]
      }
     sections.push(list)  
    }      
   const sendm =  sock.sendMessage(
      from, 
      {
       text: "The most complete collection of songs mp3/mp4✔️",
       footer: Options.info.botName,
       title: "[ YouTube Music Search🔎 ]",
       buttonText: "Click and see search results➡️",
       sections
      }, {quoted:m}
    )
  }
  break

  case 'youtubemp3':{
  if (args.length < 1) return reply('linknya?')
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)  
   try{
    await yta(args[0])
.then((res) => {
     const { dl_link } = res
      axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then((a) => {
   
      sock.sendMessage(from, { audio: { url: dl_link }, mimetype: 'audio/mp4' }, { quoted: m })
      })
     
})
     } catch (e){
    m.reply(from, `Akses ditolak, tidak dapat mengunduh!. Cobalah menggunakan link yang lain`, { quoted : m })
   }
  }
  break

  case 'youtubemp4':{
  if (args.length < 1) return reply('linknya?')
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
   try{
    await ytv(args[0])
.then((res) => {
     const { dl_link } = res
      axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then((a) => {
   
      sock.sendMessage(from, { video: { url: dl_link }, caption: "This is the result\nHope you are happy with our service😊" }, { quoted: m })
      })
     
})
     } catch (e){
    m.reply(from, `Akses ditolak, tidak dapat mengunduh!. Cobalah menggunakan link yang lain`, { quoted : m })
   }
  }
  break
  
  
  /*  
  case 'p':
   sock.sendMessage(
     from, 
     { 
      image: { 
       url: "https://img.utdstc.com/icon/3e9/711/3e9711e51ca1450b414c8a6e653e69525cefab1d3f3e7c4c5d5767383aa51242" 
       } 
      }, 
     { quoted: m }
    )
  break 
  */
  case 'unduh':{
  try{
  let filename = Math.ceil(Math.random() * 99999)
   if (m.isQuotedImage) {
  var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
  var buffer = Buffer.from([])
   for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
   }
    fs.writeFileSync('./' + filename + '.jpg', buffer)
    reply('success')
    sock.sendMessage(from, { image: { url: './' + filename + '.jpg' }}, { quoted: m })

  } else if (m.isQuotedVideo) {
    var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
  var buffer = Buffer.from([])
   for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
   }
   let filename = Math.ceil(Math.random() * 99999)
    fs.writeFileSync('./' + filename + '.mp4', buffer)
    reply('success')
    sock.sendMessage(from, { video: { url: './' + filename + '.mp4' }}, { quoted: m })
  } else if (!m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true){
   var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
   var buffer = Buffer.from([])
   for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
     }
     fs.writeFileSync('./' + filename + '.webp', buffer)
     webp2mp4File('./' + filename + '.webp').then( data => {
     fs.unlinkSync('./' + filename + '.webp')
     sock.sendMessage(from, { video: { url: data.result }}, { quoted: m })
     })
  } else if (m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage){
  var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     fs.writeFileSync('./' + filename + '.jpg', buffer)
   reply('success')
   sock.sendMessage(from, { image: { url: './' + filename + '.jpg' }}, { quoted: m })
   }
   } catch { reply(`Reply gambar/video/sticker dengan caption ${prefix + 'unduh'}`) }
  }
 break
  case 'jadigambar': case 'toimg': case 'toimage':{
   if (!m.isQuotedSticker) return reply('Reply stikernya!')
   if (!m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) return reply ('Kalo toimg stikernya jangan yang bergerak tod!')
    reply('Please wait.....')
    var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     fs.writeFileSync(`./666.jpg`, buffer)     
     sock.sendMessage(from, { image: { url: `./666.jpg` }}, { quoted: m })
   }
  break
 case 'tomp4':{
   if (!m.isQuotedSticker) return reply('Reply stikernya!')
   if (m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) return reply ('Kalo yang ini stikernya wajib yang bergerak tod!')
    reply('Please wait.....')
    var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     fs.writeFileSync(`./999.webp`, buffer)
     webp2mp4File(`./999.webp`).then( data => {
     fs.unlinkSync(`./999.webp`)
     sock.sendMessage(from, { video: { url: data.result }}, { quoted: m })
     })
   }
  break
 case 'togif':{
 try{
  if (!m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true){
    reply('Please wait.....')
    var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     fs.writeFileSync(`./999.webp`, buffer)
     webp2mp4File(`./999.webp`).then( data => {
     fs.unlinkSync(`./999.webp`)
     sock.sendMessage(from, { video: { url : data.result }, caption: "Nih", gifPlayback: true}, { quoted: m } )
     })
    } 
    } catch { reply(`reply sticker dengan caption ${prefix + 'togif'}\n "(Sticker harus yang bergerak!)"`)}
   }
  break
 case 'tomp3':{
    if (!m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage) return reply ('Reply videonya tod!')
    reply('Please wait.....')
    var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
   }
   fs.writeFileSync('./' + 777 + '.mp3', buffer)
   sock.sendMessage(from, { audio: {url : './777.mp3'}, mimetype: 'audio/mp4'}, {quoted: m})    
   }
  break
 case 'tovn':{
 try{
   if (m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage){
    reply('Please wait.....')
    var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     fs.writeFileSync(`./101010.mp3`, buffer)
      sock.sendMessage(from, { audio: {url : './101010.mp3'}, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
   } else if (m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage){
    reply('Please wait.....')
     var stream = await downloadContentFromMessage(m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
    var buffer = Buffer.from([])
     for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
   }
   fs.writeFileSync('./' + 777 + '.mp3', buffer)
   sock.sendMessage(from, { audio: {url : './777.mp3'}, mimetype: 'audio/mp4', ptt: true}, {quoted: m})    
   } 
   } catch { reply(`Reply audio/video dengan caption ${prefix + 'tovn'}`) } 
  }
  break
  case 'sticker': case 'stiker': case 's': case 'stickergif': case 'sgif': case 'stikergif': case 'stikgif':{			   			   
  try{
   if (m.isQuotedImage) {
    var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
    var buffer = Buffer.from([])
    for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
    }
   
    let ran = '666.webp'
    fs.writeFileSync(`./${ran}`, buffer)
     ffmpeg(`./${ran}`)
     .on("error", console.error)
     .on("end", () => {
      exec(`webpmux -set exif ./FunctionMD/sticker/data.exif ./${ran} -o ./${ran}`, async (error) => {
      sock.sendMessage(
          from, 
          { 
         sticker: fs.readFileSync(`./${ran}`) 
         })				
        fs.unlinkSync(`./${ran}`)			       
       })
      })
	 .addOutputOptions([
       "-vcodec", 
 	   "libwebp", 
 	   "-vf", 
	   "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
	  ])
	 .toFormat('webp')
	 .save(`${ran}`)
	 
    } 
    
   else 
   
  if (m.isQuotedVideo) {
   var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
   var buffer = Buffer.from([])
   for await(const chunk of stream) {
	  buffer = Buffer.concat([buffer, chunk])
	 }
   var rand2 = '777.webp'
	fs.writeFileSync(`./${rand2}`, buffer)
     ffmpeg(`./${rand2}`)
	 .on("error", console.error)
	 .on("end", () => {
	 exec(`webpmux -set exif ./FunctionMD/sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
	 sock.sendMessage(
	  from, 
	    { 
	     sticker: fs.readFileSync(`./${rand2}`) 
	     }, 
	    { 
	     quoted: m 
        })
    	fs.unlinkSync(`./${rand2}`)
	  })
	})
   .addOutputOptions([
     "-vcodec", 
     "libwebp", 
     "-vf", 
     "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
    ])
   .toFormat('webp')
   .save(`${rand2}`)
   
    } 
    
   else 
   
    {
    
      m.reply(
        from, 
        `Reply gambar/video\n  [ *BATAS MAKSIMUM 10 DETIK*❗ ]\nDengan caption : ${prefix + order}`, 
        { 
         quoted : m 
         } 
       )
      }
     } catch (e){ 
     sock.sendMessage(
     from, 
     { 
      sticker: { 
       url: "https://f.top4top.io/p_2252t7a7n1.jpg" 
       } 
      }, 
     { quoted: m }
    )
    }
   }
  break
  case 'promote':{
  // title & participant
  if (!isGroupAdmins) return reply('Khusus Admin')
  if (!isBotGroupAdmins) return reply('Bot Bukan Admin')
  console.log(mentionUser)
  let menz = mentionUser
		await sock.groupParticipantsUpdate(
		 from, 
		 mentionUser, 
		 "promote"
		 )
		 sock.sendMessage(from, { text: `@${m.user.split("@")[0]}`, mentions: [mentionUser] }, { quoted : m })  
	   .catch((err) => m.reply(from, err, {quoted : m }))
	  }
  break
  case 'demote':{
  // title & participant
  if (!isGroupAdmins) return reply('Khusus Admin')
  if (!isBotGroupAdmins) return reply('Bot Bukan Admin')
   console.log(mentionUser)
   sock.groupParticipantsUpdate(
	 	  from, 
		  mentionUser, 
		  "demote"
		 )
		 .catch((err) => m.reply(from, err, {quoted : m })
	  )
	}
  break
 case 'id':{
 if (!m.key.fromMe && !isOwner) return reply(mess.only.owner)
 reply(from)
 }
 break
case 'admin':
reply(groupAdmins)
break
  case 'sound1':{
   sock.sendMessage(
   from, 
   { 
    audio: {
     url : `https://k.top4top.io/m_2279djqoy1.mp3`
    }, 
    mimetype: 'audio/mp4', 
    ptt: true
    }, 
    {
    quoted: m
   }
   )
  }
  break
  case 'waifu': case 'megumin':case 'shinobu':case 'awoo': case 'neko':{
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
  try{
   let za = await fetchJson(`https://waifu.pics/api/sfw/${order}`)              
    let buttons = [
      {
       buttonId: `${prefix + order}`, 
       buttonText: {
        displayText: 'Next'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: za.url },
      caption: "Result",
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
   } catch { reply("Maaf, sepertinya terjadi kesalahan dalam pengiriman gambar") }
 }
 break

  case 'hapus': case 'delete': case 'del': case 'd':{
      if (!m.quoted) return  m.reply(from, 'Reply pesanya!', { quoted : m })
       if (!m.quoted.isBaileys) return  m.reply(from, 'Fitur ini hanya berlaku menghapus pesan bot yang di kirim oleh saya!', { quoted : m })
          sock.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
         }
      break
  
  case 'wallpaperaccess':{
  if (args.length < 1) return m.reply(from, 'Cari gambar apa?', { quoted : m } )
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
  try{
  const aku_biji = await wallpaperaccess(q)
  let jsonData = aku_biji
  let kamu_telor = Math.floor(Math.random() * jsonData.length);
  let anunya = jsonData[kamu_telor]; 
  console.log(anunya.link)
  let buttons = [
      {
       buttonId: `#wallpaperaccess ${q}`, 
       buttonText: {
        displayText: 'Next'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: anunya.link },
      caption: "Result",
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
    } catch (e) { e = String(e)
      m.reply(from, 'Tidak ditemukan!', { quoted : m } )
   }
  }
  break 
  case 'pinterest':{
  if (args.length < 1) return m.reply(from, 'Cari gambar apa?', { quoted : m } )
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
  try{
  const pint = await pinterest(`${q}`)
  let xm_za = pint[Math.floor(Math.random() * pint.length)];
  console.log(pint)
  let buttons = [
      {
       buttonId: `#pinterest ${q}`, 
       buttonText: {
        displayText: 'Next'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: xm_za },
      caption: `[ PINTEREST SEARCH ]\nHasil dari pencarian ${q}`,
      footer: Options.info.botName,
      buttons: buttons,
      headerType: 4
     }
     sock.sendMessage(from, buttonMessage, { quoted: m })
    } catch (e) { e = String(e)
      m.reply(from, 'Tidak ditemukan!', { quoted : m } )
   }
  }
  break 
  case 'hoorror_blood':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.hoorror_blood}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
   break 
   case 'sand':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.sand}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
   break
   case 'ssweb':{
   if (!q) return reply('Harap sertakan link!')
   sock.sendMessage(from, { image: { url : 'https://image.thum.io/get/width/1900/crop/1000/fullpage/' + q }, caption: `Done✔️`}, { quoted: m } )
   }
   break
   case 'sswebhp':{
   if (!q) return reply('Harap sertakan link!')
   let url = `https://api.screenshotmachine.com/?key=${Options.api.ss}&url=${q}&device=phone&dimension=480x800&format=jpg&cacheLimit=0&delay=2000&accept-language=id`
   sock.sendMessage(from, { image: { url : url }, caption: `Done✔️`}, { quoted: m } )
   }
   break
   case 'magma':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.magma}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'blackpink':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.blackpink}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'pornhub':{
    if (args.length < 1) return m.reply(from, `Teks?\n\ncontoh : #pornhub anu|hub`, { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let teks1 = q.split("|")[0]
     let teks2 = q.split("|")[1]
     let link = `${textproo.pornhub}`
     let anu = await textpro2(link, 
     [
     `${teks1}`,
     `${teks2}`
     ])
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'sketch':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.sketch}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'glass':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.glass}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
   break
   case 'lightglow':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.lightglow}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'sci_fi':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
      if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
      kurangLimit(m.sender, 1)
      reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
      let link = `${textproo.sci_fi}`
      let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
  }
  break
  case 'ice':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.ice}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'demon':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.gdemon}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'batman':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.batman}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'sea_metal':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.sea_metal}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'skeleton':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.skeleton}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'warning':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.warning}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'transformer':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.transformer}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'denim':{
    if (args.length < 1) return m.reply(from, 'Teks?', { quoted : m } )
     if (!isInventoryLimit){ addInventoriLimit(m.sender) }
     if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
     kurangLimit(m.sender, 1)
     reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
     let link = `${textproo.denim}`
     let anu = await textpro(link, q)
     console.log(anu)
    sock.sendMessage(from, { image: { url : anu }, caption: `Nih kak, jangan lupa follow ig owner\n${Options.info.igowner}`}, { quoted: m } )
   }
  break
  case 'tiktokaudio':{
  if (!q) return reply('Linknya?')
  if (!q.includes('tiktok')) return reply('Itu bukan link tiktok!')
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`) 
   const musim_rambutan = await TiktokDownloader(`${q}`).catch(e => { reply(pesan.eror) } )
   console.log(musim_rambutan)
   const musim_duren_a = musim_rambutan.result.nowatermark
    sock.sendMessage(from, { audio: { url: musim_duren_a }, mimetype: 'audio/mp4' }, { quoted: m })
   }
 break

  case 'tiktokvideo':{
  if (!q) return reply('Linknya?')
  if (!q.includes('tiktok')) return reply('Itu bukan link tiktok!')
  if (!isInventoryLimit){ addInventoriLimit(m.sender) }
  if (isLimit < 1) return reply("Limit kamu sudah habis ಥ╭╮ಥ, silahkan beli dengan cara #buy limit _jumlah_")
  kurangLimit(m.sender, 1)
  reply(`Satu limit terpakai ಥ‿ಥ\nSisa limit kamu : ${getLimit(m.sender)}`)
   const musim_rambutan = await TiktokDownloader(`${q}`).catch(e => { reply(pesan.eror) } )
   console.log(musim_rambutan)
   const musim_duren_v = musim_rambutan.result.nowatermark
    sock.sendMessage(from, { video: { url: musim_duren_v }, caption: "This is the result\nHope you are happy with our service😊" }, { quoted: m })
   }
  break
  case 'afk':{
  let date = + new Date
  const alasan = q ? q : 'Gatau ngapain.'
  afk.addAfkUser(m.sender, date, alasan, time, _afk)
  reply(`*@${m.sender.split("@")[0]}* sekarang sedang afk\n*Dengan alasan* : ${alasan}`)
  }
  break
  case 'self':
  if (!m.key.fromMe && !isOwner) return reply(pesan.khusus.owner)
  if (banChats === true) return
   banChats = true
   reply(' ```「 SELF MODE 」``` ')
  break 
  case 'public':
  if (!m.key.fromMe && !isOwner) return reply("khusus owner")
  if (banChats === false) return 
   banChats = false
   reply(' ```「 PUBLIC MODE 」``` ')
  break
  default:
  
  if (isCmd) {
   m.reply(
    from, 
    '_Command Notfound_', 
    { 
     quoted : m 
    }
   )
  } 
   
  } } catch(e) { e = String(e) 
  if (e.includes("rate-overlimit")) {return}
  if (e.includes('Connection Closed')){ return }
  if (e.includes('Timed Out')){ return }
   console.log(color(e, 'cyan')) 
  } }
  
  const LordThunder = require.resolve(__filename)
  fs.watchFile(LordThunder, () => {
  fs.unwatchFile(LordThunder)
  console.log(color(`New! >`, 'cyan'), color(`${__filename}`, 'gray'))
  delete require.cache[LordThunder]
  require(LordThunder)
  } )