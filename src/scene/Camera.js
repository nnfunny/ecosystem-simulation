import * as THREE from "three";
import CONSTANTS from "../utils/contants";

export default function setUpCamera(globalVar) {
  globalVar.camera = new THREE.PerspectiveCamera(
    45,
    CONSTANTS.SCREEN_WIDTH / CONSTANTS.SCREEN_HEIGHT,
    1,
    CONSTANTS.SIZE_GROUND
  );
  globalVar.camera.position.set(
    CONSTANTS.INITAL_POSITION.x,
    CONSTANTS.INITAL_POSITION.y,
    CONSTANTS.INITAL_POSITION.z
  );
}
