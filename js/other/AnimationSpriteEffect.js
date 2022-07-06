class AnimationSpriteEffect {
  constructor(){
    this.sprite = null
    this.effectType = null
    this.options = {}
  }

  isBlank(){
    return this.sprite === null
  }

  // blend 闪烁
  setEffectBlendFlash(sprite, options = {}){
    this.sprite = sprite
    this.options = options
    this.effectType = "blendFlash"
    this.blendColor = options.color || [255,255,255]
    this.blendFlashSpeed = options.speed || 5
    this.blendFlashAlpha = 0
    this.blendFlashAlphaDir = "up"
  }

  update(){
    if (this.effectType = "blendFlash"){
      this.updateBlendFlash()
    }
  }

  updateBlendFlash(){
    if (this.blendFlashAlphaDir === "down"){
      this.blendFlashAlpha -= this.blendFlashSpeed
    }
    if (this.blendFlashAlphaDir === "up"){
      this.blendFlashAlpha += this.blendFlashSpeed
    }
    if (this.blendFlashAlpha >= 150){
      this.blendFlashAlphaDir = "down"
    }
    if (this.blendFlashAlpha <= 0){
      this.blendFlashAlphaDir = "up"
    }
    this.sprite.setBlendColor([...this.blendColor, this.blendFlashAlpha])
  }
}

