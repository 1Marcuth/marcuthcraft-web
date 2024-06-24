import { ui } from "gamx"

type ButtonSize = {
    width: number
    height: number
}

type Props = {
    text: string
    buttonSize: ButtonSize
    buttonY: number
}

class MainMenuSingleplayerButtonText extends ui.Component<Props> {
    public draw(ctx: CanvasRenderingContext2D & { [key: string]: any }): void {
        const buttonHeight = this.props.buttonSize.height
        const buttonY = this.props.buttonY
        const text = this.props.text

        const textX = ctx.canvas.width / 2
        const textY = buttonY + (buttonHeight / 2) + 7

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