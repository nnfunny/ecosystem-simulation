import * as THREE from "three";

class Ground {
  constructor(size, repeat, imagePath) {
    this.imagePath = imagePath;
    this.height = size;
    this.width = size;
    this.repeat = repeat;
    this._ground = null;
  }

  create() {
    let gt = new THREE.TextureLoader().load(this.imagePath);
    let gg = new THREE.PlaneBufferGeometry(this.height, this.width);
    let gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });
    let ground = new THREE.Mesh(gg, gm);

    ground.rotation.x = -Math.PI / 2;
    ground.material.map.repeat.set(this.repeat, this.repeat);
    // ground.material.map.wrapS = THREE.RepeatWrapping;
    // ground.material.map.wrapT = THREE.RepeatWrapping;
    // ground.material.map.encoding = THREE.sRGBEncoding;
    ground.receiveShadow = true;

    this._ground = ground;
    return ground;
  }
}

export default Ground;
