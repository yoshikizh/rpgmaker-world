class SpriteSlgGrids extends Sprite {
  constructor(){
    super()
    this.range = 0
    this.z = 0
    this.spGrids = []
    this.spBitmap = new Bitmap(48,48)
    this.centerX = null
    this.centerY = null
  }

  setCenter(centerX, centerY){
    this.centerX = centerX
    this.centerY = centerY
  }

  isBlank(){
    return this.spGrids.length === 0
  }

  hideGrids(){
    this.visible = false
  }

  // 更新移动格子(透明度变化)
  update(){
    this.spGrids.forEach((sprite) => {
      if (sprite.opacityDir === "up"){
        sprite.opacity += 2
      }
      if (sprite.opacityDir === "down"){
        sprite.opacity -= 2
      }
      if (sprite.opacity >= 255){
        sprite.opacityDir = "down"
      }
      if (sprite.opacity <= 100){
        sprite.opacityDir = "up"
      }
      sprite.x = this.centerX + sprite.positionI * 48
      if (sprite.positionDir === "up"){
          sprite.y = this.centerY - sprite.positionJ * 48
      } else {
          sprite.y = this.centerY + sprite.positionJ * 48
      }
    })
  }

  // 创建移动范围的格子
  createGrids(centerX, centerY, moveRange, atkRange=1){
    const totalRange = moveRange + atkRange
    this.setCenter(centerX, centerY)
    const bitmapGrid = ImageManager.loadSystem("grid1")
    bitmapGrid.addLoadListener(() => {
      this.spBitmap.blt(bitmapGrid, 0,0,bitmapGrid.width, bitmapGrid.height, 0,0,48,48)
      for (var j = 0; j <= totalRange; j++){
        for (var i = -(totalRange-j); i <= totalRange-j; i++){
          const sprite = new Sprite()
          sprite.bitmap = this.spBitmap
          sprite.anchor.x = 0.5
          sprite.anchor.y = 1
          sprite.x = centerX + i * 48
          sprite.y = centerY - j * 48
          sprite.opacity = 50
          sprite.opacityDir = "up"
          sprite.positionDir = "up"
          sprite.positionI = i
          sprite.positionJ = j
          sprite.z = 0

          const leftRange = -(totalRange-j)
          const rightRange = totalRange-j
          if ((i >= leftRange && i <= leftRange + atkRange - 1) || (i <= rightRange && i >= rightRange - atkRange + 1)){
            sprite.setBlendColor([255,0,0,128])
          }

          this.spGrids.push(sprite)
          this.addChild(sprite)
        }
      }
      for (var j = 1; j <= totalRange; j++){
        for (var i = -(totalRange-j); i <= totalRange-j; i++){
          const sprite = new Sprite()
          sprite.bitmap = this.spBitmap
          sprite.anchor.x = 0.5
          sprite.anchor.y = 1
          sprite.x = centerX + i * 48
          sprite.y = centerY + j * 48
          sprite.opacity = 50
          sprite.opacityDir = "up"
          sprite.positionDir = "down"
          sprite.positionI = i
          sprite.positionJ = j
          sprite.z = 0

          const leftRange = -(totalRange-j)
          const rightRange = totalRange-j
          if ((i >= leftRange && i <= leftRange + atkRange - 1) || (i <= rightRange && i >= rightRange - atkRange + 1)){
            sprite.setBlendColor([255,0,0,128])
          }

          this.spGrids.push(sprite)
          this.addChild(sprite)
        }
      }
      bitmapGrid.destroy()
    }
  )}

  destroy(){
    super.destroy()
    this.spBitmap.destroy()
  }
}