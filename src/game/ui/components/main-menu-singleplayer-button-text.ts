import { ui } from "gamx"

class MainMenuSingleplayerButtonText extends ui.Component {
    public draw(ctx: CanvasRenderingContext2D & { [key: string]: any }): void {
        const buttonWidth = 545
        const buttonHeight = Math.round(buttonWidth / 10)
        const buttonY = 329

        const textX = ctx.canvas.width / 2
        const textY = buttonY + (buttonHeight / 2) + 7

        const text = "Singleplayer"

        ctx.font = `${buttonHeight / 2}px Minecraft`
        ctx.letterSpacing = "2px"
        ctx.textAlign = "center"

        ctx.fillStyle = "#000"

        ctx.fillText(
            text,
            textX + 2,
            textY + 2
        )

        ctx.fillStyle = "#F4F2F4"

        ctx.fillText(
            text,
            textX,
            textY
        )
    }
}

export default MainMenuSingleplayerButtonText