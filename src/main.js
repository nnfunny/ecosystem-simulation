import * as THREE from "three";
import Stats from "./libs/jsm/libs/stats.module.js";
import { Ground, Trees } from "./components";
import CONSTANTS from "./utils/contants.js";
import Light from "./scene/light/Light.js";
import { PointerLockControls } from "./libs/jsm/controls/PointerLockControls.js";
import GrassImage from "./textures/ground/grasslight-big.png";
import Visitor from "./components/Visitor.js";
import { getDistance } from "./utils/index.js";

// Global variables
let container, stats, visitor;
let camera, scene, renderer, controls;

// Controls
let objects = [];
let raycaster;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();

// Clock
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
    objects.push(tree);
  });

  // Visitor
  let visitorObj = new Visitor(CONSTANTS.VISITOR.color, 20, 20, 20);
  visitor = visitorObj.create();
  visitor.position.set(10, 5, 10);
  scene.add(visitor);
  objects.push(visitor);

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
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

  // Raycaster for onObject
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  // controls
  controls = new PointerLockControls(camera, renderer.domElement);
  window.addEventListener(
    "click",
    function () {
      controls.lock();
    },
    false
  );

  // Stats
  stats = new Stats();
  container.appendChild(stats.dom);

  // Axes
  var axesHelper = new THREE.AxesHelper(2000);
  scene.add(axesHelper);
}

// EVENT HANDLERS
function onKeyDown(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;

    case 37: // left
    case 65: // a
      moveLeft = true;
      break;

    case 40: // down
    case 83: // s
      moveBackward = true;
      break;

    case 39: // right
    case 68: // d
      moveRight = true;
      break;

    case 32: // space
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break;
  }
}

function onKeyUp(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;

    case 37: // left
    case 65: // a
      moveLeft = false;
      break;

    case 40: // down
    case 83: // s
      moveBackward = false;
      break;

    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
}

function onWindowResize() {
  renderer.setSize(CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);

  camera.aspect = CONSTANTS.SCREEN_WIDTH / CONSTANTS.SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}

// Animate
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}
function render() {
  if (controls.isLocked === true) {
    // Raycaster for jumping
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;
    let intersections = raycaster.intersectObjects(objects);
    let onObject = intersections.length > 0;

    // Get time change
    let delta = clock.getDelta();

    // Update new velocity
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * CONSTANTS.VISITOR.mass * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    // Jumping
    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    // Collision with other objects
    for (let i = 0; i < objects.length; i++) {
      let objA = controls.getObject();
      let objB = objects[i];
      let distance = getDistance(objA, objB);
      // Create a box to get sizes
      let box = new THREE.Box3().setFromObject(objB);
      let vector = new THREE.Vector3();
      let width1 = box.getSize(vector).x;
      let width2 = box.getSize(vector).z;
      let height = Math.abs(box.getSize(vector).y / 2 - objB.position.y);
      let actualDistance = Math.sqrt(distance * distance - height * height);

      if (i < CONSTANTS.N_TREE) {
        if (
          actualDistance <= width1 / 2 - 20 ||
          actualDistance < width2 / 2 - 20 ||
          actualDistance === NaN
        ) {
          velocity.x = Math.max(0, velocity.x);
          velocity.z = Math.max(0, velocity.z);
        }
      } else {
        if (
          actualDistance <= width1 / 2 + 5 ||
          actualDistance < width2 / 2 + 5 ||
          actualDistance === NaN
        ) {
          velocity.x = Math.max(0, velocity.x);
          velocity.z = Math.max(0, velocity.z);
        }
      }
    }

    // Update new position
    controls.moveRight(-velocity.x * delta * CONSTANTS.VISITOR.movementSpeed);
    controls.moveForward(-velocity.z * delta * CONSTANTS.VISITOR.movementSpeed);
    controls.getObject().position.y += velocity.y * delta; // new behavior

    // Keep the visitor on the ground
    if (controls.getObject().position.y < CONSTANTS.INITAL_POSITION.y) {
      velocity.y = 0;
      controls.getObject().position.y = CONSTANTS.INITAL_POSITION.y;

      canJump = true;
    }
  }
  renderer.render(scene, camera);
}
