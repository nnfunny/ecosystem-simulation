import CONSTANTS from "./contants";

export function onKeyDown(globalVar) {
  document.addEventListener(
    "keydown",
    function (event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          globalVar.move.moveForward = true;
          break;

        case 37: // left
        case 65: // a
          globalVar.move.moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          globalVar.move.moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          globalVar.move.moveRight = true;
          break;

        case 32: // space
          if (globalVar.move.canJump === true) globalVar.velocity.y += 350;
          globalVar.move.canJump = false;
          break;
      }
    },
    false
  );
}
export function onKeyUp(globalVar) {
  document.addEventListener(
    "keyup",
    function (e) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          globalVar.move.moveForward = false;
          break;

        case 37: // left
        case 65: // a
          globalVar.move.moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          globalVar.move.moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          globalVar.move.moveRight = false;
          break;
      }
    },
    false
  );
}
export function onWindowResize(globalVar) {
  window.addEventListener(
    "resize",
    function () {
      globalVar.renderer.setSize(
        CONSTANTS.SCREEN_WIDTH,
        CONSTANTS.SCREEN_HEIGHT
      );

      globalVar.camera.aspect =
        CONSTANTS.SCREEN_WIDTH / CONSTANTS.SCREEN_HEIGHT;
      globalVar.camera.updateProjectionMatrix();
    },
    false
  );
}
