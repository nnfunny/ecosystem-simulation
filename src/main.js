import * as THREE from "three";
import { GLTFLoader } from "./libs/jsm/loaders/GLTFLoader";
import { PointerLockControls } from "./libs/jsm/controls/PointerLockControls.js";
import {
  Global,
  detectCollision,
  updateVelocity,
  updatePosition,
  keepOnGround,
  keepInsideWorld,
  activatePointerBlock,
} from "./utils";
import { onKeyDown, onKeyUp, onWindowResize } from "./utils/events";
import { setUpRenderer } from "./renderer";
import {
  loadGround,
  loadMountains,
  loadTree,
  loadVisitor,
  loadSun,
  loadClouds,
} from "./scene/objectLoader";
import Stats from "./libs/jsm/libs/stats.module.js";
import setUpCamera from "./scene/Camera";
import setUpLight from "./scene/light";
import setUpScene from "./scene/Scene";
import loadAnimals from "./scene/objectLoader/loadAnimals";
import { updateAnimalPosition } from "./utils/animal";

// Run
let stats;
let clock = new THREE.Clock();
let globalVar = new Global();
// Loader
let loader = new GLTFLoader();
// Raycaster for onObject
globalVar.onObjectRay = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  10
);

init();
animate();

function init() {
  globalVar.container = document.body;
  let esc = document.getElementById("esc");
  esc.style.display = "none";

  // Primary setup
  setUpCamera(globalVar);
  setUpScene(globalVar);
  setUpLight(globalVar);

  // Load 3D objects
  loadGround(globalVar);
  loadTree(globalVar);
  loadVisitor(globalVar);
  loadMountains(globalVar, loader);
  loadSun(globalVar, loader);
  loadClouds(globalVar, loader);
  loadAnimals(globalVar, loader);

  // Renderer
  setUpRenderer(globalVar);

  // EVENTS
  onWindowResize(globalVar);
  onKeyDown(globalVar);
  onKeyUp(globalVar);

  // controls
  globalVar.controls = new PointerLockControls(
    globalVar.camera,
    globalVar.renderer.domElement
  );
  activatePointerBlock(globalVar);

  // Stats
  stats = new Stats();
  globalVar.container.appendChild(stats.dom);

  // Axes
  // var axesHelper = new THREE.AxesHelper(2000);
  // globalVar.scene.add(axesHelper);
}

// Animate
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}
function render() {
  if (globalVar.controls.isLocked === true) {
    let delta = clock.getDelta();

    // Animals Update
    updateAnimalPosition(globalVar, delta);

    // Visitor Update
    updateVelocity(globalVar, delta);
    detectCollision(globalVar);
    keepInsideWorld(globalVar);
    updatePosition(globalVar, delta);
    keepOnGround(globalVar);
  }
  globalVar.renderer.render(globalVar.scene, globalVar.camera);
}
