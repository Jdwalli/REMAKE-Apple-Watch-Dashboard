export interface RootState {
    workoutDate: string;
    workoutIndex: {
      index: number
    },
    uploadModal: {
      isOpen: boolean;
    };
  }

export interface Action {
    type: string;
    payload: any;
}