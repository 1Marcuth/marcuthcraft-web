import { FC, useEffect } from "react"

import MarcuthCraftGame from "../../game/marcuthcraft"

const GameScreen: FC = () => {
    useEffect(() => {
        const game = new MarcuthCraftGame({
            document: document,
            rootQuery: ".game-screen"
        })

        game.renderer.play()

        return () => {
            game.destroy()
        }
    }, []) 

    return (
        <div className="game-screen"></div>
    )
}

export default GameScreen