import { ResourceItem } from "gamx/dist/util/resource-loader"
import WidgetManager from "gamx/dist/ui/widget-manager"
import { ui } from "gamx"

import MainMenuSingleplayerButton from "../components/main-menu-singleplayer-button"
import MainMenuSecondLayer from "../components/main-menu-second-layer"
import MainMenuFirstLayer from "../components/main-menu-first-layer"
import MainMenuThridLayer from "../components/main-menu-thrid-layer"
import MainMenuLogoTitle from "../components/main-menu-logo-title"
import { MarcuthCraftState } from "../../marcuthcraft"

type SetupProps = {
    widgetManager: WidgetManager
    canvasWidth: number
    widgetsResource: ResourceItem
}

class MainMenuSubScreen extends ui.SubScreen<MarcuthCraftState, SetupProps> {
    public setup(setupProps: SetupProps): void {
        const secondBackgroundLayerResource = this.gameState.mainResources.find(resource => resource.id === "secondBackgroundLayer") as ResourceItem
        const backgroundBlurResource = this.gameState.mainResources.find(resource => resource.id === "backgroundBlur") as ResourceItem
        const logoTitleResource = this.gameState.mainResources.find(resource => resource.id === "logo") as ResourceItem

        const firstLayer = new MainMenuFirstLayer()

        const secondLayer = new MainMenuSecondLayer({
            image: secondBackgroundLayerResource.object as HTMLImageElement,
            gameState: this.gameState
        })

        const thridLayer = new MainMenuThridLayer({ image: backgroundBlurResource.object as HTMLImageElement })
        const logoTitle = new MainMenuLogoTitle({ image: logoTitleResource.object as HTMLImageElement })

        const buttonWidgetImage = setupProps.widgetsResource.object as HTMLImageElement

        const singlePlayerButton = new MainMenuSingleplayerButton({
            widgetManager: setupProps.widgetManager,
            buttonObservers: [
                (event, ...args) => {
                    if (event === "click") {
                        
                    }
                }
            ],
            coordinates: {
                x: (setupProps.canvasWidth - MainMenuSingleplayerButton.buttonSize.width) / 2,
                y: 329
            },
            image: buttonWidgetImage,
            imageMouseOver: buttonWidgetImage,
        })

        this.components.push(
            firstLayer,
            secondLayer,
            thridLayer,
            logoTitle,
            singlePlayerButton
        )
    }
}

export default MainMenuSubScreen