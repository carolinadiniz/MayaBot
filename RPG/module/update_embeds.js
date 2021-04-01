const losa = require('../../module/losa')
const update = require('./update')

module.exports = {
    newchar: async (client, message, user, verification) => {
        // Carregando Variáveis
        userID = user.id
        guildID = message.channel.guild.id
        channelID = message.channel.id
        characters = losa.load(`./RPG/database/serverID_${guildID}.json`)

        // Verificando Reactions
        if(verification == false) {
            // Emoji
            count = 1
            message.reactions.cache.find( emoji => {
                if(emoji.me == false) {
    
                    // Classes
                    switch (count) {
                        // 🗡️ tachi
                        case 1:
                            characters[userID].class = 'Tachi'
                            break;
                            
                        // 🧙 cleric
                        case 2:
                            characters[userID].class = 'Cleric'
                            break;
                                
                        default:
                            break;
                    }
                }
                count += 1
            })
            message.reactions.removeAll()
        }

        // Editando Embed
        classe = characters[`${userID}`].class + '                 '.substr(characters[`${userID}`].class == null ? 0 : characters[`${userID}`].class.length)
        nivel = '   '.substr(characters[`${userID}`].level.length) + characters[`${userID}`].level

        // Embed
        Embed_Message = {
            type: 'rich',
            color: "faa3ff",
            author: {
                proxy_icon_url: `https://cdn.discordapp.com/avatars/${userID}/${user.avatar}.webp`,
                name: `${user.username}#${user.discriminator}`,
                icon_url: `https://cdn.discordapp.com/avatars/${userID}/${user.avatar}.webp`
            },
            fields: [
                {
                    value: '---------------------------------------',
                    name: 'Classe: `' + `${characters[`${userID}`].class == null ? '                 ' : classe }` + '`\n' + 
                    'Nivel:    `'+ `${nivel}` + 
                    '`      XP:  `100.1%`',
                    inline: false
                },
                {
                    name: 'Escolha sua classe',
                    value: '🗡 Tachi\n' + 
                    '🧙 Cleric',
                    inline: true
                }
            ],
            footer: {
                text: `ID do usuário: ${userID}`
            }
        }

        // Saving changes
        losa.save(characters, `./RPG/database/serverID_${guildID}.json`)

        // Enviando Mensagem
        if(verification == false) {
            message.edit({ embed: Embed_Message })
        }
        else {
            message = await client.guilds.cache.get(guildID).channels.cache.get(channelID).send({ embed: Embed_Message })
        }
        message.react('🗡️')
        message.react('🧙')
    },

    infoChar: (message) => {
        // Carregando Variáveis
        guildID = message.channel.guild.id
        channelID = message.channel.id
        userID = message.author.id
        characters = losa.load(`./RPG/database/serverID_${guildID}.json`)

        // Editando Embed
        nivel = '   '.substr(characters[`${userID}`].level.length) + characters[`${userID}`].level
        classe = characters[`${userID}`].class + '                 '.substr(characters[`${userID}`].class == null ? 0 : characters[`${userID}`].class.length)
        subclasse = characters[`${userID}`].subclass + '                    '.substr(characters[`${userID}`].subclass == null ? 0 : characters[`${userID}`].subclass.length)
        DMG = '                       '.substr(`${characters[userID].STATS.DMG.calculed}`.length) + characters[userID].STATS.DMG.calculed
        CRIT = '                     '.substr(`${characters[userID].STATS.CRIT.calculed}`.length) + characters[userID].STATS.CRIT.calculed
        SPD = '                      '.substr(`${characters[userID].STATS.SPD.calculed}`.length) + characters[userID].STATS.SPD.calculed
        HP = '                       '.substr(`${characters[userID].STATS.HP.max}`.length) + characters[userID].STATS.HP.max
        DEF = '                       '.substr(`${characters[userID].STATS.DEF.calculed}`.length) + characters[userID].STATS.DEF.calculed
        EVA = '                      '.substr(`${characters[userID].STATS.EVA.calculed}`.length) + characters[userID].STATS.EVA.calculed
        CRITDMG = '                  '.substr(`${characters[userID].STATS.CRITDMG}`.length) + characters[userID].STATS.CRITDMG
        ACC = '                      '.substr(`${characters[userID].STATS.ACC}`.length) + characters[userID].STATS.ACC
        HEAL = '                     '.substr(`${characters[userID].STATS.HEAL}`.length) + characters[userID].STATS.HEAL
        
        // Embed
        Embed_Message = {
            type: 'rich',
            color: "faa3ff",
            author: {
                proxy_icon_url: `https://cdn.discordapp.com/avatars/${userID}/${message.author.avatar}.webp`,
                name: `${message.author.username}#${message.author.discriminator}`,
                icon_url: `https://cdn.discordapp.com/avatars/${userID}/${message.author.avatar}.webp`
            },
            fields: [
                {
                    name: '🐱‍👤**Character**\n'+
                    '**Classe:** `'+`${characters[userID].class == null ? '                 ' : classe }` + '`\n' + 
                    '**Sub:**      `'+`${characters[userID].subclass == null ? '                 ' : subclasse }` + '`\n' + 
                    '**Nivel:**   `'+`${nivel}`+'`      **XP:**  `100.1%`',
                    value: '_._',
                    inline: true
                },
                {
                    name: '❤️ HP:  ' + characters[userID].STATS.HP.now +' / '+ characters[userID].STATS.HP.max + '\n' + 
                    '`🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥`\n'+ 
                    '💧 MP:  ' + characters[userID].STATS.MP.now +' / '+ characters[userID].STATS.MP.max + '\n' + 
                    '`🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦`',
                    value: '_._',
                    inline: true
                },
                {
                    name: '💠 Gear Attributes',
                    value: '---------------------------------------',
                    inline: false
                },
                {
                    name: '📋 Attributes',
                    value: ':boom:`DMG: '+`${DMG}`+'`\n'+
                    ':anger:`CRIT: '+`${CRIT}`+'%`\n'+
                    ':person_running:`SPD: '+`${SPD}`+'%`\n'+

                    ':heart:`HP:  '+`${HP}`+'`\n'+
                    ':shield:`DEF: '+`${DEF}`+'`\n'+
                    ':person_running:`EVA: '+`${EVA}`+'%`\n'+

                    ':anger:`CRITDMG: '+`${CRITDMG}`+'%`\n'+
                    ':dart:`ACC: '+`${ACC}`+'%`\n'+
                    ':syringe:`HEAL: '+`${HEAL}`+'%`\n',
                    inline: true
                },
                {
                    name: '📋 Attributes',
                    value: ':boom:`DMG: '+`${DMG}`+'`\n'+
                    ':anger:`CRIT: '+`${CRIT}`+'%`\n'+
                    ':person_running:`SPD: '+`${SPD}`+'%`\n'+

                    ':heart:`HP:  '+`${HP}`+'`\n'+
                    ':shield:`DEF: '+`${DEF}`+'`\n'+
                    ':person_running:`EVA: '+`${EVA}`+'%`\n'+

                    ':anger:`CRITDMG: '+`${CRITDMG}`+'%`\n'+
                    ':dart:`ACC: '+`${ACC}`+'%`\n'+
                    ':syringe:`HEAL: '+`${HEAL}`+'%`\n',
                    inline: true
                }
            ],
            footer: {
                text: `ID do usuário: ${userID}`
            }
        }

        // Enviar Mensagem
        message.channel.send({ embed: Embed_Message })
    }
}