import { Ground } from "../../components";
import CONSTANTS from "../../utils/contants";
import GrassImage from "../../textures/ground/grasslight-big.png";

export default function loadGround(globalVar) {
  let groundObject = new Ground(
    CONSTANTS.SIZE_GROUND,
    CONSTANTS.REAPEAT,
    GrassImage
  );
  let ground = groundObject.create();
  globalVar.scene.add(ground);
}
