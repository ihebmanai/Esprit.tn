import {
	ADD_DEPARTEMENT,
	GET_DEPARTEMENT,
	GET_ALL_DEPARTEMENT,
	DELETE_DEPARTEMENT,
	GET_ERRORS,
	EDIT_DEPARTEMENT
} from '../actions/types';

const initialState = {
	deps: [],
	dep: {},
	loading: false,
	search: [],
	searching: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_DEPARTEMENT:
			return {
				...state,
				deps: action.payload,
				loading: false
			};
		case GET_DEPARTEMENT:
			return {
				...state,
				dep: action.payload,
				loading: false
			};
		case ADD_DEPARTEMENT:
			return {
				...state,
				deps: [ ...state.deps, action.payload ],
				dep: action.payload
			};
		case EDIT_DEPARTEMENT:
			return {
				...state,
				deps: state.deps.map((dep) => (dep._id === action.payload._id ? (dep = action.payload) : dep))
			};
		case DELETE_DEPARTEMENT:
			return {
				...state,
				deps: state.deps.filter((dep) => dep._id !== action.payload)
			};
		default:
			return state;
	}
}
