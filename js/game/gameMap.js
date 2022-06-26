Game_Map.prototype.actorEvents = function() {
    return this.events().filter(event => event.event().note === "actor")
}

Game_Map.prototype.enemyEvents = function() {
    return this.events().filter(event => event.event().note === "enemy")
}