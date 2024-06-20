import { ModifierKeys } from "gamx/dist/util/keyboard-listener"
import { ResourceItem } from "gamx/dist/util/resource-loader"
import MarcuthCraftCore from "marcuthcraft-core"
import Gamx from "gamx"

import defaultResources from "./defaults/resources.default"
import MainMenuSubScreen from "./ui/sub-screens/main-menu"
import configHelper from "../helpers/config.helper"
import IntroSubScreen from "./ui/sub-screens/intro"

export type MarcuthCraftOptions = {
    document: Document
    rootQuery: string
}

export type MarcuthCraftState = {
    mainResources: ResourceItem[]
    logoIntroResource?: ResourceItem
    secondBackgorundLayerOffsetX: number
    [key: string]: any
}

class MarcuthCraftGame extends Gamx<MarcuthCraftState> {
    public core: MarcuthCraftCore

    public constructor({ document, rootQuery }: MarcuthCraftOptions) {
        super({
            document: document,
            rootQuery: rootQuery,
            screenSize: configHelper.gameUi.screenSize,
            defaultBackgroundColor: configHelper.gameUi.defaultBackgroundColor,
            state: configHelper.gameUi.defaultState
        })

        this.core = MarcuthCraftCore.createDefault()
    }

    protected handleKeyboardListener(keyPressed: string, modifierKeys: ModifierKeys): void {
        console.log(keyPressed, modifierKeys)
    }

    protected handleResourceLoader(event: string, ...args: any[]): void {
        const ctx = this.screen.canvas.getContext("2d")!

        switch (event) {
            case "loadedResource": {
                const [ resource, _, queueSize, queueLoadedCount ] = args as [ResourceItem, string, number, number]

                if (resource.id === "logoIntro") {
                    this.state.logoIntroResource = resource
                }

                const introSubScreen = new IntroSubScreen({
                    ctx: ctx,
                    gameState: this.state,
                    components: [],
                    setupProps: {
                        logoIntroResource: this.state.logoIntroResource!,
                        amountOfResources: queueSize,
                        resourcesLoadedCount: queueLoadedCount,
                        currentResource: resource
                    }
                })
        
                this.renderer.setSubScreen(introSubScreen)

                break
            } case "loadedResourceQueue": {
                const [ queueId, resources ] = args as [string, ResourceItem[]]
                const widgetsResource = resources.find(resource => resource.id === "widgets")!

                if (queueId === "defaultResources") {
                    this.updateState({ mainResources: resources })

                    this.renderer.pause()

                    setTimeout(() => {
                        const mainMenuSubScreen = new MainMenuSubScreen({
                            ctx: ctx,
                            components: [],
                            gameState: this.state,
                            setupProps: {
                                widgetManager: this.screen.widgetManager,
                                canvasWidth: this.screen.size.width,
                                widgetsResource: widgetsResource
                            }
                        })
    
                        this.renderer.setSubScreen(mainMenuSubScreen)

                        this.renderer.play()
                    }, 1000)
                }

                break
            }
            
            default:
                throw new Error(`An unexpected event was passed to the resource load event handler: [${event}]`)
        }
    }

    protected handleRenderer(event: string, ...args: any[]): void {
        switch (event) {
            case "frame":
                if (this.renderer.subScreen instanceof MainMenuSubScreen) {
                    this.state.secondBackgorundLayerOffsetX -= .5
                }

                break

            default:
                throw new Error(`An unexpected event was passed to the renderer event handler: [${event}]`)
        }
    }

    protected handleScreen(event: string, ...args: any[]): void {
        switch (event) {
            case "createdCanvas":
                console.log("The game canvas has been created!")
                break

            default:
                throw new Error(`An unexpected event was passed to the screen event handler: [${event}]`)
        }
    }

    protected handleWidgetManager(event: string, ...args: any[]): void {
        switch (event) {
            case "widgetAdded":
                break

            case "widgetRemoved":
                break

            case "allWidgetsRemoved":
                break

            default:
                throw new Error(`An unexpected event was passed to the widget manager handler: [${event}]`)
        }
    }

    protected handleAudioMaganer(event: string, ...args: any[]): void {}

    public setup(): void {
        this.keyboardListener.subscribe(this.handleKeyboardListener.bind(this))
        this.resourceLoader.subscribe(this.handleResourceLoader.bind(this))
        this.renderer.subscribe(this.handleRenderer.bind(this))
        this.screen.subscribe(this.handleScreen.bind(this))
        this.screen.widgetManager.subscribe(this.handleWidgetManager.bind(this))
        console.time("Loaded main resources in")
        this.resourceLoader.addToQueue("defaultResources", defaultResources)
    }
}

export default MarcuthCraftGame