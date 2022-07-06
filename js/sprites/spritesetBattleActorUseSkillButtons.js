class SpritesetBattleActorUseSkillButtons extends Sprite {
	constructor(){
		super()

		this.spAtk = new Sprite_Clickable()
		this.spAtk.anchor.x = 0.5
		this.spAtk.anchor.y = 0.5
		this.spAtk.x = Config.width - dp(90)
		this.spAtk.y = Config.height - dp(90)

		this.registerEvent()

		this.addChild(this.spAtk)
	}

	registerEvent(){
		this.spAtk.onClick = ()=>{
			alert(123)
		}
	}

	refresh(){
		this.spAtk.bitmap = ImageManager.loadSystem("Buttons/battle/attack")
		// const size = dp(60)
		// this.spAtk.bitmap.setFrame()
	}
} 