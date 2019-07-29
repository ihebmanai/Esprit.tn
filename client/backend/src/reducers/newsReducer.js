import { ADD_NEWS, GET_NEWS, GET_ALL_NEWS, DELETE_NEWS, EDIT_NEWS } from '../actions/types';

const initialState = {
	allNews: [],
	news: {},
	loading: false,
	search: [],
	searching: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_NEWS:
			return {
				...state,
				allNews: action.payload,
				loading: false
			};
		case GET_NEWS:
			return {
				...state,
				news: action.payload,
				loading: false
			};
		case ADD_NEWS:
			return {
				...state,
				allNews: [ ...state.allNews, action.payload ],
				news: action.payload
			};
		case EDIT_NEWS:
			return {
				...state,
				allNews: state.allNews.map((news) => (news._id === action.payload._id ? (news = action.payload) : news))
			};
		case DELETE_NEWS:
			return {
				...state,
				allNews: state.allNews.filter((news) => news._id !== action.payload)
			};
		default:
			return state;
	}
}
