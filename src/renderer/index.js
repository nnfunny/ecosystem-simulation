import * as THREE from "three";
import CONSTANTS from "../utils/contants";

export function setUpRenderer(globalVar) {
  globalVar.renderer = new THREE.WebGLRenderer({ antialias: true });
  globalVar.renderer.setPixelRatio(window.devicePixelRatio);
  globalVar.renderer.setSize(CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);
  globalVar.container.appendChild(globalVar.renderer.domElement);

  globalVar.renderer.outputEncoding = THREE.sRGBEncoding;
  globalVar.renderer.shadowMap.enabled = true;
  globalVar.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}
