import { Animals } from "../../models";
import CONSTANTS from "../../utils/contants";

export default function loadAnimals(globalVar, loader) {
  let animal, x, z;
  let scale = 13,
    randomAnimal;
  for (let i = 0; i < CONSTANTS.N_ANIMALS; i++) {
    randomAnimal = parseInt(Math.random() * Animals.length);
    loader.load(
      Animals[randomAnimal],
      (gltf) => {
        x =
          Math.random() * (CONSTANTS.SIZE_GROUND - 200) +
          (-CONSTANTS.SIZE_GROUND / 2 + 100);
        z =
          Math.random() * (-400 - (CONSTANTS.SIZE_GROUND / 2 - 100) - 0) - -400;

        animal = gltf.scenes[0];
        animal.scale.set(scale, scale, scale);
        animal.position.set(x, 0, z);
        animal.rotateY(Math.PI / 2);

        globalVar.scene.add(animal);
        globalVar.collidableMeshList.push(animal);
        globalVar.animals.push(animal);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }
}
