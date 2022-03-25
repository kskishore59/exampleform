


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

export interface StepTwo {
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


const initialState = {
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


type Action = {type: "UPDATE_DETAILS", payload: Step1 | StepTwo | Step3}

export const reducer = (state:UserDetails = initialState, action : Action) => {
    switch(action.type){
        case 'UPDATE_DETAILS':
            return {
                ...state,
                yourDetails: {
                  ...state.yourDetails,
                  ...action.payload,
                }
              };
        default:
            return state
    }
}