import * as THREE from "three";
import CONSTANTS from "../utils/contants";

class TreeComponent {
  constructor(geometry, color, position, scale) {
    this.geometry = geometry;
    this.color = color;
    this.position = position;
    this.scale = scale;
  }

  create() {
    let material = new THREE.MeshLambertMaterial({ color: this.color });
    let component = new THREE.Mesh(this.geometry, material);
    component.position.set(
      this.position[0],
      this.position[1],
      this.position[2]
    );
    component.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    return component;
  }
}

export default function Tree() {
  let colors = {
    darkGreen: 0x91e56e,
    lightGreen: 0xa2ff7a,
    brown: 0x7d5a4f,
  };
  let geometry = new THREE.BoxGeometry(1, 1, 1);

  // Leaves
  let darkLeaf01 = new TreeComponent(
    geometry,
    colors.darkGreen,
    [0.5, 1.6, 0.5],
    [0.8, 0.8, 0.8]
  );
  darkLeaf01 = darkLeaf01.create();
  let darkLeaf02 = new TreeComponent(
    geometry,
    colors.darkGreen,
    [-0.4, 1.3, -0.4],
    [0.7, 0.7, 0.7]
  );
  darkLeaf02 = darkLeaf02.create();
  let darkLeaf03 = new TreeComponent(
    geometry,
    colors.darkGreen,
    [0.4, 1.3, -0.5],
    [0.7, 0.7, 0.7]
  );
  darkLeaf03 = darkLeaf03.create();
  let darkLeaf04 = new TreeComponent(
    geometry,
    colors.darkGreen,
    [0, 1.2, 0],
    [1, 2, 1]
  );
  darkLeaf04 = darkLeaf04.create();
  let lightLeaf = new TreeComponent(
    geometry,
    colors.lightGreen,
    [0, 1.2, 0],
    [1.1, 0.5, 1.1]
  );
  lightLeaf = lightLeaf.create();

  //  Stem
  let stem = new TreeComponent(
    geometry,
    colors.brown,
    [0, 0, 0],
    [0.3, 1.5, 0.3]
  );
  stem = stem.create();
  stem.name = "stem";

  // Tree
  let tree = new THREE.Group();
  tree.add(darkLeaf01);
  tree.add(darkLeaf02);
  tree.add(darkLeaf03);
  tree.add(darkLeaf04);
  tree.add(lightLeaf);
  tree.add(stem);
  return tree;
}

export function Trees(n) {
  let trees = [];
  const scaleHeight = 37 / (CONSTANTS.SIZE_GROUND / 50);
  for (let i = 0; i < n; i++) {
    let tree = Tree();
    let scale = 50 + Math.random() * (100 - 50);
    let x =
      Math.random() * (CONSTANTS.SIZE_GROUND - 200) +
      (-CONSTANTS.SIZE_GROUND / 2 + 100);
    let y = scaleHeight * (CONSTANTS.SIZE_GROUND / scale);
    let z =
      Math.random() * (-400 - (CONSTANTS.SIZE_GROUND / 2 - 100) - 0) - -400;
    tree.position.set(x, y, z);
    tree.scale.set(
      CONSTANTS.SIZE_GROUND / scale,
      CONSTANTS.SIZE_GROUND / scale,
      CONSTANTS.SIZE_GROUND / scale
    );
    trees.push(tree);
  }
  return trees;
}
