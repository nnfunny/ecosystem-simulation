export default function activatePointerLock(globalVar) {
  let blocker = document.getElementById("blocker");
  let instructions = document.getElementById("instructions");
  let esc = document.getElementById("esc");

  instructions.addEventListener(
    "click",
    function () {
      globalVar.controls.lock();
      if (globalVar.prevPosition) {
        globalVar.controls
          .getObject()
          .position.set(
            globalVar.prevPosition.x,
            globalVar.prevPosition.y,
            globalVar.prevPosition.z
          );
        // console.log(globalVar.controls.getObject().position);
      }
    },
    false
  );

  globalVar.controls.addEventListener("lock", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
    esc.style.display = "";
  });

  globalVar.controls.addEventListener("unlock", function () {
    globalVar.prevPosition = globalVar.controls.getObject().position;
    // console.log(globalVar.prevPosition);
    blocker.style.display = "block";
    instructions.style.display = "";
    esc.style.display = "none";
  });
}
