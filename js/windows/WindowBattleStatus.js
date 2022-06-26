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
        this.spHpMpBack = new Sprite()
        
        this.addChild(this.spFace)
        this.addChild(this.spNameBack)
        this.addChild(this.spName)
        this.addChild(this.spParams)
        this.addChild(this.spHpMpBack)
        this.addChild(this.spHp)
        this.addChild(this.spMp)
    }

    _windowPadding(){
        return 8
    }

    paramsBitmapWidth(){
        return parseInt((this.width - this.height - this._windowPadding() * 4) / 2)
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
        const bitmapNameBack = ImageManager.loadSystem("UI/barback01")
        bitmapNameBack.addLoadListener(() => {
            this.spNameBack.x = this.height + this._windowPadding() * 2
            this.spNameBack.y = this._windowPadding() * 2

            const width = bitmapNameBack.width
            const height = bitmapNameBack.height
            const scale = this.paramsBitmapWidth() / width

            // const spNameBackBitmapWidth = parseInt(width * scale)
            const spNameBackBitmapHeight = parseInt(height * scale)
            this.spNameBack.bitmap = new Bitmap(this.paramsBitmapWidth(), spNameBackBitmapHeight)
            this.spNameBack.bitmap.blt(bitmapNameBack, 0, 0, width, height, 0, 0, this.spNameBack.bitmap.width, this.spNameBack.bitmap.height)
            this.drawName()
            this.drawParams()
            this.drapHpMpBar()
            this.drawHp()
            this.drawMp()
        })
    }

    paramsRows(){
        return 5
    }

    drapHpMpBar(){
        const bitmapHpMpBack = ImageManager.loadSystem("UI/barback02")
        bitmapHpMpBack.addLoadListener(() => {
            this.spHpMpBack.x = this.height + this.paramsBitmapWidth() + this._windowPadding() * 3
            this.spHpMpBack.y = this._windowPadding() * 2

            const width = bitmapHpMpBack.width
            const height = bitmapHpMpBack.height
            const scale = this.paramsBitmapWidth() / width

            const spHpMpBackBitmapHeight = parseInt(height * scale)

            this.spHpMpBack.bitmap = new Bitmap(this.paramsBitmapWidth(), spHpMpBackBitmapHeight)
            this.spHpMpBack.bitmap.blt(bitmapHpMpBack, 0, 0, width, height, 0, 0, this.spHpMpBack.bitmap.width, this.spHpMpBack.bitmap.height)
        })

    }

    drawHp(){
        this.spHp.x = this.height + this.paramsBitmapWidth() + this._windowPadding() * 3
        this.spHp.y = this._windowPadding() * 2
        this.spHp.bitmap = new Bitmap(this.paramsBitmapWidth() / 2, this.spNameBack.bitmap.height)
        this.spHp.bitmap.drawText("HP " + this.battler.hp + "/" + this.battler.mhp, 0, 0, this.spHp.bitmap.width, this.spHp.bitmap.height)
    }

    drawMp(){
        this.spMp.x = this.height + this.paramsBitmapWidth() + this._windowPadding() * 3 + this.paramsBitmapWidth() / 2
        this.spMp.y = this._windowPadding() * 2
        this.spMp.bitmap = new Bitmap(this.paramsBitmapWidth() / 2, this.spNameBack.bitmap.height)
        this.spMp.bitmap.drawText("MP " + this.battler.mp + "/" + this.battler.mmp, 0, 0, this.spMp.bitmap.width, this.spMp.bitmap.height)
    }

    drawName(){
        const width = this.spNameBack.bitmap.width
        const height = this.spNameBack.bitmap.height
        this.spName.x = this.height + this._windowPadding() * 2
        this.spName.y = this._windowPadding() * 2
        this.spName.bitmap = new Bitmap(width, height)
        this.spName.bitmap.textColor = "#ffffff"
        const battlerName = this.battler.name()
        const className = ` - ${this.battler.currentClass().name}`
        const nameWidth = this.spName.bitmap.measureTextWidth(battlerName)
        const classWidth = this.spName.bitmap.measureTextWidth(className)
        const totalStringWidth = nameWidth + classWidth
        this.spName.bitmap.drawText(battlerName, width / 2 - totalStringWidth / 2, 0, width, height)
        this.spName.bitmap.textColor = "#eed667"
        this.spName.bitmap.drawText(className, width / 2 - totalStringWidth / 2 + nameWidth, 0, width, height)
    }

    drawParams(){
        const width = this.spNameBack.bitmap.width
        const height = this.height - this._windowPadding() * 2 - this.spNameBack.bitmap.height
        const x = this.height + this._windowPadding() * 2
        const y = this._windowPadding() * 2 + this.spNameBack.bitmap.height + this._windowPadding()
        this.spParams.x = x
        this.spParams.y = y
        this.spParams.bitmap = new Bitmap(width, height)

        const bitmapIcon = ImageManager.loadSystem("IconSet")
        bitmapIcon.addLoadListener(() => {
            this.drawParamsCore("攻击", this.battler.atk+1223, 1990, 0, bitmapIcon, 0, 6)
            this.drawParamsCore("防御", this.battler.def, 688, 1, bitmapIcon, 0, 8)
            this.drawParamsCore("魔攻", this.battler.mat+666, 702, 2, bitmapIcon, 8, 18)
            this.drawParamsCore("幸运", this.battler.luk, 466, 3, bitmapIcon, 10, 11)
            this.drawParamsCore("魔防", this.battler.mdf, 466, 4, bitmapIcon, 5, 8)
        })
    }

    drawParamsCore(paramName, paramValue, paramValuePlus, index, bitmapIcon, bitmapIconIndexX, bitmapIconIndexY){
        const iconWidth = parseInt((this.height - this.spNameBack.bitmap.height - this._windowPadding() * 6) / this.paramsRows())
        const x = 0
        const y = (iconWidth + (this.spParams.height - this._windowPadding() * 2 - iconWidth * this.paramsRows()) / this.paramsRows() ) * index
        this.spParams.bitmap.blt(bitmapIcon, bitmapIconIndexX * 32, bitmapIconIndexY*32,32,32, x, y, iconWidth, iconWidth)
        this.spParams.bitmap.fontSize = parseInt(iconWidth * 0.6)
        this.spParams.bitmap.textColor = "#dbb229"
        const paramNameWidth = this.spParams.bitmap.measureTextWidth(paramName)
        this.spParams.bitmap.drawText(paramName,iconWidth + this._windowPadding() , y, paramNameWidth, iconWidth)
        this.spParams.bitmap.textColor = "#ffffff"
        const paramValueWidth = this.spParams.bitmap.measureTextWidth(paramValue)
        this.spParams.bitmap.drawText(paramValue, iconWidth + this._windowPadding() + paramNameWidth + this._windowPadding() , y, paramValueWidth, iconWidth)
        this.spParams.bitmap.textColor = "#69e223"
        const paramValuePlusWidth = this.spParams.bitmap.measureTextWidth(`+${paramValuePlus}`)
        this.spParams.bitmap.drawText(`+${paramValuePlus}`, iconWidth + this._windowPadding() + paramNameWidth + this._windowPadding() + paramValueWidth + this._windowPadding(), y, paramValuePlusWidth, iconWidth)
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


        // bitmapAvatar._onLoadCallback = () => {
        //     const sx = (faceIndex % 4) * 144
        //     const sy = (faceIndex / 4) * 144
        //     this.spFace.bitmap.blt(bitmapAvatar, sx, sy, 144, 144, 0, 0, this.height, this.height)
        // }
    }


    // drawBattlerFace(faceName, faceIndex, x, y, width, height) {
    //     width = width || ImageManager.faceWidth;
    //     height = height || ImageManager.faceHeight;
    //     const bitmap = ImageManager.loadFace(faceName);
    //     bitmap.addLoadListener(()=>{
    //         const pw = ImageManager.faceWidth;
    //         const ph = ImageManager.faceHeight;
    //         const sw = Math.min(width, pw);
    //         const sh = Math.min(height, ph);
    //         const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    //         const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    //         const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    //         const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    //         this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    //     })
    // };

}