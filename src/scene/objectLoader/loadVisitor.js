import Visitor from "../../components/Visitor";
import CONSTANTS from "../../utils/contants";

export default function loadVisitor(globalVar) {
  let visitorObj = new Visitor(CONSTANTS.VISITOR.color, 10, 10, 10);
  let visitor = visitorObj.create();
  visitor.position.set(10, 5, 10);
  visitor.visible = false;
  globalVar.visitor = visitor;
  globalVar.scene.add(visitor);
  globalVar.camera.add(visitor);
}
