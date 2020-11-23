import { combineReducers } from "redux";

import sessionErrorsReducer from "../session_errors_reducer";
import notesErrorsReducer from "../notes_errors_reducer";
import notebooksErrorsReducer from "../notebooks_error_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  notes: notesErrorsReducer,
  notebook: notebooksErrorsReducer
});

export default errorsReducer;