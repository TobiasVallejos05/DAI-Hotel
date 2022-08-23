import * as React from 'react';
import {useContext} from "react";
export const initialState={
    loading:true,
    token:'',
};

export const ActionTypes={
SetLoading:'SET_LOADING',
SetToken:'SET_TOKEN'
}

export const reducer =(state={},action)=>{
    switch(action.type){
        case ActionTypes.SetLoading:
            return{
                ...state,
                loading: action.value,
            };
        case ActionTypes.SetToken:
            return{
                ...state,
                token: action.value,
            };
    }
}
export const initialContext={
    contextState:initialState,
    setContextState:()=>{},
};

const Cont = React.createContext(initialContext);
export function ContextProvider({children,initial=initialState}){
const [state, dispatch] = React.useReducer(reducer, initial);

const contextState=state;
const setContextState=dispatch;

return <Cont.Provider value ={{contextState,setContextState}}>{children}</Cont.Provider>
}
export const useContextState=()=>useContext(Cont);
