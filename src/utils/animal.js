import { Vector3 } from "three";
import CONSTANTS from "./contants";
export function updateAnimalVelocity(globalVar, delta) {}

export function updateAnimalPosition(globalVar, delta) {
  let animal, direction, randomDirection;
  let moveSpeed = Math.random() * 400 * delta;
  let vec = new Vector3(1, 0, 0);

  for (let i = 0; i < globalVar.animals.length; i++) {
    // randomDirection = parseInt(Math.random() * 4);
    animal = globalVar.animals[i];
    animal.position.addScaledVector(vec, 1);
    if (animal.position.x > CONSTANTS.SIZE_GROUND / 2) {
      animal.position.x = -CONSTANTS.SIZE_GROUND / 2;
    }
  }
}

export function keepAnimalInside(globalVar, delta) {}
