import { Sun } from "../../models";
export default function loadSun(globalVar, loader) {
  let sun;
  loader.load(
    Sun,
    (gltf) => {
      sun = gltf.scenes[0];
      sun.scale.set(100, 100, 100);
      sun.position.set(1000, 1000, 1000);
      globalVar.scene.add(sun);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
}
