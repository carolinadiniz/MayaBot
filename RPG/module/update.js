const losa = require('../../module/losa')

module.exports = (userID, guildID) => {
    // Variáveis
    const characters_Path = `./RPG/database/serverID_${guildID}.json`
    characters = losa.load(characters_Path)
    user_char = characters[userID]
    base = losa.load('./RPG/database/level_base.json')[`level_${user_char.level}`]

    // Upando personagem
    if(user_char.XP >= base.XP) {
        user_char.XP = 0
        user_char.level += 1
        base = losa.load('./RPG/database/level_base.json')[`level_${user_char.level}`]
    }

    // Criando Variáveis
    DMG_gear = 0
    DMG_gearPer = 0
    DMG_envoyPer = 0
    DMG_statPoints = 0
    DMG_masteries = 0
    DMG_titles = 0
    DMG_fishing = 0
    DMG_gearSetBonus = 0
    DMG_contributionEidoStats = 0

    CRIT_flatPer = 0
    CRIT_statPerInc = 0
    CRIT_gear = 0
    CRIT_titles = 0
    CRIT_contributionEidoStats = 0

    SPD_flatPer = 0
    SPD_statPerInc = 0
    SPD_gear = 0
    SPD_titles = 0
    SPD_contributionEidoStats = 0

    HP_gearSetBonus = 0
    HP_statPerInc = 0
    HP_gear = 0
    HP_titles = 0
    HP_contributionEidoStats = 0

    DEF_flatPer = 0
    DEF_statPerInc = 0
    DEF_gear = 0
    DEF_titles = 0
    DEF_contributionEidoStats = 0
    
    EVA_flatPer = 0
    EVA_statPerInc = 0
    EVA_gear = 0
    EVA_titles = 0
    EVA_contributionEidoStats = 0

    /*
    // Equipment STATS
    Object.keys(user_char.equipment).forEach(element => {
        equip = user_char.equipment[element]
        if(equip.id != null) {
            DMG_gear += items[equip.id].stats.DMG * (equip.Bonus/100)
            DEF_statPerInc += items[equip.id].stats.DEFper
            HP_statPerInc += items[equip.id].stats.HPper
        }
    })
    */

    // Cálculo
    λ = Math.pow((0.05*user_char.level*(user_char.level + 1)) + (1.5-(user_char.level*0.05)), -1)

    DMG = (base.DMG + DMG_gear)*(1 + (parseInt(`${((DMG_gearPer + DMG_envoyPer + (user_char.STATS.DMG.points * 0.35) + DMG_masteries)*100)}`)/10000)) + (DMG_titles+DMG_fishing+DMG_gearSetBonus+DMG_contributionEidoStats)
    CRIT = CRIT_flatPer + (user_char.STATS.CRIT.points*0.25) + λ * (((1+(1/100)*CRIT_statPerInc) * (base.CRIT + CRIT_gear)) + CRIT_titles + CRIT_contributionEidoStats)
    SPD = SPD_flatPer + (user_char.STATS.SPD.points*0.3) + λ * (((1+(1/100)*SPD_statPerInc) * (base.SPD + SPD_gear)) + SPD_titles + SPD_contributionEidoStats)
    HP = (base.HP + HP_gear)*(1+(1/100)*HP_statPerInc)*(1+ user_char.STATS.HP.points*0.0058)+HP_titles+HP_contributionEidoStats+HP_gearSetBonus
    DEF = DEF_flatPer + (user_char.STATS.DEF.points*0.2) + λ * (((1+(1/100)*DEF_statPerInc) * (base.DEF + DEF_gear)) + DEF_titles + DEF_contributionEidoStats)
    EVA = EVA_flatPer + (user_char.STATS.EVA.points*0.1) + λ * (((1+(1/100)*EVA_statPerInc) * (base.EVA + EVA_gear)) + EVA_titles + EVA_contributionEidoStats)
    
    // Salvando Resultados
    characters[userID].STATS.DMG.calculed = DMG 
    characters[userID].STATS.CRIT.calculed = (((1+(1/100)*CRIT_statPerInc) * (base.CRIT + CRIT_gear)) + CRIT_titles + CRIT_contributionEidoStats)
    characters[userID].STATS.CRIT.percent = CRIT
    characters[userID].STATS.SPD.calculed = (((1+(1/100)*SPD_statPerInc) * (base.SPD + SPD_gear)) + SPD_titles + SPD_contributionEidoStats)
    characters[userID].STATS.SPD.percent = SPD
    characters[userID].STATS.HP.now = HP
    characters[userID].STATS.HP.max = HP
    characters[userID].STATS.DEF.calculed = (((1+(1/100)*DEF_statPerInc) * (base.DEF + DEF_gear)) + DEF_titles + DEF_contributionEidoStats)
    characters[userID].STATS.DEF.percent = DEF
    characters[userID].STATS.EVA.calculed = (((1+(1/100)*EVA_statPerInc) * (base.EVA + EVA_gear)) + EVA_titles + EVA_contributionEidoStats)
    characters[userID].STATS.EVA.percent = EVA

    losa.save(characters, characters_Path)
}