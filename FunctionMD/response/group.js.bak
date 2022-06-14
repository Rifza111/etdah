  const fs = require("fs");
  const { getBuffer } = require('../function.js')
  const { spawn, exec } = require('child_process')
  const PhoneNumber = require('awesome-phonenumber')
  const groupResponse = async (sock, update) => {
   const metadata = await sock.groupMetadata(update.id)   
   for (let participant of update.participants) {
    try{
       let metadata = await sock.groupMetadata(update.id)
       let participants = update.participants
       for (let num of participants) {
          if (update.action == 'add') {  
          try {
           ppuser = await sock.profilePictureUrl(num, 'image')
         } catch {
           ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
         }
          let pp = await getBuffer(ppuser)
         var rand7 = 'pp.jpg'
         fs.writeFileSync(`./storage/image/${rand7}`, pp) 
         let numbr = num.replace('@s.whatsapp.net', '')          
        exec(`magick './storage/image/welcome.jpg' -size 1024x450 -fill 'black' -font './storage/result/futur.ttf' -pointsize 32 -interline-spacing 1 -annotate +10+370 '${numbr}' -fill 'white' -font './storage/result/Beam.ttf' -pointsize 32 -interline-spacing 1 -annotate +470+350 '${metadata.subject}' './storage/image/pp.jpg' -resize %[fx:t?u.w*0.2:u.w]x%[fx:?u.h*0.2:u.h] -gravity center -geometry -340+20  -composite 'hamsil.jpg'`) 
          var button = [
             { 
              buttonId: `ahsudahlah`, 
              buttonText: { 
               displayText: `Welcome👋` 
               }, type: 1 
              }
             ]   
         setTimeout( () => {    
         sock.sendMessage(
         update.id, 
         { 
         caption: `*Hello @${num.split("@")[0]} Welcome to ${metadata.subject}* \n\nDon't forget to get acquainted with the admin here\nfan don't forget to obey the rules in this group*`, 
         image: { 
          url: './hamsil.jpg' 
         }, 
         buttons: button, 
         footer: 'T-XM_Multi~Device', mentions: [num] })        
          }, 1000)
         } 
        else 
        if (update.action == 'remove') {
        try {
           ppuser = await sock.profilePictureUrl(num, 'image')
         } catch {
           ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
         }
         let pp = await getBuffer(ppuser)
         var rand7 = 'pp.jpg'
         fs.writeFileSync(`./storage/image/${rand7}`, pp) 
         let numbr = num.replace('@s.whatsapp.net', '')          
        exec(`magick './storage/image/leave.jpg' -size 1024x450 -fill 'black' -font './storage/result/futur.ttf' -pointsize 32 -interline-spacing 1 -annotate +10+370 '${numbr}' -fill 'white' -font './storage/result/Beam.ttf' -pointsize 32 -interline-spacing 1 -annotate +470+350 '${metadata.subject}' './storage/image/pp.jpg' -resize %[fx:t?u.w*0.2:u.w]x%[fx:?u.h*0.2:u.h] -gravity center -geometry -340+20  -composite 'hamsil.jpg'`)
          var button = [
             { 
              buttonId: `ahsudahlah`, 
              buttonText: { 
               displayText: `Bye👋` 
               }, type: 1 
              }
             ]
        setTimeout( () => {
        sock.sendMessage(
           update.id, 
          { 
           caption: `*@${num.split("@")[0]} leave the group ${metadata.subject}*\nWhy did he come out huh?, ummm...`, 
           image: { 
           url: './hamsil.jpg' 
          }, 
           buttons: button, 
           footer: 'T-XM_Multi~Device', 
           mentions: [num] 
             }
             )
             }, 1000)
             }
            }
        } catch (err) {
        console.log(err)
      }
    }   
  }
module.exports = { groupResponse }  
