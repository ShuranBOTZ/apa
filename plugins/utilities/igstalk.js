exports.run = {
   usage: ['igstalk'],
   use: 'username',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'hosico_cat'), m)
         client.sendReact(m.chat, 'π', m.key)
         let json = await Api.igstalk(args[0])
         if (!json.status) return client.reply(m.chat, Func.texted('bold', `π© Account not found.`), m)
         let caption = `δΉ  *I G - S T A L K*\n\n`
         caption += `	β¦  *Name* : ${json.data.full_name}\n`
         caption += `	β¦  *Username* : ${json.data.username}\n`
         caption += `	β¦  *Posts* : ${Func.formatNumber(json.data.edge_owner_to_timeline_media.count)}\n`
         caption += `	β¦  *Followers* : ${Func.formatNumber(json.data.edge_followed_by.count)}\n`
         caption += `	β¦  *Followings* : ${Func.formatNumber(json.data.edge_follow.count)}\n`
         caption += `	β¦  *Bio* : ${json.data.biography}\n`
         caption += `	β¦  *Private* : ${Func.switcher(json.data.is_private, 'β', 'Γ')}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            ads: false,
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.profile_pic_url)
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}