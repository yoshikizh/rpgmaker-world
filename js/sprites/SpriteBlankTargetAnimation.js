// 播放空对象动画的 Sp
// -> 直接制定坐标播放
class SpriteBlankTargetAnimation extends Sprite {
  constructor(animationId){
    super()
    this.animation = $dataAnimations[animationId]
    this.isMv = !!this.animation.frames
    this.target = new Sprite()
    this.spAni = this.isMv ? new Sprite_AnimationMV() : new Sprite_Animation()
    this.spAni.tag = "touchScreenAnimation"
    this.spAni._playing = false

    this.addChild(this.target)
    this.addChild(this.spAni)
  }

  play(x, y){
    this.target.x = x
    this.target.y = y

    if (this.isMv){
      if (this.spAni.isPlaying()){
        return
      }
    } else {
      if (this.spAni._playing){
        return
      }
    }

    // if (this.spAni.isPlaying()){
    //   return
    // }
    this.spAni.initMembers()
    this.spAni.setup([this.target], this.animation, false, 0, false)
    // this.spAni.show()
    // this.spAni._playing = true
  }

  update(){
    super.update()
    this.spAni.update()
  }

  // destroy(){
  //   super.destroy()
  //   this.target.destroy()
  //   this.spAni.destroy()
  // }
}
