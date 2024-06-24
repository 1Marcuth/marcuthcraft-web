import { ui } from "gamx"

import { MarcuthCraftState } from "../../marcuthcraft"
import ScreenBackground from "../components/screen-background"

type SetupProps = {
    
}

class CreateWorldSubScreen extends ui.SubScreen<MarcuthCraftState, SetupProps> {
    protected setup(setupProps: SetupProps): void {
        const screenBackground = new ScreenBackground({ color: "#000" })

        this.components.push(screenBackground)
    }
}

export default CreateWorldSubScreen