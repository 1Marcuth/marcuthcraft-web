import { ui } from "gamx"

class CreditsDialog extends ui.Component {
    public draw(ctx: CanvasRenderingContext2D): void {
        const width = ctx.canvas.width / 2
        const height = ctx.canvas.height - 20
     
        const x = (ctx.canvas.width - width) / 2
        const y = (ctx.canvas.height - height) / 2

        ctx.fillStyle = "#00000005" 

        ctx.fillRect(
            x,
            y,
            width,
            height
        )
    }
}

export default CreditsDialog