import * as THREE from "three";
import Stats from "./libs/jsm/libs/stats.module.js";

import { Ground, Trees } from "./components";
import CONSTANTS from "./utils/contants.js";
import Light from "./scene/light/Light.js";
import { FirstPersonControls } from "./libs/jsm/controls/FirstPersonControls.js";
import GrassImage from "./textures/ground/grasslight-big.png";
import Visitor from "./components/Visitor.js";

// Global variables
let container, stats;
let camera, scene, renderer, controls;

let clock = new THREE.Clock();

// Run
init();
animate();

function init() {
  container = document.body;

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    CONSTANTS.SCREEN_WIDTH / CONSTANTS.SCREEN_HEIGHT,
    1,
    CONSTANTS.SIZE_GROUND
  );
  camera.position.set(
    CONSTANTS.INITAL_POSITION.x,
    CONSTANTS.INITAL_POSITION.y,
    CONSTANTS.INITAL_POSITION.z
  );

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(CONSTANTS.BACKGROUND_COLOR);
  scene.fog = new THREE.Fog(CONSTANTS.SUNSHINE_COLOR, 1000, 4000);

  scene.add(camera);

  // Lights
  scene.add(new THREE.AmbientLight(CONSTANTS.SUNSHINE_COLOR));
  let lightObject = new Light(200, 450, 500, CONSTANTS.SUNSHINE_COLOR, 1.5);
  let light = lightObject.create();
  scene.add(light);

  // Ground
  let groundObject = new Ground(
    CONSTANTS.SIZE_GROUND,
    CONSTANTS.REAPEAT,
    GrassImage
  );
  let ground = groundObject.create();
  scene.add(ground);

  // Trees
  let trees = Trees(CONSTANTS.N_TREE);
  trees.forEach((tree) => {
    tree.castShadow = true;
    scene.add(tree);
  });

  // Visitor
  let visitorObj = new Visitor(CONSTANTS.VISITOR.color, 10, 10, 10);
  let visitor = visitorObj.create();
  visitor.position.set(10, 5, 10);
  scene.add(visitor);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);
  container.appendChild(renderer.domElement);

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // EVENTS
  window.addEventListener("resize", onWindowResize, false);

  // controls
  controls = new FirstPersonControls(camera, renderer.domElement);

  controls.movementSpeed = 150;
  controls.lookSpeed = 0.05;
  controls.lookVertical = false;

  // Stats
  stats = new Stats();
  container.appendChild(stats.dom);

  // Axes
  var axesHelper = new THREE.AxesHelper(2000);
  scene.add(axesHelper);
}

// EVENT HANDLERS
function onWindowResize() {
  renderer.setSize(CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);

  camera.aspect = CONSTANTS.SCREEN_WIDTH / CONSTANTS.SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}
function render() {
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
}
