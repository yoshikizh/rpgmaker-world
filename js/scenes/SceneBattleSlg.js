// SLG 战斗核心
class SceneBattleSlg {
    constructor(sceneMap){
        this.sceneMap = sceneMap
        this._spriteGrid = new SpriteSlgGrids()
        this._windowBattleStatus = new WindowBattleStatus(new Rectangle(0,0,Config.width, dp(200) ))
        this.sceneMap._spriteset._tilemap.addChild(this._spriteGrid)
        this.sceneMap.addWindow(this._windowBattleStatus)
        this.initialize()
    }

    // 初始化 Battle
    initialize(){
        this._battlePhase = 0       // 战斗步骤 
        this._battleMembers = {}    // {eventId: actor}
        this._activeActor = null    // 当前行动 Actor
        this._activeEnemy = null    // 当前行动 Enemy
        this._actionSide = null     // 行动方向 actor, enemy
        // this._moveSpGrids = []      // 移动格子 sprites

    }

    start(){
        this._actionSide = "actor"
        this._battlePhase = 1
    }
    
    // 创建 Battle 成员 -> callback 设置 battleMember
    createBattleMember(){
        this.sceneMap._spriteset.addBattleActors((battleMembers)=>{
            this._battlePhase = 1.2
            this._battleMembers = battleMembers
        });
    }

    // 更新战斗步骤
    update(){
        // if (this.isStartBattle()){
            if (this._battlePhase === 1){
                this.createBattleMember()
                this._battlePhase = 1.1
            }
            if (this._battlePhase === 1.1){
            }
            if (this._battlePhase === 1.2){
                this.waitBattleMemberAnimation()
            }
            if (this._battlePhase === 2){
                this.updateAction()
            }
        // }
    }

    // 更新行动
    updateAction(){
        if (this._actionSide === "actor"){
            this.updateActionActorSide()
        }
        if (this._actionSide === "enemy"){
            this.updateActionEnemySide()
        }
    }
    
    // 更新 actor 方行动
    updateActionActorSide(){
        this.updateActiveActor()
    }

    // 更新 active 的 actor 行动
    updateActiveActor(){
        this._activeActor = this.actors().find(actor => actor.battler.active)
        this._activeActor._moveSpeed = 5
        if (!this._activeActor){
            return
        }
        if (this._spriteGrid.isBlank()){
            const screenX = this._activeActor.screenX()
            const screenY = this._activeActor.screenY()
            const moveDistance = $dataSlgActors[this._activeActor.battler._actorId].moveDistance

            this._spriteGrid.createGrids(screenX, screenY, moveDistance)
            this._activeActor.battler.actionStatus = "pending"
        }
        this.updateActorMoveGrid()
        this.updateMoveTouch()
        this.updateMoving()
        this.updateMoveOver()
    }

    // 更新移动结束
    updateMoveOver(){
        if (this._activeActor.battler.actionStatus === "moveOver"){
            
        }
    }

    // 更新移动
    updateMoving(){
        if (this._activeActor.battler.actionStatus === "moving"){
            if (this._activeActor.isMoving()){
                return
            }
            const targetGridPos = this._activeActor.battler.moveTargetGrid
            const targetX = targetGridPos[0]
            const targetY = targetGridPos[1]
            if (this._activeActor.x === targetX && this._activeActor.y === targetY){
                this._activeActor.battler.actionStatus = "moveOver"
                this._windowBattleStatus.refresh(this._activeActor.battler)
                console.log("move over")
                return
            }
            this._activeActor.moveTowardPos(targetX,targetY)
        }
    }

    // 更新移动格子(透明度变化)
    updateActorMoveGrid(){
        if (this._activeActor.battler.actionStatus === "pending"){
            const screenX = this._activeActor.screenX()
            const screenY = this._activeActor.screenY()
            this._spriteGrid.update(screenX, screenY)
        }
    }
    
    // 更新移动范围格子 Touch 事件
    updateMoveTouch(){
        if (this._activeActor.battler.actionStatus === "pending"){
            if (TouchInput.isTriggered()) {
                if (TouchInput.isPressed() && !this.sceneMap.isAnyButtonPressed()) {
                    const x = $gameMap.canvasToMapX(TouchInput.x)
                    const y = $gameMap.canvasToMapY(TouchInput.y)
                    const allMovePos = this._spriteGrid.spGrids.map(sp=>[$gameMap.canvasToMapX(sp.x), $gameMap.canvasToMapY(sp.y)])
                    const canMove = allMovePos.some(arr => arr[0] === x && arr[1] === y)
                    if (canMove){
                        this._activeActor.battler.actionStatus = "moving"
                        this._activeActor.battler.moveTargetGrid = [x,y]
                        this._spriteGrid.hideGrids()
                    } else {
                        console.log("can not move",x,y)
                    }
                }
            }
        }
    }

    // 更新 Enemy side 行动
    updateActionEnemySide(){

    }
    
    // 获取 actors
    actors(){
        return $gameMap.actorEvents()
    }
    
    // 获取 enemies
    enemies(){
        return $gameMap.enemyEvents()
    }
    
    // 等待 Battle 成员出现动画效果
    waitBattleMemberAnimation(){
        const actorEvents = $gameMap.actorEvents()
        const playingAnimations = actorEvents.some(event => event.isAnimationPlaying())
        if (!playingAnimations){
            this._battlePhase = 2
        }
    }
}














