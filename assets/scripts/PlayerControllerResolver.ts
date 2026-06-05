import Arrowhero from "./Arrowhero";
import Firehero from "./Firehero";
import GroundMonkController from "./GroundMonkController";
import Metalhero from "./Metalhero";
import PlayerController from "./PlayerController";
import Windhero from "./Windhero";

export function resolvePlayerController(node: cc.Node | null): PlayerController | null {
    if (!node || !cc.isValid(node, true)) {
        return null;
    }

    const controller = (
        node.getComponent(PlayerController)
        || node.getComponent(Windhero)
        || node.getComponent(Arrowhero)
        || node.getComponent(Metalhero)
        || node.getComponent(Firehero)
        || node.getComponent(GroundMonkController)
    );

    return controller && cc.isValid(controller, true) ? controller : null;
}
