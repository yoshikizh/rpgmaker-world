Spriteset_Map.prototype.addBattleActors = function(callback){
  // const dataMap = $dataBattleMaps.find(obj => obj.mapId === $gameMap.mapId())
  // const actorsPositions = dataMap.actors_position
  // this._battleActors = []

  const actorEvents = $gameMap.actorEvents()
  
  SceneManager._scene._waitCount = 1000
  const battleActors = $gameParty.members()
  const battleMembers = {}
  battleActors.forEach((actor,index) => {
    setTimeout(() => {
      const actorEvent = actorEvents[index]
      // const pos = actorsPositions[index]
      // const actor = $gameActors._data[actorId]

      // set element
      actor.actionStatus = "none" // none: 没有行动 pending: 准备行动 moving: 移动中 over: 行动结束
      actor.moveTargetGrid = []   // 移动目标格子坐标 [x, y]
      battleMembers[actorEvent._eventId] = actor

      actorEvent._characterName = actor._characterName
      actorEvent._characterIndex = actor._characterIndex
      actorEvent.battler = actor

      $gameTemp.requestAnimation([actorEvent], Config.battlerAppearAnimationId)
      if (index === battleActors.length - 1){
        callback(battleMembers)
      }
    }, 500 * index)
  })
}
