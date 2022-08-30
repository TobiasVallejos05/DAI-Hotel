import * as React from 'react';
import {useContext} from "react";

export const initialState={
    loading:true,
    token:'',
     plato:{
        titulo:'',
        image:'',
        precioPorUnidad:0,
        sano:0,
        vegano:false,
        vegetariano:false,
    }
};

export const ActionTypes={
SetLoading:'SET_LOADING',
SetToken:'SET_TOKEN',
SetPlato:'SET_PLATO',
SetTitulo:'SET_TITULO',
SetImage:'SET_IMAGE',
SetPrecioPorUnidad:'SET_PRECIOPORUNIDAD',
SetSano:'SET_SANO',
SetVegano:'SET_VEGANO',
SetVegetariano:'SET_VEGETARIANO'
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
         case ActionTypes.SetPlato:
            return{
                ...state,
                token: action.value,
            };
            case ActionTypes.SetTitulo:
            return{
                ...state,
                token: action.value,
            };
            case ActionTypes.SetImage:
                return{
                    ...state,
                    token: action.value,
            };    
            case ActionTypes.SetPrecioPorUnidad:
                return{
                    ...state,
                    token: action.value,
            };
            case ActionTypes.SetSano:
                return{
                    ...state,
                    token: action.value,
            }; 
            case ActionTypes.SetVegano:
                return{
                    ...state,
                    token: action.value,
            }; 
            case ActionTypes.SetVegetariano:
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