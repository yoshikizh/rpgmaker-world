class Sprite_VirtualGamePad extends Sprite {
    constructor() {
        super()
        this._padBitmap = ImageManager.loadSystem("arrow128")

        // 是否触碰
        this.touchTriggered = false

        this.createLeftPad()
        this.createRightPad()
        this.createUpPad()
        this.createDownPad()

        this.createLeftTopPad()
        this.createRightTopPad()
        this.createLeftBottomPad()
        this.createRightBottomPad()

        this.addChildrenToStage()
    }

    centerX(){
        return Config.width / 2
    }

    padding(){
        return 48
    }

    bottomMargin(){
        return 48
    }

    bitmapWidth(){
        return 128
    }

    bitmapHeight(){
        return 49
    }

    checkHeight(){
        return parseInt(this.bitmapWidth() * 2 + this.bitmapHeight() / 3)
    }

    createLeftPad(){
        this.spLeftPad = new Sprite_Clickable()
        this.spLeftPad.bitmap = this._padBitmap
        this.spLeftPad.anchor.x = 0.5
        this.spLeftPad.anchor.y = 0.5
        this.spLeftPad.scale.x = -1
        this.spLeftPad.opacity = 128
        this.spLeftPad.x = this.centerX() - this.bitmapWidth() / 2 - this.bitmapHeight() / 2
        this.spLeftPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() - this.bitmapHeight() / 2
    }

    createRightPad(){
        this.spRightPad = new Sprite_Clickable()
        this.spRightPad.bitmap = this._padBitmap
        this.spRightPad.anchor.x = 0.5
        this.spRightPad.anchor.y = 0.5
        this.spRightPad.opacity = 128
        this.spRightPad.x = this.centerX() + this.bitmapWidth() / 2 + this.bitmapHeight() / 2
        this.spRightPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() - this.bitmapHeight() / 2
    }

    createUpPad(){
        this.spUpPad = new Sprite_Clickable()
        this.spUpPad.rotation = (-90 * Math.PI) / 180
        this.spUpPad.bitmap = this._padBitmap
        this.spUpPad.anchor.x = 0.5
        this.spUpPad.anchor.y = 0.5
        this.spUpPad.opacity = 128
        this.spUpPad.x = this.centerX()
        this.spUpPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() * 1.5 - this.bitmapHeight()
    }

    createDownPad(){
        this.spDownPad = new Sprite_Clickable()
        this.spDownPad.rotation = (90 * Math.PI) / 180
        this.spDownPad.bitmap = this._padBitmap
        this.spDownPad.anchor.x = 0.5
        this.spDownPad.anchor.y = 0.5
        this.spDownPad.opacity = 128
        this.spDownPad.x = this.centerX()
        this.spDownPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() / 2
    }

    createRightTopPad(){
        this.spRightTopPad = new Sprite_Clickable()
        this.spRightTopPad.rotation = (-45 * Math.PI) / 180
        this.spRightTopPad.bitmap = this._padBitmap
        this.spRightTopPad.anchor.x = 0.5
        this.spRightTopPad.anchor.y = 0.5
        this.spRightTopPad.opacity = 128
        this.spRightTopPad.x = this.centerX() + this.bitmapWidth() / 2 + this.bitmapHeight() / 4
        this.spRightTopPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() - this.bitmapHeight() * 2
    }

    createLeftTopPad(){
        this.spLeftTopPad = new Sprite_Clickable()
        this.spLeftTopPad.rotation = (-135 * Math.PI) / 180
        this.spLeftTopPad.bitmap = this._padBitmap
        this.spLeftTopPad.anchor.x = 0.5
        this.spLeftTopPad.anchor.y = 0.5
        this.spLeftTopPad.opacity = 128
        this.spLeftTopPad.x = this.centerX() - this.bitmapWidth() / 2 - this.bitmapHeight() / 4
        this.spLeftTopPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() - this.bitmapHeight() * 2
    }

    createLeftBottomPad(){
        this.spLeftBottomPad = new Sprite_Clickable()
        this.spLeftBottomPad.rotation = (135 * Math.PI) / 180
        this.spLeftBottomPad.bitmap = this._padBitmap
        this.spLeftBottomPad.anchor.x = 0.5
        this.spLeftBottomPad.anchor.y = 0.5
        this.spLeftBottomPad.opacity = 128
        this.spLeftBottomPad.x = this.centerX() - this.bitmapWidth() / 2 - this.bitmapHeight() / 4
        this.spLeftBottomPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() / 2 - this.bitmapHeight() / 4
    }

    createRightBottomPad(){
        this.spRightBottomPad = new Sprite_Clickable()
        this.spRightBottomPad.rotation = (45 * Math.PI) / 180
        this.spRightBottomPad.bitmap = this._padBitmap
        this.spRightBottomPad.anchor.x = 0.5
        this.spRightBottomPad.anchor.y = 0.5
        this.spRightBottomPad.opacity = 128
        this.spRightBottomPad.x = this.centerX() + this.bitmapWidth() / 2 + this.bitmapHeight() / 4
        this.spRightBottomPad.y = Config.height - this.bottomMargin() - this.bitmapWidth() / 2 - this.bitmapHeight() / 4
    }

    addChildrenToStage(){
        this.addChild(this.spLeftPad)
        this.addChild(this.spRightPad)
        this.addChild(this.spDownPad)
        this.addChild(this.spUpPad)
        this.addChild(this.spRightTopPad)
        this.addChild(this.spLeftTopPad)
        this.addChild(this.spLeftBottomPad)
        this.addChild(this.spRightBottomPad)
    }

    hitTest(spStartX, spStartY, spWidth, spHeight) {
        const x = TouchInput._x
        const y = TouchInput._y
        return (x > spStartX) && (x < (spStartX + spWidth)) && (y > spStartY) && (y < (spStartY + spHeight))
    };

    update(){
        super.update()
        if (TouchInput.isReleased()){
            this.touchTriggered = false
            console.log("vitual Game Pad released", TouchInput._x, TouchInput._y)
            this.spRightPad.opacity = 128
            this.spLeftPad.opacity = 128
            this.spDownPad.opacity = 128
            this.spUpPad.opacity = 128
            this.spRightTopPad.opacity = 128
            this.spLeftTopPad.opacity = 128
            this.spLeftBottomPad.opacity = 128
            this.spRightBottomPad.opacity = 128
        }
        if (TouchInput.isTriggered()){
            this.touchTriggered = true
            console.log("vitual Game Pad triggered", TouchInput._x, TouchInput._y)
            this.updateTouch()
        }
        if (TouchInput.isMoved()){
            if (this.touchTriggered){
                this.updateTouch()
            }
        }
        this.updateMove()
        
    }

    updateMove(){
        if ($gamePlayer.isMoving()){
            return
        }
        if (this.spRightPad.opacity === 255){
            $gamePlayer.executeMove(6)
        }
        if (this.spLeftPad.opacity === 255){
            $gamePlayer.executeMove(4)
        }
        if (this.spDownPad.opacity === 255){
            $gamePlayer.executeMove(2)
        }
        if (this.spUpPad.opacity === 255){
            $gamePlayer.executeMove(8)
        }
        if (this.spRightTopPad.opacity === 255){
            $gameTemp.setDestination($gamePlayer.x + 1, $gamePlayer.y - 1);
        }
        if (this.spLeftTopPad.opacity === 255){
            $gameTemp.setDestination($gamePlayer.x - 1, $gamePlayer.y - 1);
        }
        if (this.spLeftBottomPad.opacity === 255){
            $gameTemp.setDestination($gamePlayer.x - 1, $gamePlayer.y + 1);
        }
        if (this.spRightBottomPad.opacity === 255){
            $gameTemp.setDestination($gamePlayer.x + 1, $gamePlayer.y + 1);
        }
        
    }

    updateTouch(){
        if (this.hitTest(
            this.spRightPad.x - this.spRightPad.width / 2, 
            this.spRightPad.y - this.spRightPad.height / 2,
            this.spRightPad.width,
            this.spRightPad.height
            )){
            this.spRightPad.opacity = 255
        } else {
            this.spRightPad.opacity = 128
        }

        if (this.hitTest(
            this.spLeftPad.x - this.spLeftPad.width / 2, 
            this.spLeftPad.y - this.spLeftPad.height / 2,
            this.spLeftPad.width,
            this.spLeftPad.height
            )){
            this.spLeftPad.opacity = 255
        } else {
            this.spLeftPad.opacity = 128
        }

        if (this.hitTest(
            this.spDownPad.x - this.spDownPad.height / 2, 
            this.spDownPad.y - this.spDownPad.width / 2,
            this.spDownPad.height,
            this.spDownPad.width
            )){
            this.spDownPad.opacity = 255
        } else {
            this.spDownPad.opacity = 128
        }

        if (this.hitTest(
            this.spUpPad.x - this.spUpPad.height / 2, 
            this.spUpPad.y - this.spUpPad.width / 2,
            this.spUpPad.height,
            this.spUpPad.width
            )){
            this.spUpPad.opacity = 255
        } else {
            this.spUpPad.opacity = 128
        }

        if (this.hitTest(
            this.centerX() + this.bitmapHeight() / 2,
            Config.height - this.bottomMargin() - this.bitmapWidth() * 2 - this.bitmapHeight(),
            this.bitmapWidth(),
            this.bitmapWidth()
            )){
            this.spRightTopPad.opacity = 255
        } else {
            this.spRightTopPad.opacity = 128
        }

        if (this.hitTest(
            this.centerX() - this.bitmapHeight() / 2 - this.bitmapWidth(),
            Config.height - this.bottomMargin() - this.bitmapWidth() * 2 - this.bitmapHeight(),
            this.bitmapWidth(),
            this.bitmapWidth()
            )){
            this.spLeftTopPad.opacity = 255
        } else {
            this.spLeftTopPad.opacity = 128
        }

        if (this.hitTest(
            this.centerX() - this.bitmapHeight() / 2 - this.bitmapWidth(),
            Config.height - this.bottomMargin() - this.bitmapWidth(),
            this.bitmapWidth(),
            this.bitmapWidth()
            )){
            this.spLeftBottomPad.opacity = 255
        } else {
            this.spLeftBottomPad.opacity = 128
        }

        if (this.hitTest(
            this.centerX() + this.bitmapHeight() / 2,
            Config.height - this.bottomMargin() - this.bitmapWidth(),
            this.bitmapWidth(),
            this.bitmapWidth()
            )){
            this.spRightBottomPad.opacity = 255
        } else {
            this.spRightBottomPad.opacity = 128
        }

    }
}