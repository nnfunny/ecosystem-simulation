import * as THREE from "three";
import Stats from "./libs/jsm/libs/stats.module.js";

import Ground from "./components/Ground.js";
import Light from "./scene/light/Light.js";
import { OrbitControls } from "./libs/jsm/controls/OrbitControls.js";
import { MD2CharacterComplex } from "./libs/jsm/misc/MD2CharacterComplex.js";
import { Gyroscope } from "./libs/jsm/misc/Gyroscope.js";
import GrassImage from "./textures/ground/grasslight-big.png";

// Global variables
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let container, stats;
let camera, scene, renderer;
let cameraControls;
let controls = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
};

let clock = new THREE.Clock();

// Run
init();
animate();

function init() {
  container = document.body;

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    1,
    4000
  );
  camera.position.set(0, 150, 1300);

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.fog = new THREE.Fog(0xffffff, 1000, 4000);

  scene.add(camera);

  // Lights
  scene.add(new THREE.AmbientLight(0x222222));
  let lightObject = new Light(200, 450, 500, 0xffffff, 2.0);
  let light = lightObject.create();
  scene.add(light);

  // Ground
  let groundObject = new Ground(1600, 64, GrassImage);
  let ground = groundObject.create();
  scene.add(ground);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container.appendChild(renderer.domElement);

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Stats
  stats = new Stats();
  container.appendChild(stats.dom);

  // EVENTS
  window.addEventListener("resize", onWindowResize, false);

  // Controls
  cameraControls = new OrbitControls(camera, renderer.domElement);
  cameraControls.target.set(0, 150, 0);
  cameraControls.enableKeys = false;
  cameraControls.update();
}

// EVENT HANDLERS
function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  renderer.render(scene, camera);
}
