export enum ActionType {
  UPDATE_TUTORIAL = 'UPDATE_TUTORIAL'
}

export function updateTutorial(tutorial: Tutorial){
  return {
    type: ActionType.UPDATE_TUTORIAL,
    ...tutorial
  }
}