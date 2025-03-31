export const initialState = {
  searchTerm: '',
  showSearch: false,
  scrolled: false,
  mobileMenuOpen: false,
  activeDropdown: null,
};

export const headerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'TOGGLE_SEARCH':
      return { ...state, showSearch: !state.showSearch };
    case 'SET_SCROLLED':
      return { ...state, scrolled: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen, activeDropdown: null };
    case 'SET_ACTIVE_DROPDOWN':
      return { ...state, activeDropdown: state.activeDropdown === action.payload ? null : action.payload };
    default:
      return state;
  }
};