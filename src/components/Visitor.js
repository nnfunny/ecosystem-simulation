import * as THREE from "three";

class Visitor {
  constructor(color, height, width, depth) {
    this.height = height;
    this.width = width;
    this.depth = depth;
    this.color = color;
    this._visitor = null;
  }
  create() {
    var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    var material = new THREE.MeshBasicMaterial({ color: this.color });
    var visitor = new THREE.Mesh(geometry, material);

    this._visitor = visitor;
    return visitor;
  }
}

export default Visitor;
