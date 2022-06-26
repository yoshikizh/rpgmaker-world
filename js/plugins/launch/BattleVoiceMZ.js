//=============================================================================
// Plugin for RPG Maker MZ
// BattleVoiceMZ.js
//=============================================================================

// [Update History]
// This plugin is MZ version of BattleVoice.js the KADOKAWA RMMV plugin.
// - BattleVoice.js
// 2015.Nov    Ver1.0.0 First Release
// 2016.Aug    Ver1.1.0 Strict Option Input
// 2019.Feb.27 Ver1.2.0 Random Play
// - BattkeVoiceMZ
// 2020.Jan    Ver1.0.0 First release: Add plugin commands
// 2020.Oct.06 Ver1.1.0 Add situations: on counter attack and on reflect magic
// 2020.Nov.09 Ver1.2.0 Add situations: on evade attack and on battle starts
// 2021.Feb.21 Ver1.3.0 Add situations: on receive recover magic from ally
// 2021.Sep.07 Ver1.4.0 Fix bug when one receive magic, sometime play > 1 times
//                      Add situation : when an actor use specified item
//                      Add situation : when one select escape
// 2021.Sep.11 Ver1.4.1 Fix bug : error when use item whose range is all allies
// 2021.Sep.12 Ver1.4.2 Fix bug
// 2022.Jan.05 Ver1.5.0 Add situation: damage value is too small or big
// 2022.Mar.11 Ver1.6.0 Enables to set Enemy's battle voice.(note only)
//                Add option : let the timing of play first voice be selectable
//                      Add situation : when an actor gain level
// 2022.Apr.08 Ver1.7.0 Add situation: on guard (TPB only)
//            Refine Plugin command: enables to assign voice also enemy's skill
//                      Add situation: when defeat an opponent
// 2022.Apr.10 Ver1.7.1 Fix bug: enemy's skill voice played as actor's one.
// 2022.Apr.13 Ver1.8.0  Add situations: battle starts with either 
//                preemptive or surprise.
//                       Add situation: when all actors dead
// 2022.Apr.17 Ver1.9.0  Add situation: when actor command window opens
//                       Add situation: when actor's states change
// 2022.Apr.18 Ver1.9.1  Add spec: when one's hp affected, not play state voice
// 2022.Apr.19 Ver1.10.0 When one's attack is miss, play target's evade voice.
//                   Add situations: when one use general item(forAlly, other)
// 2022.Apr.20 Ver1.11.0 Add plugin commands to set/reset enemy's voice.
//                       Add situation(for enemy): when all actors dead
//                       Enables to set plural item/skill IDs for one voice.
//          (ひとつのプラグインコマンドで複数のアイテムやスキルに同じボイスを
//          一括設定可に)
//

