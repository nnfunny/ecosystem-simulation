import CONSTANTS from "./contants";

export function updateVelocity(globalVar, delta) {
  globalVar.velocity.x -= globalVar.velocity.x * 10.0 * delta;
  globalVar.velocity.z -= globalVar.velocity.z * 10.0 * delta;
  globalVar.velocity.y -= 9.8 * CONSTANTS.VISITOR.mass * delta; // 100.0 = mass

  globalVar.direction.z =
    Number(globalVar.move.moveForward) - Number(globalVar.move.moveBackward);
  globalVar.direction.x =
    Number(globalVar.move.moveRight) - Number(globalVar.move.moveLeft);
  globalVar.direction.normalize(); // this ensures consistent movements in all globalVar.directions

  if (globalVar.move.moveForward || globalVar.move.moveBackward)
    globalVar.velocity.z -= globalVar.direction.z * 400.0 * delta;
  if (globalVar.move.moveLeft || globalVar.move.moveRight)
    globalVar.velocity.x -= globalVar.direction.x * 400.0 * delta;
}
export function updatePosition(globalVar, delta) {
  globalVar.controls.moveRight(
    -globalVar.velocity.x * delta * CONSTANTS.VISITOR.movementSpeed
  );
  globalVar.controls.moveForward(
    -globalVar.velocity.z * delta * CONSTANTS.VISITOR.movementSpeed
  );
  globalVar.controls.getObject().position.y += globalVar.velocity.y * delta; // new behavior
}
export function keepOnGround(globalVar) {
  if (globalVar.controls.getObject().position.y < CONSTANTS.INITAL_POSITION.y) {
    globalVar.velocity.y = 0;
    globalVar.controls.getObject().position.y = CONSTANTS.INITAL_POSITION.y;

    globalVar.move.canJump = true;
  }
}
export function keepInsideWorld(globalVar) {
  let visitorPosition = globalVar.controls.getObject().position;
  if (
    visitorPosition.x + 100 > CONSTANTS.SIZE_GROUND / 2 ||
    visitorPosition.x - 100 < -CONSTANTS.SIZE_GROUND / 2 ||
    visitorPosition.z + 100 > CONSTANTS.SIZE_GROUND / 2 ||
    visitorPosition.z - 100 < -CONSTANTS.SIZE_GROUND / 2
  ) {
    {
      // console.log(collisionResults);
      globalVar.velocity.x = Math.max(0, globalVar.velocity.x);
      globalVar.velocity.z = Math.max(0, globalVar.velocity.z);
    }
  }
}
