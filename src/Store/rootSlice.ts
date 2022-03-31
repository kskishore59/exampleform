


export interface UserDetails {
    yourDetails: {
        firstName: string,
        lastName: string,
        dob: string,
        gender: string,
        annualIncome: string,
        panNumber: string,
        address: {doorNo: string, street:string, zipCode: string},
        phoneNumber: string
        
    }
}

export interface Step1 {
    firstName: string,
    lastName: string
}

export interface Step2 {
    panNumber : string,
    annualIncome: string,
    phoneNumber: string,
    dob: string,
    gender:string,
}

export interface Step3{
    address: {
        doorNo: string,
        street: string,
        zipCode: string,
    }
}


export const initialState = {
    yourDetails: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    annualIncome: '',
    panNumber: '',
    address: {doorNo:'', street:'', zipCode: ''},
    phoneNumber: ''
    }   
}


type Action = {type: string, payload: Step1 | Step2 | Step3 | UserDetails}

export const reducer = (state:UserDetails = initialState, action : Action) => {
    switch(action.type){
        case 'UPDATE_DETAILS':
            return {
                ...state,
                yourDetails: {
                  ...state.yourDetails,
                  ...action.payload,
                }
              }
        case 'RESET_DETAILS':
            return initialState
        default:
            return state
    }
}