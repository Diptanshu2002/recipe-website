import { createContext, useReducer } from "react";
export const themeContext = createContext();

const initialState = { 
        color: '#58249c',
        mode : 'dark'
}

function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_COLOR':
        return {...state, color: action.payload};
      
      case 'CHANGE_MODE':
        return {...state, mode: action.payload }

      default:
        return state
    }
  }


export function ThemeProvider({children}){

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const colorPick=(color)=>{
        dispatch({
                    type: 'CHANGE_COLOR',
                    payload: color
                })
    }

    const changeMode = (mode)=>{
      dispatch({
        type: 'CHANGE_MODE',
        payload: mode
      })
    }

    return(
        <themeContext.Provider value={{...state, colorPick , changeMode}}>
            {children}
        </themeContext.Provider>
    )
    
}