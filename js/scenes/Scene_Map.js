// 开启战斗
Scene_Map.battle = function(){
  if (SceneManager._scene.constructor === Scene_Map){
    SceneManager._scene.startBattle()
  }
}

Scene_Map.prototype.findEventSprite = function(event){
  const eventId = event.eventId()
  const characterSprites = this._spriteset._characterSprites
  const _eventSprite = characterSprites.find(sp => sp._character instanceof Game_Event && sp._character.eventId() === eventId)
  return _eventSprite
}


Scene_Map.prototype.isStartBattle = function(){
  return $gameSwitches._data[1];
}
  
Scene_Map.prototype.startBattle = function(){
  this._sceneBattle = new SceneBattleSlg(this)
  this._sceneBattle.start()
  // this._battlePhase = 1;
}

// 初始化世界地图 (地图载入后仅运行一次)
Scene_Map.prototype.initWoroldMap = function() {
  console.log("init world map")
}

// 世界地图专有的 update
Scene_Map.prototype.updateWorldMap = function() {
  this.updateWorldMapScrollTouch()
  this.updateWorldMapEventsClick()
}

// 世界地图 event click 事件
Scene_Map.prototype.updateWorldMapEventsClick = function() {
  if (TouchInput.isClicked()){
    // console.log("clicked -> Touch position", TouchInput._x, TouchInput._y)
    const x = $gameMap.canvasToMapX(TouchInput.x)
    const y = $gameMap.canvasToMapY(TouchInput.y)
    const event = $gameMap.events().filter(event => event.x === x && event.y === y)[0]
    if (event){
      const dataEvent = $dataMap.events[event.eventId()]
      if (dataEvent && dataEvent.note === "clickEvent"){
        event.start()
      }
    }
  }
}

// 世界地图 Touch 滚动地图事件
Scene_Map.prototype.updateWorldMapScrollTouch = function() {
  if (TouchInput.isReleased()){
    this.touchTriggered = false
    console.log("released", TouchInput._x, TouchInput._y)
  }
  if (TouchInput.isTriggered()){
    this.touchTriggered = true
    this.triggerX = TouchInput._x
    this.triggerY = TouchInput._y
    console.log("triggered", TouchInput._x, TouchInput._y)
  }

  if (TouchInput.isMoved()){
    if (this.touchTriggered){
      console.log("moved", TouchInput._x, TouchInput._y)

      const nowTriggerX = TouchInput._x
      const nowTriggerY = TouchInput._y

      const speed = 8
      const gridWidth = 48

      // scroll left
      if (nowTriggerX > this.triggerX ) {
        const distance = nowTriggerX - this.triggerX
        if (distance > gridWidth){
          // const nowX = SceneManager._scene._spriteset._tilemap.origin.x - distance
          // SceneManager._scene._spriteset._tilemap.origin.x = nowX
          // if (nowX % 48 === 0){
          //     $gameMap.startScroll(6,1,10)
          // }
          $gameMap.startScroll(4,1,10)
          this.triggerX = TouchInput._x
        }
      }
      // scroll up
      if (nowTriggerY > this.triggerY ) {
        const distance = nowTriggerY - this.triggerY
        if (distance > gridWidth){
          // const nowY = SceneManager._scene._spriteset._tilemap.origin.y - distance
          // SceneManager._scene._spriteset._tilemap.origin.y = nowY
          // if (nowY % 48 === 0){
          //     $gameMap.startScroll(2,1,10)
          // }
          $gameMap.startScroll(8,1,10)
          this.triggerY = TouchInput._y
        }
      }

      // scroll right
      if (nowTriggerX < this.triggerX ) {
        const distance = this.triggerX - nowTriggerX
        if (distance > gridWidth){
          // const nowX = SceneManager._scene._spriteset._tilemap.origin.x + distance
          // SceneManager._scene._spriteset._tilemap.origin.x = nowX
          // if (nowX % 48 === 0){
          //     $gameMap.startScroll(4,1,10)
          // }
          $gameMap.startScroll(6,1,10)
          this.triggerX = TouchInput._x

        }
      }
      // scroll down
      if (nowTriggerY < this.triggerY ) {
        const distance = this.triggerY - nowTriggerY
        if (distance > gridWidth){
          // const nowY = SceneManager._scene._spriteset._tilemap.origin.y + distance
          // SceneManager._scene._spriteset._tilemap.origin.y = nowY
          // if (nowY % 48 === 0){
          //     $gameMap.startScroll(8,1,10)
          // }
          $gameMap.startScroll(2,1,10)
          this.triggerY = TouchInput._y
        }
      }
    }       
  }
}
