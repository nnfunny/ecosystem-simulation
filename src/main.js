import * as THREE from "three";
import Tree from "./components/Tree.js";

// Global Variable: Scene, camera and renderer
let scene, camera, renderer;
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
}
init();

// Tree
let tree = Tree();
tree.rotation.x = 0.5;
tree.rotation.y = 1;
scene.add(tree);
tree.scale.set(0.5, 0.5, 0.5);

// Light
let lightOne = new THREE.DirectionalLight(0xeeffd3, 1);
let lightTwo = new THREE.DirectionalLight(0xff0000, 0.4);
let lightThree = new THREE.DirectionalLight(0xffffff, 0.2);

lightOne.position.set(0, 0, 1);
lightTwo.position.set(1, 0, 1);
lightThree.position.set(0, 1, 0);
scene.add(lightOne);
scene.add(lightTwo);
scene.add(lightThree);

function animate() {
  requestAnimationFrame(animate);
  tree.rotation.y += 0.007;
  renderer.render(scene, camera);
}
animate();
