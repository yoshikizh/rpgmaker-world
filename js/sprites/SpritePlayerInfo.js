class SpritePlayerInfo extends Sprite {
    constructor(){
        super()
        this.bitmap = new Bitmap(Config.width, 320)
        this.player = $gameParty.members()[0]
        this.refresh()
    }

    refresh(){
        this.bitmap.clear()
        this.drawAvatar()
        this.drawName()
        this.drawLevel()
    }

    drawAvatar(){
        const faceName = this.player.faceName()
        const faceIndex = this.player.faceIndex()
        const bitmapAvatar = ImageManager.loadFace(faceName)

        bitmapAvatar._onLoadCallback = () => {
            const sx = (faceIndex % 4) * 144
            const sy = (faceIndex / 4) * 144
            this.bitmap.blt(bitmapAvatar, sx, sy, 144, 144, 0, 0, 64, 64)
        }
    }

    drawName(){
        this.bitmap.drawText(this.player.name(), 80, 8, 128, 24)
    }

    drawLevel(){
        const hp = this.player.hp
        const mhp = this.player.mhp
        this.bitmap.drawText(`${hp} / ${mhp}`, 80, 40, 128, 24)
    }

}