import * as THREE from "three";

export default function Global() {
  this.camera = null;
  this.scene = null;
  this.renderer = null;
  this.controls = null;
  this.collidableMeshList = [];
  this.onObjectRay = false;
  this.move = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    canJump: false,
  };
  this.velocity = new THREE.Vector3();
  this.direction = new THREE.Vector3();
  this.visitor = null;
  this.container = null;
  this.prevPosition = null;
}
