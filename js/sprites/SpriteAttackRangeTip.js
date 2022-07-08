class SpriteAttackRangeTip extends Sprite {
  constructor(){
    super()
  }

  createAtkTip(events){
    const bitmap = ImageManager.loadSystem("Buttons/common")

    bitmap.addLoadListener(() => {
      events.forEach((event) => {
        const sprite = new Sprite()
        sprite.bitmap = new Bitmap(48,48)
        sprite.bitmap.blt(bitmap,0,0,48,48,8,8,32,32)
        sprite.anchor.x = 0.5
        sprite.anchor.y = 0.5
        sprite.x = event.screenX()
        sprite.y = event.screenY() - 24
        sprite.z = 1.1
        sprite.applyRotateBackAndForth()
        this.addChild(sprite)
      })
    }) 
  }
}