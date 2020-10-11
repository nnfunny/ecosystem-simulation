import CONSTANTS from "../../utils/contants";
import * as THREE from "three";
import Light from "./Light.js";

export default function setUpLight(globalVar) {
  globalVar.scene.add(new THREE.AmbientLight(CONSTANTS.SUNSHINE_COLOR));
  let lightObject = new Light(200, 450, 500, CONSTANTS.SUNSHINE_COLOR, 1.5);
  let light = lightObject.create();
  globalVar.scene.add(light);
}
