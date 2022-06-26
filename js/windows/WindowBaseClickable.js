class WindowBaseClickable extends Window_Base {
    constructor(rect){
        super(rect)
        this.spriteClickable = new Sprite_Clickable()
        this.spriteClickable.x = 0
        this.spriteClickable.y = 0
        this.spriteClickable.bitmap = new Bitmap(this.width, this.height)
        this.addChild(this.spriteClickable)
    }

    setclickHandle(callback){
        this.spriteClickable.onClick = callback
    }
}