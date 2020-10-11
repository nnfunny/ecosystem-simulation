import { Mountain1, Mountain2 } from "../../models";

export default function loadMountains(globalVar, loader) {
  let mountain1, mountain2;
  // Mountains
  loader.load(
    Mountain1,
    (gltf) => {
      mountain1 = gltf.scenes[0];
      mountain1.scale.set(500, 500, 500);
      mountain1.translateX(3000);
      mountain1.translateZ(950);
      globalVar.scene.add(mountain1);
      globalVar.collidableMeshList.push(mountain1);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
  loader.load(
    Mountain2,
    (gltf) => {
      mountain2 = gltf.scenes[0];
      mountain2.scale.set(500, 500, 500);
      mountain2.translateX(700);
      mountain2.translateZ(1000);
      globalVar.scene.add(mountain2);
      globalVar.collidableMeshList.push(mountain2);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
  loader.load(
    Mountain2,
    (gltf) => {
      mountain2 = gltf.scenes[0];
      globalVar.scene.add(mountain2);
      mountain2.scale.set(500, 500, 500);
      mountain2.translateX(-100);
      mountain2.translateZ(1000);
      globalVar.collidableMeshList.push(mountain2);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
}
