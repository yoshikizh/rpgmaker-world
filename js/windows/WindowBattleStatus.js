class WindowBattleStatus extends Window_Base {
    constructor(rect){
        super(rect)
        this.visible = false
        this.battler = null
        this.windowskin = ImageManager.loadSystem("Window03")
        this.spFace = new Sprite()
        this.spNameBack = new Sprite()
        this.spName = new Sprite()
        this.spParams = new Sprite()

        this.spHp = new Sprite()
        this.spMp = new Sprite()
        this.spClassBack = new Sprite()
        
        this.addChild(this.spFace)
        this.addChild(this.spNameBack)
        this.addChild(this.spName)
        this.addChild(this.spParams)
        this.addChild(this.spClassBack)
        this.addChild(this.spHp)
        this.addChild(this.spMp)
    }

    _windowPadding(){
        return 8
    }

    paramsBitmapWidth(){
        return parseInt((this.width - this.height) / 3)
    }

    refresh(battler){
        this.battler = battler
        this.contents.clear()
        this.visible = true

        // draw face
        this.drawAvatar()
        this.drawOthersAll()
    }

    drawOthersAll(){
        const bitmapNameBack = ImageManager.loadSystem("UI/statusBack")

        bitmapNameBack.addLoadListener(() => {

            this.spNameBack.x = 0 // this.height + this._windowPadding()
            this.spNameBack.y = this.height - this._windowPadding() - dp(50) // this._windowPadding() * 2

            const width = bitmapNameBack.width
            const height = bitmapNameBack.height
            // const scale = this.paramsBitmapWidth() / width

            // const spNameBackBitmapWidth = parseInt(width * scale)
            // const spNameBackBitmapHeight = parseInt(height * scale)
            this.spNameBack.bitmap = new Bitmap(this.height, dp(50))
            this.spNameBack.bitmap.blt(bitmapNameBack, 0, 0, width, height, 0, 0, this.spNameBack.bitmap.width, this.spNameBack.bitmap.height)
            this.spNameBack.opacity = 160
            this.drawName()
            this.drawParams()
            this.drawClassBar()
            this.drawHp()
            this.drawMp()
        })
    }

    paramsRows(){
        return 3
    }

    drawClassBar(){
        const bitmapHpMpBack = ImageManager.loadSystem("UI/barback02")
        bitmapHpMpBack.addLoadListener(() => {
            this.spClassBack.x = this.height - 16 //+ this.paramsBitmapWidth() + this._windowPadding() * 3
            this.spClassBack.y = this._windowPadding() * 1.5

            const width = bitmapHpMpBack.width
            const height = bitmapHpMpBack.height
            // const scale = this.paramsBitmapWidth() / width

            const spClassBackBitmapHeight = dp(30)

            this.spClassBack.bitmap = new Bitmap(dp(180), spClassBackBitmapHeight)

            
            this.spClassBack.bitmap.blt(bitmapHpMpBack, 0, 0, width, height, 0, 0, this.spClassBack.bitmap.width, this.spClassBack.bitmap.height)
            

            this.drawClass()
        })
    }

    drawClass(){
        const className = `${this.battler.currentClass().name}`
        this.spClassBack.bitmap.textColor = "#eed667"
        this.spClassBack.bitmap.fontSize = dp(24)
        this.spClassBack.bitmap.outlineColor = "rgba(0,0,0,0)"
        this.spClassBack.bitmap.drawText(className,0,0,this.spClassBack.bitmap.width,this.spClassBack.bitmap.height, "center", false)
    }
    drawHp(){
        const baseY = this._windowPadding() * 1.5 + dp(30) + 4
        this.spHp.x = this.height
        this.spHp.y = baseY
        this.spHp.bitmap = new Bitmap(this.width * 0.4, dp(30))
        this.spHp.bitmap.fontSize = dp(22)
        this.spHp.bitmap.textColor = "#ff0000"
        this.spHp.bitmap.outlineColor = "#ffffff"
        this.spHp.bitmap.outlineWidth = 2
        const hpWordWidth = this.spHp.bitmap.measureTextWidth("HP ")
        this.spHp.bitmap.drawText("HP ", 0, 0, hpWordWidth, this.spHp.bitmap.height, "left", true)
        this.spHp.bitmap.textColor = "#ffffff"
        this.spHp.bitmap.outlineColor = "#000000"
        this.spHp.bitmap.drawText(this.battler.hp + "/" + this.battler.mhp, hpWordWidth, 0, null, this.spHp.bitmap.height, "left", true)
    }

    drawMp(){
        const baseY = this._windowPadding() * 1.5 + dp(30) + 4
        this.spMp.x = this.height
        this.spMp.y = baseY + dp(30)
        this.spMp.bitmap = new Bitmap(this.width * 0.4, dp(30))
        this.spMp.bitmap.fontSize = dp(22)

        this.spMp.bitmap.textColor = "#0000ff"
        this.spMp.bitmap.outlineColor = "#ffffff"
        this.spMp.bitmap.outlineWidth = 2

        const mpWordWidth = this.spHp.bitmap.measureTextWidth("MP ")
        this.spMp.bitmap.drawText("MP ", 0, 0, mpWordWidth, this.spMp.bitmap.height, "left", true)
        this.spMp.bitmap.textColor = "#ffffff"
        this.spMp.bitmap.outlineColor = "#000000"
        this.spMp.bitmap.drawText(this.battler.mp + "/" + this.battler.mmp, mpWordWidth, 0, null, this.spMp.bitmap.height, "left", true)
    }

    drawName(){
        const width = this.spNameBack.bitmap.width
        const height = this.spNameBack.bitmap.height
        this.spName.x = 0
        this.spName.y = this.spNameBack.y
        this.spName.bitmap = new Bitmap(width, height)
        this.spName.bitmap.textColor = "#ffffff"
        this.spName.bitmap.fontSize = dp(30)
        const battlerName = this.battler.name()
        this.spName.bitmap.drawText(battlerName, 0, 0, width, height, "center", false)
    }

    drawParams(){
        const width = (this.width - this.height - this._windowPadding()) / 3 * 2 
        const x = this.width * 0.6
        const y = this._windowPadding() * 1.5
        this.spParams.x = x
        this.spParams.y = y
        this.spParams.bitmap = new Bitmap(width, this.height)

        this.spParams.bitmap.outlineWidth = 2

        const bitmapIcon = ImageManager.loadSystem("IconSet")
        bitmapIcon.addLoadListener(() => {
            this.drawParamsCore("攻击", this.battler.atk+1223, 1990, 0, 0, bitmapIcon, 0, 6)
            this.drawParamsCore("防御", this.battler.def, 688, 0, 1, bitmapIcon, 0, 8)
            this.drawParamsCore("魔攻", this.battler.mat+666, 702, 0, 2, bitmapIcon, 8, 18)
            this.drawParamsCore("幸运", this.battler.luk, 466, 0, 3, bitmapIcon, 10, 11)
            this.drawParamsCore("魔防", this.battler.mdf, 466, 0, 4, bitmapIcon, 5, 8)
        })
    }

    drawParamsCore(paramName, paramValue, paramValuePlus, x, index, bitmapIcon, bitmapIconIndexX, bitmapIconIndexY){
        const iconWidth = dp(30)
        const _x = x
        const y = (iconWidth + 2) * index
        this.spParams.bitmap.blt(bitmapIcon, bitmapIconIndexX * 32, bitmapIconIndexY*32,32,32, _x, y, iconWidth, iconWidth)

        this.spParams.bitmap.fontSize = dp(20)
        this.spParams.bitmap.textColor = "#dbb229"
        // this.spParams.bitmap.outlineColor = "rgba(0,0,0,0)"
        const paramNameWidth = this.spParams.bitmap.measureTextWidth(paramName)
        this.spParams.bitmap.drawText(paramName,_x + iconWidth + this._windowPadding() , y, paramNameWidth, iconWidth, "left", true)
        this.spParams.bitmap.textColor = "#ffffff"
        // this.spParams.bitmap.outlineColor = "rgba(0,0,0,1)"
        const paramValueWidth = this.spParams.bitmap.measureTextWidth(paramValue)
        this.spParams.bitmap.drawText(paramValue, _x + iconWidth + this._windowPadding() + paramNameWidth + this._windowPadding() , y, paramValueWidth, iconWidth, "left", true)
        this.spParams.bitmap.textColor = "#69e223"
        // this.spParams.bitmap.outlineColor = "rgba(0,0,0,0)"
        const paramValuePlusWidth = this.spParams.bitmap.measureTextWidth(`+${paramValuePlus}`)
        this.spParams.bitmap.drawText(`+${paramValuePlus}`, _x + iconWidth + this._windowPadding() + paramNameWidth + this._windowPadding() + paramValueWidth + this._windowPadding(), y, paramValuePlusWidth, iconWidth, "left", true)
    }


    drawAvatar(){
        const faceName = this.battler.faceName()
        const faceIndex = this.battler.faceIndex()
        const bitmapAvatar = ImageManager.loadFace(faceName)

        const sx = (faceIndex % 4) * 144
        const sy = (faceIndex / 4) * 144
        this.spFace.x = this._windowPadding()
        this.spFace.y = this._windowPadding()
        this.spFace.bitmap = bitmapAvatar
        this.spFace.setFrame(sx, sy, 144, 144)
        this.spFace.scale.x = (this.height-this._windowPadding()*2) / 144
        this.spFace.scale.y = (this.height-this._windowPadding()*2) / 144
    }
}