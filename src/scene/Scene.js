import * as THREE from "three";
import CONSTANTS from "../utils/contants";

export default function setUpScene(globalVar) {
  globalVar.scene = new THREE.Scene();
  globalVar.scene.background = new THREE.Color(CONSTANTS.BACKGROUND_COLOR);
  globalVar.scene.fog = new THREE.Fog(CONSTANTS.SUNSHINE_COLOR, 1000, 4000);
  globalVar.scene.add(globalVar.camera);
}
