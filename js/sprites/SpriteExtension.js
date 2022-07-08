var _SpriteUpdate = Sprite.prototype.update;

// 来回旋转动画
Sprite.prototype.applyRotateBackAndForth = function(options = {}){
  this.exAnimationOptions = options
  this.exEffectType = "rotateBackAndForth"
  const minAngle = options.minAngle || -5
  const maxAngle = options.maxAngle || 5
  const speed = options.speed || 0.3

  this.exRotateBackAndForthMinRotate = minAngle * Math.PI / 180
  this.exRotateBackAndForthMaxRotate = maxAngle * Math.PI / 180
  this.exRotateBackAndForthSpeed = speed * Math.PI / 180
  this.exRotateBackAndForthDir = "up"
}

Sprite.prototype.updateExRotateBackAndForth = function(){
  if (this.exRotateBackAndForthDir === "down"){
    this.rotation -= this.exRotateBackAndForthSpeed
  }
  if (this.exRotateBackAndForthDir === "up"){
    this.rotation += this.exRotateBackAndForthSpeed
  }
  if (this.rotation >= this.exRotateBackAndForthMaxRotate){
    this.exRotateBackAndForthDir = "down"
  }
  if (this.rotation <= this.exRotateBackAndForthMinRotate){
    this.exRotateBackAndForthDir = "up"
  }
}


// 混合颜色动画
Sprite.prototype.applyAnimationBlend = function(options = {}){
  this.exAnimationOptions = options
  this.exEffectType = "blendFlash"
  this.exBlendColor = options.color || [255,255,255]
  this.exBlendFlashSpeed = options.speed || 5
  this.exBlendFlashMinAlpha = options.minAlpha || 0
  this.exBlendFlashMaxAlpha = options.maxAlpha || 150
  this.exBlendFlashAlphaDir = "up"
  this.exBlendFlashAlpha = 0
}

Sprite.prototype.updateExBlendFlash = function(){
  if (this.exBlendFlashAlphaDir === "down"){
    this.exBlendFlashAlpha -= this.exBlendFlashSpeed
  }
  if (this.exBlendFlashAlphaDir === "up"){
    this.exBlendFlashAlpha += this.exBlendFlashSpeed
  }
  if (this.exBlendFlashAlpha >= this.exBlendFlashMaxAlpha){
    this.exBlendFlashAlphaDir = "down"
  }
  if (this.exBlendFlashAlpha <= this.exBlendFlashMinAlpha){
    this.exBlendFlashAlphaDir = "up"
  }
  this.setBlendColor([...this.exBlendColor, this.exBlendFlashAlpha])
}

// Sprite.prototype.clearExAnimation = function(){
//   this.exEffectType = null
//   this.opacity = 255
//   this.setBlendColor([255,255,255,0])
//   this.rotation = 0
// }

Sprite.prototype.update = function() {
  _SpriteUpdate.call(this);
  if (this.exEffectType === "blendFlash"){
    this.updateExBlendFlash()
  }
  if (this.exEffectType === "rotateBackAndForth"){
    this.updateExRotateBackAndForth()
  }
}