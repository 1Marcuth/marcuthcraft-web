import { ui } from "gamx"

import SplashMessageManager from "../../../helpers/splash-message-manager.helper"

type Props = {
    splashMessageManager: SplashMessageManager
}

class SplashMessage extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D & { [key: string]: any }): void {
        const splashMessage = this.props.splashMessageManager.getCurrentMessage()
            const x = 1000
            const y = 160
        
            const animationDuration = 750
            const minFontSize = 22
            const maxFontSize = 3
            const rotationAngle = -17 * (Math.PI / 180)
            const currentTime = Date.now()
        
            const elapsed = (currentTime % animationDuration) / animationDuration
            const fontSize = minFontSize + Math.abs(Math.sin(elapsed * Math.PI)) * maxFontSize
        
            ctx.save()
        
            ctx.translate(x, y)
            ctx.rotate(rotationAngle)
        
            ctx.font = `${fontSize}px Minecraft`
            ctx.letterSpacing = "3px"
            ctx.textAlign = "center"
            ctx.fillStyle = "#000"
        
            ctx.fillText(
                splashMessage,
                0 + 2,
                0 + 2
            )
        
            ctx.fillStyle = "#ff0"
        
            ctx.fillText(
                splashMessage,
                0,
                0
            )
        
            ctx.restore()
    }
}

export default SplashMessage