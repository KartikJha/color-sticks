import GameObject from "./GameObject"

interface InputHandler {
  targetObject: GameObject
  inputHandler: (event: KeyboardEvent) => void
}

export default InputHandler;
