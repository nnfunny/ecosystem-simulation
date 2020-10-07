import * as THREE from "three";

class Light {
  constructor(x, y, z, color, intensity) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
    this.intensity = intensity;
    this._light = null;
  }

  create() {
    let light = new THREE.DirectionalLight(this.color, this.intensity);
    light.position.set(this.x, this.y, this.z);

    light.castShadow = true;
    // Set up shadow properties for the light
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 512;

    light.shadow.camera.near = 100;
    light.shadow.camera.far = 1200;

    light.shadow.camera.left = -1000;
    light.shadow.camera.right = 1000;
    light.shadow.camera.top = -350;
    light.shadow.camera.bottom = 350;

    this._light = light;
    return light;
  }
}

export default Light;
