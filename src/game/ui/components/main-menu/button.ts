import WidgetManager from "gamx/dist/ui/widget-manager"
import { Observer } from "gamx/dist/common/observable"
import { Coordinates } from "gamx/dist/common/types"
import Button from "gamx/dist/ui/button"
import { ui } from "gamx"

import MainMenuButtonText from "./button-text"

type Props = {
    id: string
    text: string
    image: HTMLImageElement
    imageMouseOver: HTMLImageElement
    coordinates: Coordinates
    buttonObservers: Observer[]
    widgetManager: WidgetManager
}

class MainMenuButton extends ui.Component<Props> {
    public static buttonSize = {
        width: 545,
        height: Math.round(545 / 10)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const buttonSize = MainMenuButton.buttonSize
        let button: Button | undefined

        const mainMenuSingleplayerButtonText = new MainMenuButtonText({
            text: this.props.text,
            buttonSize: buttonSize,
            buttonY: this.props.coordinates.y
        })
        
        button = this.props.widgetManager.get(this.props.id) as Button | undefined

        if (!button) {
            button = new ui.Button({
                ctx: ctx,
                coordinates: this.props.coordinates,
                width: buttonSize.width,
                height: buttonSize.height,
                image: this.props.image,
                imageClipping: {
                    x: 0,
                    y: 15,
                    height: 15,
                    width: 150
                },
                imageMouseOver: this.props.imageMouseOver,
                imageMouseOverClipping: {
                    x: 0,
                    y: 30,
                    height: 15,
                    width: 150
                }
            })

            button.id = this.props.id

            for (const observer of this.props.buttonObservers) {
                button.subscribe(observer)
            }

            this.props.widgetManager.add(button)
        }

        button.draw()
        mainMenuSingleplayerButtonText.draw(ctx)
    }
}

export default MainMenuButton