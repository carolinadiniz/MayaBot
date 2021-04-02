const losa = require('../../module/losa')
const update = require('./update')
const update_embeds = require('./update_embeds')

module.exports = async (client, message) => {
    guildID = message.channel.guild.id
    userID = message.author.id

    characters = losa.load(`./RPG/database/serverID_${guildID}.json`)

    characters[`${userID}`] = {
        name: message.author.username,
        level: 0,
        XP: 1,
        class: null,
        subclass: null,

        STATS: {
            MP: { now: 100, max: 100 },

            DMG:  { calculed: 0, percent: 0, points: 0 },
            CRIT: { calculed: 0, percent: 0, points: 0 },
            SPD:  { calculed: 0, percent: 0, points: 0 },
    
            HP:   { now: 0, max: 0, points: 0 },
            DEF:  { calculed: 0, percent: 0, points: 0 },
            EVA:  { calculed: 0, percent: 0, points: 0 },
 
            CRITDMG: 130,
            ACC:  0,
            HEAL: 100,

            DETAILED: {
                Offensive: {
                    PriWpmDmgBns: 0,
                    PriWpmCR: 0,
                    PriWpmCDmg: 0,
                    DmgBnsAgstBss: 0,
                    CRBnsAgstBss: 0,
                    CDmgBnsAgstBss: 0,
                    DmgBnsAgstElites: 0,
                    CRBnsAgstElites: 0,
                    CDmgBnsAgstElites: 0,
                    DmgBnsAgstPls: 0,
                    CRBnsAgstPls: 0,
                    CDmgBnsAgstPls: 0,
                    DmgBnstoStormTgs: 0,
                    DmgBnstoFlameTgs: 0,
                    DmgBnstoLightningTgs: 0,
                    DmgBnstoIceTgs: 0,
                    DmgBnstoHolyTgs: 0,
                    DmgBnstoDarkTgs: 0,
                    Pen: 0
                },
                Defensive: {
                    GrlDmgRdct: 0,
                    GrlCRRdct: 0,
                    GrlCDmgRdct: 0,

                    BossDmgRdct: 0,
                    BossCRRdct: 0,
                    BossCDmgRdct: 0,

                    EliteDmgRdct: 0,
                    EliteCRRdct: 0,
                    EliteCDmgRdct: 0,

                    PlayerDmgRdct: 0,
                    PlayerCRRdct: 0,
                    PlayerCDmgRdct: 0,

                    BnstoHealPotency: 0,
                    BnstoRcvHeal: 0,
                    DmgDealAbsorvedasHP: 0,
                    DmgTakenRfcBack: 0,
                    XPBnsfromDefeatingMonsters: 0,
                    DropRateBns: 0,

                    RcvStormDmgRdc: 0,
                    RcvFlameDmgRdc: 0,
                    RcvLightningDmgRdc: 0,
                    RcvIceDmgRdc: 0,
                    RcvHolyDmgRdc: 0,
                    RcvDarkDmgRdc: 0
                }
            },
        },

        EQUIPMENT: {
            weapon:     { id: null, ATKB: 100, fort: 0, stars: 0 },
            weaponsub:  { id: null, ATKB: 100, fort: 0, stars: 0 },
            trophy1:    { id: null, ATKB: 100, fort: 0, stars: 0 },
            trophy2:    { id: null, ATKB: 100, fort: 0, stars: 0 },
            necklace:   { id: null, ATKB: 100, fort: 0, stars: 0 },
            ring:       { id: null, ATKB: 100, fort: 0, stars: 0 },
            back:       { id: null, ATKB: 100, fort: 0, stars: 0 },
            helmet:     { id: null, ATKB: 100, fort: 0, stars: 0 },
            armor:      { id: null, ATKB: 100, fort: 0, stars: 0 },
            belt:       { id: null, ATKB: 100, fort: 0, stars: 0 },
            gloves:     { id: null, ATKB: 100, fort: 0, stars: 0 },
            boots:      { id: null, ATKB: 100, fort: 0, stars: 0 },
            holySpirit: { id: null, ATKB: 100, fort: 0, stars: 0 },
            gaiaEmblem: { id: null, ATKB: 100, fort: 0, stars: 0 }
        },

        ENVOY: {
            temp: null
        },

        MASTERIES: {
            general: null,
            attack: null,
            advance: null,
            defense: null,
            tactical: null,
            special: null
        },

        COSTUMES: {
        }
    }

    losa.save(characters, `./RPG/database/serverID_${guildID}.json`)

    update(userID, guildID)

    // Sending Message with Embed
    update_embeds.newchar(client, message, message.author, 'new')
}


/*
QSL ENTENDIDO
QSJ DINHEIRO
QTI A Caminho
QRL 
QSV 
QTAH 
QRU ocorrencia
QTH local
TKS
*/