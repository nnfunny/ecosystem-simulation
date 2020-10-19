import { Cloud } from "../../models";
import CONSTANTS from "../../utils/contants";

export default function loadClouds(globalVar, loader) {
  let cloud, x, y, z;
  for (let i = 0; i < CONSTANTS.N_CLOUDS; i++) {
    loader.load(
      Cloud,
      (gltf) => {
        x = Math.random() * CONSTANTS.SIZE_GROUND + -CONSTANTS.SIZE_GROUND / 2;
        y = Math.random() * (1000 - 500) + 500;
        z = Math.random() * CONSTANTS.SIZE_GROUND + -CONSTANTS.SIZE_GROUND / 2;

        cloud = gltf.scenes[0];
        cloud.scale.set(100, 100, 100);
        cloud.position.set(x, y, z);
        globalVar.scene.add(cloud);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }
}
