import Arrowhero from "./Arrowhero";
import GroundMonkController from "./GroundMonkController";
import Metalhero from "./Metalhero";
import PlayerController from "./PlayerController";
import Windhero from "./Windhero";

export function resolvePlayerController(node: cc.Node | null): PlayerController | null {
    if (!node) {
        return null;
    }

    return (
        node.getComponent(PlayerController)
        || node.getComponent(Windhero)
        || node.getComponent(Arrowhero)
        || node.getComponent(Metalhero)
        || node.getComponent(GroundMonkController)
    );
}