/*:
 * @target MZ
 * @plugindesc [Ver1.11.0]Play voice SE at various situations on battle
 * @author Sasuke KANNAZUKI
 * 
 * @param ON switch ID
 * @desc play se only when the switch is ON.
 * This setting interlocks with option Battle Voice.
 * @type switch
 * @default 1
 * 
 * @param actorCommonSetting
 * @text Actor Voice Common Setting
 * @desc Setting common volume, pitch, pan of actor voice.
 * @type text
 * @default
 *
 * @param volume
 * @parent actorCommonSetting
 * @desc volume of SEs. this setting is common among all actor voice SEs.
 * (Default:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param pitch
 * @parent actorCommonSetting
 * @desc pitch of SEs. this setting is common among all actor voice SEs.
 * (Default:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @parent actorCommonSetting
 * @desc pan of SEs. this setting is common among all actor voice SEs.
 * 0:center, <0:left, >0:right (Default:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param enemyCommonSetting
 * @text Enemy Voice Common Setting
 * @desc Setting common volume, pitch, pan of enemy voices.
 * @type text
 * @default
 *
 * @param enemyVolume
 * @parent enemyCommonSetting
 * @desc volume of SEs. this setting is common among all enemy voice SEs.
 * (Default:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param enemyPitch
 * @parent enemyCommonSetting
 * @desc pitch of SEs. this setting is common among all enemy voice SEs.
 * (Default:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param enemyPan
 * @parent enemyCommonSetting
 * @desc pan of SEs. this setting is common among all enemy voice SEs.
 * 0:center, <0:left, >0:right (Default:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param Battle Voice Name at Option
 * @desc display name at option
 * @type text
 * @default Battle Voice
 *
 * @param firstMsgTiming
 * @text First Voice Timing
 * @desc when it plays first voice?
 * @type select
 * @option Immidiate(0)
 * @value 0
 * @option first message window closed(1)
 * @value 1
 * @default 0
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam guardVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam itemAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam itemVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam preemptiveFirstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam surpriseFirstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam killVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam fromAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam runawayVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam allDeadVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam levelUpVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam commandVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 * 
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 * 
 * @noteParam allDeadVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData eneiess
 * 
 * @command set
 * @text Change Actor Voice
 * @desc Change various occasional voice
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor to change voice
 * @type actor
 * @default 1
 *
 * @arg situation
 * @text Situation
 * @desc Which occasion to change voice
 * @type select
 * @option At normal attack
 * @value attack
 * @option At guard (on TPB)
 * @value guard
 * @option At recovery magic
 * @value recover
 * @option At magic to ally
 * @value friendMagic
 * @option At general magic
 * @value magic
 * @option At non-magical skill
 * @value skill
 * @option At use item to ally
 * @value itemAlly
 * @option At general item
 * @value item
 * @option On Damaged
 * @value damage
 * @option On Evade Attack
 * @value evade
 * @option On Dead
 * @value dead
 * @option At counter invokes
 * @value counter
 * @option At reflect magic
 * @value reflect
 * @option At defeat an enemy
 * @value kill
 * @option At received recover skill
 * @value fromAlly
 * @option On battle starts(Normal)
 * @value first
 * @option On battle starts(preemptive)
 * @value preemptiveFirst
 * @option On battle starts(surprise)
 * @value surpriseFirst
 * @option On Victory
 * @value victory
 * @option On Try to Escape
 * @value runaway
 * @option At all actors dead
 * @value allDead
 * @option On Level Up
 * @value levelUp
 * @option On Input Actor Command
 * @value command
 * @default attack
 *
 * @arg isSet
 * @text Set or Reset
 * @desc If reset, voices become set by plugin
 * If reset, following 2 parameters are ignored.
 * @type select
 * @option Set
 * @value set
 * @option Reset
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text New Voice 1
 * @desc If you set more voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text New Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command allReset
 * @text All Reset Actor Voice
 * @desc Set all voices defined on plugin.
 * It's not reset skill related voice setting.
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor that reset voice setting
 * @type actor
 * @default 1
 * 
 * @command setEnemy
 * @text Change Enemy Voice
 * @desc Change various occasional voice
 *
 * @arg enemyId
 * @text Enemy ID
 * @desc Enemy to change voice
 * @type enemy
 * @default 1
 *
 * @arg situation
 * @text Situation
 * @desc Which occasion to change voice
 * @type select
 * @option At normal attack
 * @value attack
 * @option At recovery magic
 * @value recover
 * @option At magic to ally
 * @value friendMagic
 * @option At general magic
 * @value magic
 * @option At non-magical skill
 * @value skill
 * @option On Damaged
 * @value damage
 * @option On Evade Attack
 * @value evade
 * @option On Dead
 * @value dead
 * @option At counter invokes
 * @value counter
 * @option At reflect magic
 * @value reflect
 * @option On battle starts
 * @value first
 * @option At all actors dead
 * @value allDead
 * @default attack
 *
 * @arg isSet
 * @text Set or Reset
 * @desc If reset, voices become set by plugin
 * If reset, following 2 parameters are ignored.
 * @type select
 * @option Set
 * @value set
 * @option Reset
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text New Voice 1
 * @desc If you set more voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text New Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command allResetEnemy
 * @text All Reset Enemy Voice
 * @desc Set all voices defined on plugin.
 * It's not reset specified ID skill voice setting.
 *
 * @arg enemyId
 * @text Enemy ID
 * @desc Enemy that reset voice setting
 * @type enemy
 * @default 1
 *
 * @command skillSet
 * @text Set Skill Related Voice
 * @desc Set original voice for each skill.
 *
 * @arg actorOrEnemy
 * @text target battler
 * @desc actor or enemy?
 * @type select
 * @option Actor
 * @value actor
 * @option Enemy
 * @value enemy
 * @default actor
 *
 * @arg actorId
 * @parent actorOrEnemy
 * @text Actor ID
 * @desc The actor to set the skill voice.
 * @type actor
 * @default 1
 *
 * @arg enemyId
 * @parent actorOrEnemy
 * @text Enemy ID
 * @desc The enemy to set the skill voice.
 * @type enemy
 * @default 0
 *
 * @arg skillId
 * @text Skill ID
 * @desc The skill to set the origial voice.
 * @type skill
 * @default 1
 *
 * @arg skillId2
 * @parent skillId
 * @text More Skill IDs
 * @desc More skills to set the same origial voice.
 * @type skill[]
 * @default []
 *
 * @arg isSet
 * @text Set or Reset
 * @desc If reset, voices become normal setting.
 * If reset, following 2 parameters are ignored.
 * @type select
 * @option Set
 * @value set
 * @option Reset
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text New Voice 1
 * @desc If you set plural voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text New Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command skillAllReset
 * @text Reset All Skill Voice
 * @desc All reset an actor's skill specified voice.
 * Voices that is defined plugins are not reset.
 *
 * @arg actorOrEnemy
 * @text target battler
 * @desc actor or enemy?
 * @type select
 * @option Actor
 * @value actor
 * @option Enemy
 * @value actor
 * @default actor
 *
 * @arg actorId
 * @parent actorOrEnemy
 * @text Actor ID
 * @desc Actor that reset skill voice setting
 * @type actor
 * @default 1
 *
 * @arg enemyId
 * @parent actorOrEnemy
 * @text Enemy ID
 * @desc Enemy that reset skill voice setting
 * @type enemy
 * @default 0
 *
 * @command itemSet
 * @text Set Item Voice
 * @desc Set Voice When One Use Specified Item.
 *
 * @arg actorId
 * @text Actor ID
 * @desc The actor to set the item voice.
 * @type actor
 * @default 1
 *
 * @arg targetId
 * @text Target ID
 * @desc Set specified target. Set 0 if the target is anyone, all actors or opponent(s).
 * @type actor
 * @min 0
 * @default 0
 *
 * @arg itemId
 * @text Item ID
 * @desc The item to set the origial voice.
 * @type item
 * @min 1
 * @default 1
 *
 * @arg itemId2
 * @parent itemId
 * @text More Item IDs
 * @desc More items to set the same origial voice.
 * @type item[]
 * @default []
 *
 * @arg isSet
 * @text Set or Reset
 * @desc If reset, voices become normal setting.
 * If reset, following 2 parameters are ignored.
 * @type select
 * @option Set
 * @value set
 * @option Reset
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text New Voice 1
 * @desc If you set plural voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text New Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command itemAllReset
 * @text Reset All Item Voice
 * @desc All reset an actor's item specified voice.
 * Voices that is defined plugins are not reset.
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor that reset item voice setting
 * @type actor
 * @min 1
 * @default 1
 *
 * @command setByDamage
 * @text Set Voice Based on Damage
 * @desc Set special damage voice when setting is met.
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor to change voice
 * @type actor
 * @default 1
 *
 * @arg floorDamage
 * @text When Damage >= This
 * @desc When set 0, It'll play default damage voice.
 * @type number
 * @default 0
 *
 * @arg valueTypeFloor
 * @parent floorDamage
 * @text Value Type
 * @desc select the damage is normal value or ratio(%) of Max HP
 * @type select
 * @option Immediate Value
 * @value normal
 * @option Percentage
 * @value ratio
 * @default normal
 *
 * @arg voice1floor
 * @parent floorDamage
 * @text Voice 1
 * @desc If you set more voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2floor
 * @parent floorDamage
 * @text Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @arg ceilDamage
 * @text When Damage < This
 * @desc When set 0, It'll play default damage voice.
 * @type number
 * @default 0
 *
 * @arg valueTypeCeil
 * @parent ceilDamage
 * @text Value Type
 * @desc select the damage is normal value or ratio(%) of Max HP
 * @type select
 * @option Immediate Value
 * @value normal
 * @option Percentage
 * @value ratio
 * @default normal
 *
 * @arg voice1ceil
 * @parent ceilDamage
 * @text Voice 1
 * @desc If you set more voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2ceil
 * @parent ceilDamage
 * @text Voice >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command resetByDamage
 * @text Reset Voices Based on Damage
 * @desc Reset all damage-related voices.
 * After then, it'll play normal damage voice.
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor to reset changed voices
 * @type actor
 * @default 1
 *
 * @command stateChange
 * @text Voice For States Change
 * @desc Plays when specified state adds or removes
 *
 * @arg actorId
 * @text Actor ID
 * @desc The actor to set the state change voice.
 * @type actor
 * @default 1
 *
 * @arg targetStates
 * @text Target States
 * @desc States to assign specified voice.
 * @type state[]
 * @default []
 *
 * @arg voiceAtStateAdded1
 * @text Voice At State Added 1
 * @desc If you set plural voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voiceAtStateAdded2
 * @parent voiceAtStateAdded1
 * @text Voice At State Added >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @arg voiceAtStateRemoved1
 * @text Voice At State Removed 1
 * @desc If you set plural voices, write remainder next param.
 * If you set only one voice, set next param empty.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voiceAtStateRemoved2
 * @parent voiceAtStateRemoved1
 * @text Voice At State Removed >=2
 * @desc By writing like atk1,atk2,atk3
 * You can set plural voices
 * @type string
 * @default 
 *
 * @command resetStateChange
 * @text Reset State Voice
 * @desc Reset all state change voice of an actor
 *
 * @arg actorId
 * @text Actor ID
 * @desc Actor that reset all state related voices
 * @type actor
 * @default 1
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 *
 * This plugin enables to play SE (assumed battle voice) at
 *  various situations.
 *
 * [Summary]
 * Player can change voice ON/OFF by Option Scene (except Title).
 * This setting interlocks switch ID set at plugin parameter.
 *
 * [note specification]
 * write down each actor's note at following format to set SE filename.
 * [[Voices when an actor perform something]]
 * <attackVoice:filename>  plays when actor does normal attack.
 * <guardVoice:filename>  plays when actor selects guard. (TPB only)
 * <recoverVoice:filename>   plays when actor uses HP recovering magic.
 * <friendMagicVoice:filename> plays when actor spells magic for friend
 *  except HP recovering. if this is not set but <magicVoice:filename> is set,
 *  it plays <magicVoice:filename> setting file.
 * <magicVoice:filename>   plays when actor spells magic(except for friend).
 * <skillVoice:filename>   plays when actor uses special skill except magic.
 * <itemAllyVoice:filename>   plays when actor uses item to oneself or ally.
 *  if this is not set, play <itemVoice:filename> instead.
 * <itemVoice:filename>    plays when actor uses item (except for ally).
 * [[Voices when an actor affected from any battler]]
 * <damageVoice:filename>    plays when actor takes damage.
 * <evadeVoice:filename>    plays when actor evades enemy attack.
 * <defeatedVoice:filename>   plays when actor is dead.
 * <counterVoice:filename>   plays when counter attack invokes.
 * <reflectVoice:filename>   plays when actor reflects magic.
 * <killVoice:filename>     plays when actor defeat an enemy.
     It doesn't play when it playes the enemy's defeated voice.
 * <fromAllyVoice:filename> plays when actor received HP recover magic.
 *   It doesn't play when magic user is the same as receiver.
 *   It assumes the phrase 'Thank you' and so on.
 * [[Voices when battle exceeds]]
 * if plural actors attend the battle, randomly selected actor's SE is adopted.  * <firstVoice:filename>   plays when battle starts except surprised.
 * <preemptiveFirstVoice:filename> plays when preemptive battle starting.
 *   If it not sets, play <firstVoice:filename> instead.
 * <surpriseFirstVoice:filename>  plays when surprise battle starting.
 * <victoryVoice:filename>   plays when battle finishes.
 * <runawayVoice:filename>  plays when party try to escape from the battle
 * <allDeadVoice:filename> plays when party lose battle.
 *   This voice's speaker is the actor that dead last.
 * <levelUpVoice:filename> plays when an actor's level grows up 
 * [[misc. Voices]]
 * <commandVoice:filename> plays when starting actor command selection
 *
 * *NOTE* Here 'magic' skill means its 'Skill Type' is included in 
 *  '[SV]Magic Skills' on 'System 2' tab.
 *
 * [Advanced option 1]
 * If you want to play one of several voices randomly,
 * write filenames with colon as follows:
 * <attackVoice:atk1,atk2,atk3>
 * in this case, at attack, plays atk1 atk2, or atk3 randomly.
 *
 * If set no SE one of filenames, 
 * <attackVoice:atk1,atk2,$>
 * in this case, at attack, plays atk1 atk2, or doesn't play SE.
 *
 * You can set the same filename twice or more than.
 * <attackVoice:atk1,atk2,atk2,$>
 * in this case, 25% atk1, 50% atk2, 25% don't play.
 *
 * *NOTE* When set SEs at this notation, these files might be excluded at
 *  deployment with option 'Exclude unused files'.
 *  To prevent this, I recommend to make dummy event and set each SE to
 *  'Play SE' on the Contents.
 *
 * [Advanced option 2] (Since Ver1.6.0)
 * You can set any enemies battle voices by writing the same notation
 *  as actor's note to the object enemy's note.
 * [[Voices when an enemy perform something]]
 * <attackVoice:filename>  at performing normal attack.
 * <recoverVoice:filename>   at one uses HP recovering magic.
 * <friendMagicVoice:filename> at one uses magic for friend
 * <magicVoice:filename>   at one spells magic(except for friend).
 * <skillVoice:filename>   at one uses skill except magic.
 * [[Voices when an enemy affected from any battler]]
 * <damageVoice:filename>    at one take damage.
 * <evadeVoice:filename>    at one evades opponent's attack
 * <defeatedVoice:filename>   at one is dead.
 * <counterVoice:filename>   at one's counter attack invokes.
 * <reflectVoice:filename>   at one reflects magic.
 * [[Voices when battle exceeds]]
 *  enemies' voices are higher priority than actors' ones.
 * <firstVoice:filename>   at starting battle.
 * <allDeadVoice:filename> at all actors dead.
 * 
 * [Plugin Commands]
 * By calling plugin commands, you can do as follows:
 * - Set/Reset voice on each situation
 * - Reset all situations' voice to default
 * Following comands disables to set that note.
 * - Assign/Reset actor/enemy voice to each skill
 * - Reset all voices assigned to skills
 * - Assign/Reset actor voice when one use specified item
 * - Reset all voices assigned to items
 * - Set/Reset special damage voice when setting is met.
 *     (NOTE: When this plugin command sets more than once to the same actor,
 *      it discards old settings and only latest setting is valid,)
 * - Set/Reset actor's voice when one's states added/removed.
 *      this voice doesn't play when one's hp affecs(damage or recover).
 * - Reset all voices on one's state changes
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc [Ver1.11.0]アクターの戦闘時の行動にボイスSEを設定します。
 * @author 神無月サスケ
 * 
 * @param ON switch ID
 * @text ボイス演奏スイッチID
 * @desc このスイッチが ON の時のみ、ボイスSEを演奏します。
 * オプション「バトルボイス」と連動します。
 * @type switch
 * @default 1
 *
 * @param actorCommonSetting
 * @text アクターボイス共通設定
 * @desc 音量や位相などの共通設定を行います。
 * @type text
 * @default
 *
 * @param volume
 * @parent actorCommonSetting
 * @text 共通ボリューム
 * @desc ボイスSEのボリュームです。この設定がアクターの全てのボイスSEの
 * 共通となります。(既定値:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 *
 * @param pitch
 * @parent actorCommonSetting
 * @text 共通ピッチ
 * @desc ボイスSEのピッチです。この設定がアクターの全てのボイスSEの
 * 共通となります。(既定値:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @parent actorCommonSetting
 * @text 共通位相
 * @desc ボイスSEの位相。この設定がアクターの全てのボイスSE共通になります。
 * 0:中央, 負数:左寄り, 正数:右寄り (既定値:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param enemyCommonSetting
 * @text 敵キャラボイス共通設定
 * @desc 音量や位相などの共通設定を行います。
 * @type text
 * @default
 *
 * @param enemyVolume
 * @parent enemyCommonSetting
 * @text 共通ボリューム
 * @desc ボイスSEのボリュームです。この設定が敵キャラの全てのボイスSEの
 * 共通となります。(既定値:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 *
 * @param enemyPitch
 * @parent enemyCommonSetting
 * @text 共通ピッチ
 * @desc ボイスSEのピッチです。この設定が敵キャラの全てのボイスSEの
 * 共通となります。(既定値:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param enemyPan
 * @parent enemyCommonSetting
 * @text 共通位相
 * @desc ボイスSEの位相。この設定が敵キャラの全てのボイスSE共通になります。
 * 0:中央, 負数:左寄り, 正数:右寄り (既定値:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param Battle Voice Name at Option
 * @text バトルボイス表示名
 * @desc オプション画面での表示名です。
 * @type string
 * @default バトルボイス
 *
 * @param firstMsgTiming
 * @text 戦闘開始ボイスタイミング
 * @desc 戦闘開始のfirstVoiceをいつ演奏するか
 * @type select
 * @option 開始後すぐ(0)
 * @value 0
 * @option メッセージウィンドウ消去後(1)
 * @value 1
 * @default 0
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam guardVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam itemAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam itemVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam preemptiveFirstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam surpriseFirstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam killVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam fromAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam runawayVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam allDeadVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam levelUpVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam commandVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData enemies
 *
 * @noteParam allDeadVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData eneiess
 * 
 * @command set
 * @text アクター再生音変更
 * @desc 戦闘時の特定の動作のボイスを変更
 *
 * @arg actorId
 * @text アクターID
 * @desc 音声を変更するアクター
 * @type actor
 * @default 1
 *
 * @arg situation
 * @text シチュエーション
 * @desc どのタイミングの音を変更するか
 * @type select
 * @option 通常攻撃時
 * @value attack
 * @option ガード時(TPB)
 * @value guard
 * @option 回復魔法使用時
 * @value recover
 * @option 味方対象魔法使用時
 * @value friendMagic
 * @option 通常魔法使用時
 * @value magic
 * @option 非魔法スキル使用時
 * @value skill
 * @option 味方対象アイテム使用時
 * @value itemAlly
 * @option 通常アイテム使用時
 * @value item
 * @option 被ダメージ時
 * @value damage
 * @option 攻撃回避時
 * @value evade
 * @option 戦闘不能時
 * @value dead
 * @option カウンター発動時
 * @value counter
 * @option 魔法反射発動時
 * @value reflect
 * @option 敵を倒した時
 * @value kill
 * @option 回復魔法を受けた時
 * @value fromAlly
 * @option 戦闘開始時(通常)
 * @value first
 * @option 戦闘開始時(先手)
 * @value preemptiveFirst
 * @option 戦闘開始時(不意打ち)
 * @value surpriseFirst
 * @option 戦闘勝利時
 * @value victory
 * @option 逃げるのを試みる時
 * @value runaway
 * @option 全滅時
 * @value allDead
 * @option 戦闘後レベルアップ時
 * @value levelUp
 * @option アクターコマンド入力時
 * @value command
 * @default attack
 *
 * @arg isSet
 * @text セットかリセットか
 * @desc リセット後はプラグインでの設定値に戻る。
 * リセットの際は以下の2つのパラメータは無視される
 * @type select
 * @option セット
 * @value set
 * @option リセット
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text 変更後の声
 * @desc 複数ある時は残りは次のパラメータに書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text 変更後の声(2つ目以降)
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @command allReset
 * @text アクター音声全リセット
 * @desc プラグインのオプションに設定した値に戻します。
 * 特定スキル用の音声はリセットされません
 *
 * @arg actorId
 * @text アクターID
 * @desc 音声を全リセットするアクター
 * @type actor
 * @default 1
 *
 * @command setEnemy
 * @text 敵キャラ再生音変更
 * @desc 戦闘時の特定の動作のボイスを変更
 *
 * @arg enemyId
 * @text 敵キャラID
 * @desc 音声を変更する敵キャラ
 * @type enemy
 * @default 1
 *
 * @arg situation
 * @text シチュエーション
 * @desc どのタイミングの音を変更するか
 * @type select
 * @option 通常攻撃時
 * @value attack
 * @option 回復魔法使用時
 * @value recover
 * @option 味方対象魔法使用時
 * @value friendMagic
 * @option 通常魔法使用時
 * @value magic
 * @option 非魔法スキル使用時
 * @value skill
 * @option 被ダメージ時
 * @value damage
 * @option 攻撃回避時
 * @value evade
 * @option 戦闘不能時
 * @value dead
 * @option カウンター発動時
 * @value counter
 * @option 魔法反射発動時
 * @value reflect
 * @option 戦闘開始時
 * @value first
 * @option アクター全滅時
 * @value allDead
 * @default attack
 *
 * @arg isSet
 * @text セットかリセットか
 * @desc リセット後はプラグインでの設定値に戻る。
 * リセットの際は以下の2つのパラメータは無視される
 * @type select
 * @option セット
 * @value set
 * @option リセット
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text 変更後の声
 * @desc 複数ある時は残りは次のパラメータに書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text 変更後の声(2つ目以降)
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @command allResetEnemy
 * @text 敵キャラ音声全リセット
 * @desc プラグインのオプションに設定した値に戻します。
 * 特定スキル用の音声はリセットされません
 *
 * @arg enemyId
 * @text 敵キャラID
 * @desc 音声を全リセットする敵キャラ
 * @type actor
 * @default 1
 *
 * @command skillSet
 * @text スキル時音設定
 * @desc 特定スキル使用時の効果
 * スキルIDごとに異なる音声を登録できます。
 *
 * @arg actorOrEnemy
 * @text 対象バトラー
 * @desc アクターか敵キャラか
 * @type select
 * @option アクター
 * @value actor
 * @option 敵キャラ
 * @value enemy
 * @default actor
 *
 * @arg actorId
 * @parent actorOrEnemy
 * @text アクターID
 * @desc スキル時音声を変更するアクター
 * @type actor
 * @default 1
 *
 * @arg enemyId
 * @parent actorOrEnemy
 * @text 敵キャラID
 * @desc スキル時音声を変更する敵キャラ
 * @type enemy
 * @default 0
 *
 * @arg skillId
 * @text スキルID
 * @desc 特別な音声にするスキル
 * @type skill
 * @default 1
 *
 * @arg skillId2
 * @parent skillId
 * @text 追加スキルID
 * @desc 他にもこの音声にするスキル達
 * @type skill[]
 * @default []
 *
 * @arg isSet
 * @text セットかリセットか
 * @desc リセット後は通常スキルなどの設定音に戻る。
 * リセットの際は以下の2つのパラメータは無視される
 * @type select
 * @option セット
 * @value set
 * @option リセット
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text 変更後の声
 * @desc 複数ある時は残りは次のパラメータに残りを書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text 変更後の声(2つ目以降)
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @command skillAllReset
 * @text スキル音声全リセット
 * @desc 全ての特定スキル用の音声をリセットします。
 * 通常の再生音はリセットされません。
 *
 * @arg actorOrEnemy
 * @text 対象バトラー
 * @desc アクターか敵キャラか
 * @type select
 * @option アクター
 * @value actor
 * @option 敵キャラ
 * @value enemy
 * @desc アクター？　敵キャラ？
 * @default actor
 *
 * @arg actorId
 * @parent actorOrEnemy
 * @text アクターID
 * @desc スキル音声を全リセットするアクター
 * @type actor
 * @default 1
 *
 * @arg enemyId
 * @parent actorOrEnemy
 * @text 敵キャラID
 * @desc スキル音声を全リセットする敵キャラ
 * @type enemy
 * @default 0
 *
 * @command itemSet
 * @text アイテム使用時音設定
 * @desc 特定のアイテムや対象(オプション)に音声を割り当てます。
 *
 * @arg actorId
 * @text アクターID
 * @desc アイテムを使用するアクター
 * @type actor
 * @default 1
 *
 * @arg targetId
 * @text ターゲットID
 * @desc アイテム対象のアクター。全員同じ時、味方全体対象の時、敵が対象の時は0にして下さい。
 * @type actor
 * @min 0
 * @default 0
 *
 * @arg itemId
 * @text アイテムID
 * @desc 音声を割り当てるアイテム
 * @type item
 * @min 1
 * @default 1
 *
 * @arg itemId2
 * @parent itemId
 * @text 追加アイテムID
 * @desc 同様の音声を割り当てる別のアイテム達
 * @type item[]
 * @default []
 *
 * @arg isSet
 * @text セットかリセットか
 * @desc リセット後は通常スキルなどの設定音に戻る。
 * リセットの際は以下の2つのパラメータは無視される
 * @type select
 * @option セット
 * @value set
 * @option リセット
 * @value reset
 * @default set
 *
 * @arg voice1
 * @text 変更後の音声
 * @desc 複数ある時は残りは次のパラメータに残りを書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2
 * @text 変更後の声(2つ目以降)
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @command itemAllReset
 * @text アイテム音声全リセット
 * @desc 全ての特定アイテム用の音声をリセットします。
 *
 * @arg actorId
 * @text アクターID
 * @desc アイテム使用音声を全リセットするアクター
 * @type actor
 * @min 1
 * @default 1
 *
 * @command setByDamage
 * @text 被ダメージ量による音声設定
 * @desc 特定の被ダメージ量の時に通常ダメージ時とは異なる音声を再生します。
 *
 * @arg actorId
 * @text アクターID
 * @desc この設定を適用するアクター
 * @type actor
 * @default 1
 *
 * @arg floorDamage
 * @text このダメージ以上の時
 * @desc 0 を指定するとセットされません。
 * @type number
 * @default 0
 *
 * @arg valueTypeFloor
 * @parent floorDamage
 * @text 数値タイプ
 * @desc 通常？　割合？　割合は、最大HPに対する割合％です。
 * @type select
 * @option 通常
 * @value normal
 * @option 割合％
 * @value ratio
 * @default normal
 *
 * @arg voice1floor
 * @parent floorDamage
 * @text 変更後の声
 * @desc 複数ある時は残りは次のパラメータに書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2floor
 * @parent floorDamage
 * @text 変更後の声(2つ目以降)
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @arg ceilDamage
 * @text このダメージ未満の場合
 * @desc 0 を指定するとセットされません。
 * @type number
 * @default 0
 *
 * @arg valueTypeCeil
 * @parent ceilDamage
 * @text 数値タイプ
 * @desc 通常？　割合？　割合は、最大HPに対する割合％です。
 * @type select
 * @option 通常
 * @value normal
 * @option 割合％
 * @value ratio
 * @default normal
 *
 * @arg voice1ceil
 * @parent ceilDamage
 * @text 変更後の声
 * @desc 複数ある時は残りは次のパラメータに書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voice2ceil
 * @parent ceilDamage
 * @text 変更後の声(2つ目以降)
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @command resetByDamage
 * @text 被ダメージ音声リセット
 * @desc 設定を破棄し、通常のダメージ時ボイスに戻します。
 *
 * @arg actorId
 * @text アクターID
 * @desc 被ダメージ音声をリセットするアクター
 * @type actor
 * @default 1
 *
 * @command stateChange
 * @text ステート変化時音設定
 * @desc 特定のステートが付加/解除された時
 *
 * @arg actorId
 * @text アクターID
 * @desc 当該音声を変更するアクター
 * @type actor
 * @default 1
 *
 * @arg targetStates
 * @text ステートID(複数指定可)
 * @desc この音声に指定するステート。戦闘不能は指定不可
 * @type state[]
 * @default []
 *
 * @arg voiceAtStateAdded1
 * @text ステート付加時ボイス
 * @desc 複数ある時は残りは次のパラメータに残りを書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voiceAtStateAdded2
 * @parent voiceAtStateAdded1
 * @text ステート付加時2以降
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @arg voiceAtStateRemoved1
 * @text ステート解除時ボイス
 * @desc 複数ある時は残りは次のパラメータに残りを書いてください
 * ひとつだけの時は、次のパラメータは空にします
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @arg voiceAtStateRemoved2
 * @parent voiceAtStateRemoved1
 * @text ステート付加時2以降
 * @desc atk1,atk2,atk3 のようにコンマで括って
 * 複数指定が可能
 * @type string
 * @default 
 *
 * @command resetStateChange
 * @text ステート変化時音リセット
 * @desc 特定のアクターのステート変化音をリセットします
 *
 * @arg actorId
 * @text アクターID
 * @desc ステート音声を全リセットするアクター
 * @type actor
 * @default 1
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * 
 * 戦闘中のシチュエーションに応じてにバトルボイスを演奏可能にします。
 *
 * ■概要
 * ゲーム中のオプション画面(タイトル画面以外)でON/OFFが可能です。
 * この設定は、このプラグインのパラメータで指定したスイッチと連動しています。
 *
 * ■メモ設定方法
 * それぞれのアクターのメモに以下の書式で書いてください。
 * filename はボイスSEのファイル名にしてください。
 * ◆アクター行動時
 * <attackVoice:filename>  通常攻撃の時に再生されるボイスです。
 * <guardVoice:filename>  防御の時に再生されるボイスです。 (TPB時のみ有効)
 * <recoverVoice:filename>   HP回復魔法を使用した時に再生されるボイスです。
 * <friendMagicVoice:filename>   HP回復以外の味方向け魔法を使用した時に
 *  再生されるボイスです。省略された場合で<magicVoice:filename>が
 *  設定されている場合は、そちらが再生されます。
 * <magicVoice:filename> 味方向け以外の魔法を使用した時に再生されるボイスです。
 * <skillVoice:filename>   上記以外のスキルを使用した時に再生されるボイスです。
 * <itemAllyVoice:filename>   仲間向けアイテム使用時に再生されるボイスです。
 *  未設定の場合、<itemVoice:filename>が再生されます。
 * <itemVoice:filename>   上記以外のアイテム使用時に再生されるボイスです。
 * ◆アクターが対象になった時
 * <damageVoice:filename>    ダメージを受けた時に再生されるボイスです。
 * <evadeVoice:filename>    攻撃を回避した時に再生されるボイスです。
 * <defeatedVoice:filename>   戦闘不能になった時に再生されるボイスです。
 * <counterVoice:filename>   カウンター攻撃発動時に再生されるボイスです。
 * <reflectVoice:filename>   魔法を反射する時に再生されるボイスです。
 * <killVoice:filename>     敵を倒したときに再生されるボイスです。
 *  該当する敵の戦闘不能時ボイスが再生されるときは、再生しません。
 * <fromAllyVoice:filename> HP回復魔法を受けた時に再生されるボイスです。
 *  自分自身に使った場合は再生されません
 *  「ありがとう」など感謝の言葉を想定しています。
 * ◆バトルの進捗に応じて
 * アクターが複数いる場合、生きているアクターの中からランダムで再生されます。
 * <firstVoice:filename>    戦闘開始時に再生されるボイスです。
 *  ただし、不意打ちの際は再生されません。
 * <preemptiveFirstVoice:filename> 先制での戦闘開始時に再生されます。
 *  未設定の場合、<firstVoice:filename> が再生されます。
 * <surpriseFirstVoice:filename> 不意打ちでの戦闘開始時に再生されます。
 * <victoryVoice:filename>   戦闘勝利時に再生されるボイスです。
 * <runawayVoice:filename> 逃走を試みる時に再生されるボイスです。
 * <allDeadVoice:filename> 全滅時に再生されるボイスです。
 *  最後に倒れたアクターに設定されたボイスを再生します。
 * <levelUpVoice:filename> 戦闘後レベルアップした時に再生されるボイスです。
 * ◆その他
 * <commandVoice:filename> アクターコマンド選択開始時に再生されます。
 *
 * 注意：ここでいう「魔法」の定義は、そのスキルのスキルタイプが、
 * 「システム2」タブの「[SV]魔法スキル」に含まれているものです。
 *
 * ■拡張機能１
 * 上記のメモのfilename を、コロンで複数指定すると、その中からランダムで
 * 再生されます。例えば、以下のように指定した場合、
 * <attackVoice:atk1,atk2,atk3>
 * atk1 atk2 atk3 のいずれかのボイスがランダムで再生されます。
 *
 * 無音を指定したい場合は、$ を入れてください。
 * <attackVoice:atk1,atk2,$>
 * この場合、atk1, atk2, 無音の中から選ばれます。
 * 
 * 同じファイル名を複数回指定可能です。
 * <attackVoice:atk1,atk2,atk2,$>
 * この場合、25%でatk1、50%でatk2、25%で演奏なしになります。
 *
 * 注意：この形式で設定を行った場合、デプロイメントの「不要ファイルの削除」で
 *  削除される可能性があります。例えばダミーイベントを作り、これらのSEを
 *  演奏するなどして、適宜対処してください。
 * 
 * ■拡張機能２ (Ver1.6.0～)
 * 特定のIDの敵キャラにもボイスを付けることが可能です。
 * 方法はアクター同様、該当する敵キャラのメモ欄に以下の書式で記述します。
 * ◆敵キャラ行動時
 * <attackVoice:filename>  通常攻撃の時
 * <recoverVoice:filename>   HP回復魔法を使用した時
 * <friendMagicVoice:filename>   HP回復以外の味方向け魔法を使用した時
 * <magicVoice:filename> 味方向け以外の魔法を使用した時
 * <skillVoice:filename>   その他のスキルを使用した時
 * ◆敵キャラが対象になった時
 * <damageVoice:filename>    ダメージを受けた時
 * <evadeVoice:filename>    攻撃を回避した時
 * <defeatedVoice:filename>   戦闘不能になった時
 * <counterVoice:filename>   カウンター攻撃発動時
 * <reflectVoice:filename>   魔法を反射した時
 * ◆バトルの進捗に応じて
 * アクターと敵キャラ双方に設定がある場合、敵キャラの方が優先されます。
 * <firstVoice:filename>   戦闘開始時
 * <allDeadVoice:filename> アクター全滅時に再生されるボイスです。
 * 
 * ■プラグインコマンド
 * プラグインコマンドでは以下のことが可能です
 * ・各シチュエーションでのボイスの変更およびリセット
 * ・全シチュエーションのボイスの一括リセット
 * 以下は、プラグインコマンドでのみ指定が可能です。
 * ・スキル番号にボイスを割り当てる、またはそれを解除
 *   ・敵キャラのスキルも指定可能(Ver1.7.0～)
 * ・スキル番号に割り当てられた全ボイスを一括リセット
 * ・特定のアイテムにボイスを割り当て/解除。ターゲット指定も可能
 * ・アイテムに割り当てられた全ボイスを一括リセット
 * ・被ダメージが特定の値以上／未満の際のボイス設定／リセット
 *     注意：このプラグインコマンドを同アクターに複数回指定した場合、
 *     最新のものだけが反映されます。
 * ・特定のステート付与時／解除時のボイス設定／リセット (Ver1.9.0～)
 *     HPが増減するスキル(例:毒攻撃)の副作用の場合、再生されません。
 * ・全てのステート付与時／解除時のボイス一括リセット (Ver1.9.0～)
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */
(() => {
  const pluginName = 'BattleVoiceMZ';

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const pitch = Number(parameters['pitch'] || 100);
  const volume = Number(parameters['volume'] || 90);
  const pan = Number(parameters['pan'] || 0);

  const enemyPitch = Number(parameters['enemyPitch'] || 100);
  const enemyVolume = Number(parameters['enemyVolume'] || 90);
  const enemyPan = Number(parameters['enemyPan'] || 0);

  const playSwitchId = Number(parameters['ON switch ID'] || 1);
  const strBattleVoice = parameters['Battle Voice Name at Option'] ||
    'Battle Voice';
  const delayMsgTiming = !!Number(parameters['firstMsgTiming'] || 0);

  //
  // process plugin commands
  //
  const join2voices = (voice1, voice2) => {
    if (voice1) {
      return voice2 ? voice1 + ',' + voice2 : voice1;
    } else {
      return null;
    }
  };

  PluginManager.registerCommand(pluginName, 'set', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      if (actor.battleVoices == null) {
        actor.battleVoices = {};
      }
      switch (args.isSet) {
      case 'set':
        const voice = join2voices(args.voice1, args.voice2);
        actor.battleVoices[args.situation] = voice;
        break;
      case 'reset':
        actor.battleVoices[args.situation] = null;
        break;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'allReset', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.battleVoices = null;
    }
  });

  PluginManager.registerCommand(pluginName, 'setEnemy', args => {
    if ($gameSystem.enemyVoices == null) {
      $gameSystem.enemyVoices = {};
    }
    switch (args.isSet) {
    case 'set':
      if ($gameSystem.enemyVoices[+args.enemyId] == null) {
        $gameSystem.enemyVoices[+args.enemyId] = {};
      }
      const battleVoices = $gameSystem.enemyVoices[+args.enemyId];
      const voice = join2voices(args.voice1, args.voice2);
      battleVoices[args.situation] = voice;
      break;
    case 'reset':
      let bv, bvs;
      if ((bv = $gameSystem.enemyVoices) && (bvs = bv[+args.enemyId])) {
        bvs[args.situation] = null;
      }
      break;
    }
  });

  PluginManager.registerCommand(pluginName, 'allResetEnemy', args => {
    if ($gameSystem.enemyVoices) {
      $gameSystem.enemyVoices[+args.enemyId] = null;
    }
  });

  const _setSkillVoices = (target, args) => {
    const skillIds = [+args.skillId, ...eval(args.skillId2).map(id => +id)];
    switch (args.isSet) {
    case 'set':
      const voice = join2voices(args.voice1, args.voice2);
      for (const skillId of skillIds){
        target[skillId] = voice;
      }
      break;
    case 'reset':
      for (const skillId of skillIds){
        target[skillId] = null;
      }
      break;
    }
  };

  PluginManager.registerCommand(pluginName, 'skillSet', args => {
    if (args.actorOrEnemy !== 'enemy') { // actor
      const actor = $gameActors.actor(+args.actorId);
      if (actor) {
        if (actor.skillVoices == null) {
          actor.skillVoices = {};
        }
        _setSkillVoices(actor.skillVoices, args);
      }
    } else { // enemy
      if ($gameSystem.enemySkillVoices == null) {
        $gameSystem.enemySkillVoices = {};
      }
      const enemyVoices = $gameSystem.enemySkillVoices;
      if (enemyVoices[+args.enemyId] == null) {
        enemyVoices[+args.enemyId] = {};
      }
      _setSkillVoices(enemyVoices[+args.enemyId], args);
    }
  });

  PluginManager.registerCommand(pluginName, 'skillAllReset', args => {
    if (args.actorOrEnemy !== 'enemy') { // actor
      const actor = $gameActors.actor(+args.actorId);
      if (actor) {
        actor.skillVoices = null;
      }
    } else { // enemy
      if ($gameSystem.enemySkillVoices != null) {
        $gameSystem.enemySkillVoices[+args.enemyId] = null;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'itemSet', args => {
    const actor = $gameActors.actor(+args.actorId);
    const targetId = +args.targetId;
    const itemIds = [+args.itemId, ...eval(args.itemId2).map(id => +id)];
    if (actor) {
      if (actor.itemVoices == null) {
        actor.itemVoices = {};
      }
      const itemVoice = actor.itemVoices;
      switch (args.isSet) {
      case 'set':
        const voice = join2voices(args.voice1, args.voice2);
        for (const itemId of itemIds) {
          if (itemVoice[itemId] == null) {
            itemVoice[itemId] = {};
          }
          itemVoice[itemId][targetId] = voice;
        }
        break;
      case 'reset':
        for (const itemId of itemIds) {
          if (+args.targetId === 0) {
            itemVoice[itemId] = null;
          } else {
            itemVoice[itemId][targetId] = null;
          }
        }
        break;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'itemAllReset', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.itemVoices = null;
    }
  });

  Game_Actor.prototype.initVoiceDamageRange = function() {
    this.voiceDamageCeil = 0;
    this.voiceCeilRatio = false;
    this.voiceDamageFloor = 0;
    this.voiceFloorRatio = false;
  };

  const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this.initVoiceDamageRange();
  };

  PluginManager.registerCommand(pluginName, 'setByDamage', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.voiceDamageCeil = +args.ceilDamage;
      actor.voiceCeilRatio = args.valueTypeCeil === 'ratio';
      actor.voiceDamageFloor = +args.floorDamage;
      actor.voiceFloorRatio = args.valueTypeFloor === 'ratio';
      if (actor.battleVoices == null) {
        actor.battleVoices = {};
      }
      const voices = actor.battleVoices;
      if (actor.voiceDamageCeil) {
        voices.smallDamage = join2voices(args.voice1ceil, args.voice2ceil);
      }
      if (actor.voiceDamageFloor) {
        voices.bigDamage = join2voices(args.voice1floor, args.voice2floor);
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'resetByDamage', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.initVoiceDamageRange();
      const voices = actor.battleVoices;
      if (voices) {
        voices.smallDamage = null;
        voices.bigDamage = null;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'stateChange', args => {
    const voiceToAdd = join2voices(args.voiceAtStateAdded1,
      args.voiceAtStateAdded2
    );
    const voiceToRemove = join2voices(args.voiceAtStateRemoved1,
      args.voiceAtStateRemoved2
    );
    const targetStates = eval(args.targetStates).map(id => +id);
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      if (actor.voiceStateAdd == null) {
        actor.voiceStateAdd = {};
        actor.voiceStateRemove = {};
      }
      for (const stateId of targetStates) {
        actor.voiceStateAdd[stateId] = voiceToAdd;
        actor.voiceStateRemove[stateId] = voiceToRemove;
      }
    }
  });

  PluginManager.registerCommand(pluginName, 'resetStateChange', args => {
    const actor = $gameActors.actor(+args.actorId);
    if (actor) {
      actor.voiceStateAdd = null;
      actor.voiceStateRemove = null;
    }
  });

  //
  // set play options (interlock with switch)
  //
  const doesDisplaySpecialOptions = () => {
    return !SceneManager.isPreviousScene(Scene_Title);
  };

  const _Window_Options_makeCommandList =
   Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    if (doesDisplaySpecialOptions()) {
      this.addCommand(strBattleVoice, 'battleVoice');
    }
    _Window_Options_makeCommandList.call(this);
  };

  const _Window_Options_getConfigValue =
   Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function(symbol) { 
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.value(playSwitchId);
    default:
      return _Window_Options_getConfigValue.call(this, symbol);
    }
  };

  const _Window_Options_setConfigValue =
   Window_Options.prototype.setConfigValue;
  Window_Options.prototype.setConfigValue = function(symbol, volume) {
    switch (symbol) {
    case 'battleVoice':
      return $gameSwitches.setValue(playSwitchId, volume);
    default:
      return _Window_Options_setConfigValue.call(this, symbol, volume);
    }
  };

  const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
  Scene_Options.prototype.maxCommands = function() {
    const rowNum = _Scene_Options_maxCommands.call(this);
    return doesDisplaySpecialOptions() ? rowNum + 1 : rowNum;
  };

  //
  // play battler voice
  //
  const canPlayBattlerVoice = () => {
    return $gameSwitches.value(playSwitchId);
  };

  const split = name => {
    if (!name) {
      return name;
    }
    const names = name.split(',');
    return names[Math.randomInt(names.length)];
  };

  const createAudioByFileName = name => {
    const audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    audio.pan = pan;
    return audio;
  };

  const createEnemyAudioByFileName = name => {
    const audio = {};
    audio.name = name;
    audio.pitch = enemyPitch;
    audio.volume = enemyVolume;
    audio.pan = enemyPan;
    return audio;
  };

  const playActorVoice = (actor, type) => {
    if (!canPlayBattlerVoice()) {
      return;
    }
    const setVoice = actor.battleVoices || {};
    const battlerMeta = actor.actor().meta;
    const name = _voiceFileName(setVoice, battlerMeta, type);
    if (name) {
      const audio = createAudioByFileName(name);
      AudioManager.playSe(audio);
    }
    return name; // for check if voice played or not
  };

  const playEnemyVoice = (enemy, type) => {
    if (!canPlayBattlerVoice()) {
      return;
    }
    let ev;
    const voices = (ev = $gameSystem.enemyVoices) ?
      (ev[enemy.enemyId()] || {}) : {};
    const battlerMeta = enemy.enemy().meta;
    const name = _voiceFileName(voices, battlerMeta, type);
    if (name) {
      const audio = createEnemyAudioByFileName(name);
      AudioManager.playSe(audio);
    }
    return name; // for check if voice played or not
  };

  const playBattlerVoice = (battler, type) => {
    if (battler.isActor()) {
      return playActorVoice(battler, type);
    }
    if (battler.isEnemy()) {
      return playEnemyVoice(battler, type);
    }
  };

  const _voiceFileName = (setVoice, battlerMeta, type) => {
    const a = setVoice;
    const m = battlerMeta;
    let name = '';
    switch(type){
    case 'attack':
      name = split(a.attack || m.attackVoice);
      break;
    case 'guard':
      name = split(a.guard || m.guardVoice);
      break;
    case 'recover':
      name = split(a.recover || m.recoverVoice);
      break;
    case 'friendmagic':
      name = split(a.friendMagic || m.friendMagicVoice || a.magic ||
        m.magicVoice
      );
      break;
    case 'magic':
      name = split(a.magic || m.magicVoice);
      break;
    case 'skill':
      name = split(a.skill || m.skillVoice);
      break;
    case 'itemAlly':
      name = split(a.itemAlly || m.itemAllyVoice || a.item || m.itemVoice);
      break;
    case 'item':
      name = split(a.item || m.itemVoice);
      break;
    case 'damage':
      name = split(a.damage || m.damageVoice);
      break;
    case 'smallDamage':
      name = split(a.smallDamage || a.damage || m.damageVoice);
      break;
    case 'bigDamage':
      name = split(a.bigDamage || a.damage || m.damageVoice);
      break;
    case 'evade':
      name = split(a.evade || m.evadeVoice);
      break;
    case 'dead':
      name = split(a.dead || m.defeatedVoice);
      break;
    case 'counter':
      name = split(a.counter || m.counterVoice);
      break;
    case 'reflect':
      name = split(a.reflect || m.reflectVoice);
      break;
    case 'kill':
      name = split(a.kill || m.killVoice);
      break;
    case 'fromAlly':
      name = split(a.fromAlly || m.fromAllyVoice);
      break;
    case 'first':
      name = split(a.first || m.firstVoice);
      break;
    case 'preemptiveFirst':
      name = split(a.preemptiveFirst || m.preemptiveFirstVoice);
      break;
    case 'surpriseFirst':
      name = split(a.surpriseFirst || m.surpriseFirstVoice);
      break;
    case 'victory':
      name = split(a.victory || m.victoryVoice);
      break;
    case 'runaway':
      name = split(a.runaway || m.runawayVoice);
      break;
    case 'allDead':
      name = split(a.allDead || m.allDeadVoice);
      break;
    case 'levelUp':
      name = split(a.levelUp || m.levelUpVoice);
      break;
    case 'command':
      name = split(a.command || m.commandVoice);
      break;
    }
    if (name === '$') {
      name = '';
    }
    return name;
  };

  //
  // process for skill and item
  //
  const isSkillVoice = (battler, action) => {
    if (action.isSkill()) {
      if (battler.isActor() && battler.skillVoices) {
        return !!battler.skillVoices[action._item.itemId()];
      } else if (battler.isEnemy() && $gameSystem.enemySkillVoices) {
        const enemy = $gameSystem.enemySkillVoices[battler.enemyId()];
        return !!enemy && !!enemy[action._item.itemId()];
      }
    }
    return false;
  };

  const playSkillVoice = (battler, action) => {
    if (!canPlayBattlerVoice()) {
      return;
    }
    let name = '';
    if (battler.isActor()) {
      name = split(battler.skillVoices[action._item.itemId()]);
    } else if (battler.isEnemy()){
      const enemy = $gameSystem.enemySkillVoices[battler.enemyId()];
      name = split(enemy[action._item.itemId()]);
    }
    if (name && name !== "$") {
      if (battler.isActor()) {
        AudioManager.playSe(createAudioByFileName(name));
      } else if (battler.isEnemy()) {
        AudioManager.playSe(createEnemyAudioByFileName(name));
      }
    }
  };

  const isItemVoice = (actor, action) => {
    if (!actor.itemVoices || !action.isItem()) {
      return false;
    }
    const itemVoice = actor.itemVoices[action._item.itemId()];
    if (!itemVoice) {
      return false;
    }
    if (action.isForFriend()) {
      const target = $gameParty.battleMembers()[action._targetIndex];
      const id = target ? target.actorId() : 0;
      return !!(itemVoice[id] || itemVoice[0]);
    } else if (action.isForOpponent()){
      return !!itemVoice[0];
    }
    return false;
  };

  const playItemVoice = (actor, action) => {
    if (!canPlayBattlerVoice()) {
      return;
    }
    const itemVoice = actor.itemVoices[action._item.itemId()];
    let name = "";
    if (action.isForFriend()) {
      const target = $gameParty.battleMembers()[action._targetIndex];
      const id = target ? target.actorId() : 0;
      name = split(itemVoice[id] || itemVoice[0]);
    } else if (action.isForOpponent()) {
      name = split(itemVoice[0]);
    }
    if (name && name !=="$") {
      const audio = createAudioByFileName(name);
      AudioManager.playSe(audio);
    }
  };

  //
  // process states change
  //
  const _Window_BattleLog_displayChangedStates =
   Window_BattleLog.prototype.displayChangedStates;
  Window_BattleLog.prototype.displayChangedStates = function(target) {
    if (!target.result().hpAffected) {
      playStateChangeVoice(target);
    }
    _Window_BattleLog_displayChangedStates.call(this, target);
  };

  const playStateChangeVoice = target => {
    let stateId = 0;
    let name = '';
    if (stateId = addedStateVoiceId(target)) {
      name = split(target.voiceStateAdd[stateId]);
    } else if (stateId = removedStateVoiceId(target)) {
      name = split(target.voiceStateRemove[stateId]);
    }
    if (name && name !== "$") {
      if (target.isActor()) {
        AudioManager.playSe(createAudioByFileName(name));
      } else if (target.isEnemy()) {
        AudioManager.playSe(createEnemyAudioByFileName(name));
      }
    }
  };

  const addedStateVoiceId = target => {
    let maxStateId = 0;
    if (target.voiceStateAdd) {
      const result = target.result();
      const states = result.addedStateObjects();
      let maxPriority = -100;
      for (const state of states) {
        if (target.voiceStateAdd[state.id] && state.priority > maxPriority) {
          maxStateId = state.id;
          maxPriority  = state.priority;
        }
      }
    }
    return maxStateId;
  };

  const removedStateVoiceId = target => {
    let maxStateId = 0;
    if (target.voiceStateRemove) {
      const result = target.result();
      const states = result.removedStateObjects();
      let maxPriority = -100;
      for (const s of states) {
        if (target.voiceStateRemove[s.id] && s.priority > maxPriority) {
          maxStateId = s.id;
          maxPriority  = s.priority;
        }
      }
    }
    return maxStateId;
  };

  //
  // functions for call actor's active action voices.
  //
  const _Game_Battler_performAction = Game_Battler.prototype.performAction;
  Game_Battler.prototype.performAction = function(action) {
    _Game_Battler_performAction.call(this, action);
    if (isSkillVoice(this, action)) {
      playSkillVoice(this, action);
    } else if (isItemVoice(this, action)) {
       playItemVoice(this, action);
    } else if (action.isAttack()) {
      playBattlerVoice(this, 'attack');
    } else if (action.isGuard() && BattleManager.isTpb()) {
      playBattlerVoice(this, 'guard');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      playBattlerVoice(this, 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      playBattlerVoice(this, 'friendmagic');
    } else if (action.isMagicSkill()) {
      playBattlerVoice(this, 'magic');
    } else if (action.isSkill()) {
      playBattlerVoice(this, 'skill');
    } else if (action.isItem() && action.isForFriend()) {
      playBattlerVoice(this, 'itemAlly');
    } else if (action.isItem()) {
      playBattlerVoice(this, 'item');
    }
  };

  //
  // Voices when actor take damage
  //

  // for memorize hp damage
  const _Window_BattleLog_displayHpDamage =
   Window_BattleLog.prototype.displayHpDamage;
  Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (target.result().hpAffected) {
      if (target.result().hpDamage > 0 && !target.result().drain) {
        target._damageForVoice = target.result().hpDamage;
      }
    }
    _Window_BattleLog_displayHpDamage.call(this, target);
  };

  const _Game_Battler_performDamage = Game_Battler.prototype.performDamage;
  Game_Battler.prototype.performDamage = function() {
    _Game_Battler_performDamage.call(this);
    const damage = this._damageForVoice;
    if (this.voiceDamageCeil) {
      const vdc = this.voiceDamageCeil;
      const ceilDamage = this.voiceCeilRatio ? this.mhp * vdc / 100 : vdc;
      if (damage < ceilDamage) {
        playBattlerVoice(this, 'smallDamage');
        return;
      }
    }
    if (this.voiceDamageFloor) {
      const vdf = this.voiceDamageFloor;
      const floorDamage = this.voiceFloorRatio ? this.mhp * vdf / 100 : vdf;
      if (damage >= floorDamage) {
        playBattlerVoice(this, 'bigDamage');
        return;
      }
    }
    playBattlerVoice(this, 'damage');
  };

  //
  // Voices for actor's passive action
  //
  const _Game_Battler_performEvasion = Game_Battler.prototype.performEvasion;
  Game_Battler.prototype.performEvasion = function() {
    _Game_Battler_performEvasion.call(this);
    playBattlerVoice(this, 'evade');
  };

  const _Game_Battler_performMiss = Game_Battler.prototype.performMiss;
  Game_Battler.prototype.performMiss = function() {
    _Game_Battler_performMiss.call(this);
    playBattlerVoice(this, 'evade');
  };


  const _Game_Battler_performCollapse = Game_Battler.prototype.performCollapse;
  Game_Battler.prototype.performCollapse = function() {
    _Game_Battler_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      const played = playBattlerVoice(this, 'dead');
      if (!played && BattleManager._subject) {
        playBattlerVoice(BattleManager._subject, 'kill');
      };
    }
  };

  const _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
  BattleManager.invokeCounterAttack = function(subject, target) {1
    playBattlerVoice(target, 'counter');
    _BattleManager_invokeCounterAttack.call(this, subject, target);
  };

  const _BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
  BattleManager.invokeMagicReflection = function(subject, target) {
    playBattlerVoice(target, 'reflect');
    _BattleManager_invokeMagicReflection.call(this, subject, target);
  };

  //
  // Voices at battle starts
  //

  const playFirstVoice = () => {
    let typeAndCandidates = null;
    if (typeAndCandidates = enemyFirstVoice()) {
      //
    } else if (typeAndCandidates = preemptiveFirstVoice()) {
      //
    } else if (typeAndCandidates = surpriseFirstVoice()) {
      //
    } else if (typeAndCandidates = normalFirstVoice()) {
      //
    }
    if (typeAndCandidates) {
      const type = typeAndCandidates.type;
      const battlers = typeAndCandidates.battlers;
      const battler = battlers[Math.randomInt(battlers.length)];
      playBattlerVoice(battler, type);
    }
  };

  const enemyFirstVoice = () => {
    const candidates = $gameTroop.aliveMembers().filter(enemy => {
      return enemy.enemy().meta.firstVoice;
    });
    if (candidates.length > 0) {
      return {type:'first', battlers:candidates};
    }
    return null;
  };

  const preemptiveFirstVoice = () => {
    if (BattleManager._preemptive) {
      const candidates = $gameParty.aliveMembers().filter(actor => {
        return actor.actor().meta.preemptiveFirstVoice != null || 
          (actor.battleVoices && actor.battleVoices.preemptiveFirst);
      });
      if (candidates.length > 0) {
        return {type:'preemptiveFirst', battlers:candidates};
      }
    }
    return null;
  };

  const surpriseFirstVoice = () => {
    if (BattleManager._surprise) {
      const candidates = $gameParty.aliveMembers().filter(actor => {
        return actor.actor().meta.surpriseFirstVoice != null || 
          (actor.battleVoices && actor.battleVoices.surpriseFirst);
      });
      if (candidates.length > 0) {
        return {type:'surpriseFirst', battlers:candidates};
      }
    }
    return null;
  };

  const normalFirstVoice = () => {
    if (!BattleManager._surprise) {
      const candidates = $gameParty.aliveMembers().filter(actor => {
        return actor.actor().meta.firstVoice != null || 
          (actor.battleVoices && actor.battleVoices.first);
      });
      if (candidates.length > 0) {
        return {type:'first', battlers:candidates};
      }
    }
    return null;
  };

  //
  // Voices for battle sequence
  //
  const _Game_System_onBattleStart = Game_System.prototype.onBattleStart;
  Game_System.prototype.onBattleStart = function() {
    _Game_System_onBattleStart.call(this);
    if (!delayMsgTiming) {
      playFirstVoice();
    }
  };

  const _BattleManager_updateStart = BattleManager.updateStart;
  BattleManager.updateStart = function() {
    if (delayMsgTiming) {
      if ($gameTroop._turnCount === 0) {
        playFirstVoice();
      }
    }
    _BattleManager_updateStart.call(this);
  };

  const _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    const candidates = $gameParty.aliveMembers().filter(actor => {
      return actor.actor().meta.victoryVoice || 
        (actor.battleVoices && actor.battleVoices.victory);
    });
    if (candidates.length > 0) {
      const index = Math.randomInt(candidates.length);
      const actor = candidates[index];
      playActorVoice(actor, 'victory');
    }
    _BattleManager_processVictory.call(this);
  };

  const _Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
  Scene_Battle.prototype.commandEscape = function() {
    const candidates = $gameParty.aliveMembers().filter(actor => {
      return actor.actor().meta.runawayVoice || 
        (actor.battleVoices && actor.battleVoices.runaway);
    });
    if (candidates.length > 0) {
      const index = Math.randomInt(candidates.length);
      const actor = candidates[index];
      playActorVoice(actor, 'runaway');
    }
    _Scene_Battle_commandEscape.call(this);
  };

  const _BattleManager_processDefeat = BattleManager.processDefeat;
  BattleManager.processDefeat = function() {
    let enemyVoice;
    const candidates = $gameTroop.aliveMembers().filter(enemy => {
      return enemy.enemy().meta.allDeadVoice || ($gameSystem.enemyVoices &&
        (enemyVoice = $gameSystem.enemyVoices[enemy.enemyId()]) &&
        enemyVoice.allDead
      )}
    );
    if (candidates.length > 0) { // enemy
      const index = Math.randomInt(candidates.length);
      const enemy = candidates[index];
      playEnemyVoice(enemy, 'allDead');
    } else { // actor
      const lastTargetActor = $gameActors.actor($gameTemp.lastActionData(4));
      playActorVoice(lastTargetActor, 'allDead');
    }
    _BattleManager_processDefeat.call(this);
  };

  //
  // receive recovery skill from ally.
  //
  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    // to prevent multiple play when both hp and mp are recoverd.
    this.recoverPlayed = false;
  };

  const _Window_BattleLog_displayDamage =
   Window_BattleLog.prototype.displayDamage;
  Window_BattleLog.prototype.displayDamage = function(target) {
    $gameTemp.recoverPlayed = false;
    _Window_BattleLog_displayDamage.call(this, target);
  };

  const _Game_Actor_performRecovery = Game_Actor.prototype.performRecovery;
  Game_Actor.prototype.performRecovery = function() {
    // not play voice if target is the same as magic user
    if (this !== BattleManager._subject) {
      if (!$gameTemp.recoverPlayed) {
        playActorVoice(this, 'fromAlly');
        $gameTemp.recoverPlayed = true;
      }
    }
    _Game_Actor_performRecovery.call(this);
  };

  //
  // process level up voice
  //

  // !!overwrite!!
  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    const text = '\\AVOICE[' + this.actorId() + ']' +
      TextManager.levelUp.format(this._name, TextManager.level, this._level);
    $gameMessage.newPage();
    $gameMessage.add(text);
    for (const skill of newSkills) {
      $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    }
  };

  const _Window_Message_processEscapeCharacter =
   Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    _Window_Message_processEscapeCharacter.call(this, code, textState);
    switch (code) {
    case 'AVOICE':
      const actorId = this.obtainEscapeParam(textState);
      playActorVoice($gameActors.actor(actorId), 'levelUp');
      break;
    }
  };

  //
  // Voice at actor command input
  //
  const _Scene_Battle_startActorCommandSelection =
   Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function() {
    playActorVoice(BattleManager.actor(), 'command');
    _Scene_Battle_startActorCommandSelection.call(this);
  };

})();
