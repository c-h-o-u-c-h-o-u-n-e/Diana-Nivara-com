import { FormData } from '../utils/bookingHelpers';

// Action types
export const SET_FIELD = 'SET_FIELD';

// Action interfaces
export interface SetFieldAction {
  type: typeof SET_FIELD;
  field: keyof FormData;
  value: string | boolean;
}

export type BookingFormAction = SetFieldAction;

/**
 * Reducer for booking form state
 */
export const bookingFormReducer = (state: FormData, action: BookingFormAction): FormData => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

/**
 * Action creator for setting a field
 */
export const setField = (field: keyof FormData, value: string | boolean): SetFieldAction => ({
  type: SET_FIELD,
  field,
  value,
});
