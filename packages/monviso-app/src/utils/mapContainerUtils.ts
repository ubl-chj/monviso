export const distanceToMouse = ({ x, y }: any, { x: mouseX, y: mouseY }: any): {} => {
  return Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY))
}
