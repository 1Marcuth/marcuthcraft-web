import { ResourceItem } from "gamx/dist/util/resource-loader"
import WidgetManager from "gamx/dist/ui/widget-manager"
import { ui } from "gamx"

import SplashMessageManager from "../../helpers/splash-message-manager.helper"
import MainMenuSecondLayer from "../components/main-menu/second-layer"
import MainMenuFirstLayer from "../components/main-menu/first-layer"
import MainMenuThridLayer from "../components/main-menu/thrid-layer"
import MainMenuLogoTitle from "../components/main-menu/logo-title"
import SplashMessage from "../components/main-menu/splash-message"
import MainMenuButton from "../components/main-menu/button"
import { MarcuthCraftState } from "../../marcuthcraft"

type SetupProps = {
    widgetManager: WidgetManager
    canvasWidth: number
    widgetsResource: ResourceItem
    splashMessageManager: SplashMessageManager
    goToCreateWorldSubScreen: () => void
}

class MainMenuSubScreen extends ui.SubScreen<MarcuthCraftState, SetupProps> {
    public setup(setupProps: SetupProps): void {
        setupProps.splashMessageManager.start()

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

        const singlePlayerButton = new MainMenuButton({
            widgetManager: setupProps.widgetManager,
            id: "mainMenuSingleplayerButton",
            text: "Singleplayer",
            buttonObservers: [
                (event, ...args) => {
                    if (event === "click") {
                        setupProps.goToCreateWorldSubScreen()
                    }
                }
            ],
            coordinates: {
                x: (setupProps.canvasWidth - MainMenuButton.buttonSize.width) / 2,
                y: 329
            },
            image: buttonWidgetImage,
            imageMouseOver: buttonWidgetImage,
        })

        const splashMessage = new SplashMessage({ splashMessageManager: setupProps.splashMessageManager })

        this.components.push(
            firstLayer,
            secondLayer,
            thridLayer,
            logoTitle,
            singlePlayerButton,
            splashMessage
        )
    }
}

export default MainMenuSubScreen