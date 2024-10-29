import GameObject from "../interfaces/GameObject"
import InputHandler from "../interfaces/InputHandler"
import Player from "./Player"

class PlayerInputHandler implements InputHandler {
  targetObject: Player
  inputBuffer: Array<KeyboardEvent>
//   reactToBufferedInputs: () => {}
  constructor(targetObject: Player) {
    this.targetObject = targetObject;
    this.inputBuffer = [];
    document.addEventListener('keydown', event => this.inputBuffer.push(event))
  }

  reactToBufferedInputs(): void {
    this.inputBuffer.forEach(this.inputHandler.bind(this));
    this.inputBuffer = [];
  }

  inputHandler(event: KeyboardEvent): void {
    const position = this.targetObject.getPosition()

    switch (event.key) {
      case 'ArrowUp':
        // this.targetObject.updatePosition() // Custom logic in the GameObject class will handle the position change
        console.log('Up arrow pressed')
        break
      case 'ArrowDown':
        // this.targetObject.updatePosition()
        this.targetObject.updatePosition({...position, y: position.y + 5})
        console.log('Down arrow pressed')
        break
      case 'ArrowLeft':
        this.targetObject.updatePosition({...position, x: position.x - 5})
        console.log('Left arrow pressed')
        break
      case 'ArrowRight':
        this.targetObject.updatePosition({...position, x: position.x + 5})
        console.log('Right arrow pressed')
        break
    }
  }
}

export default PlayerInputHandler;
