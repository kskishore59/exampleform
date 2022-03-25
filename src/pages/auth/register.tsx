import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IPageProps from '../../interfaces/page';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import AuthContainer from '../../components/AuthContainer';
import { Button, TextField} from '@mui/material';
import ErrorText from '../../components/ErrorText';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [error, setError] = useState<string>('')

    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data: any) => {
        const {email, password} = data
        auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result)
            history.push('/login')

        })
        .catch(error => {
            logging.error(error);

            if (error.code.includes('auth/weak-password'))
            {
                setError('Please select strong password')
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                setError('Email Already in use')
            }
            else{
                setError('Unable to register, please try again')
            }

        })
    }



    return (
        <div className='d-flex align-items-center justify-content-center bg-white h-100' style={{minHeight: '100vh', }}>
        <div className="card m-3 bg-white" style={{width: '30%', color: 'black', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <h5 className="card-header bg-transparent text-center">Register</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group w-100">
                            <label>Email</label>
                            <input  type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group w-100">
                            <label>Password</label>
                            <input  type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group w-100">
                            <label>Confirm Password</label>
                            <input  type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>
                    </div>
                    <small>
                        <p>Aleady Have an Account ? <Link to='/login'>Login Here</Link></p>
                    </small>
                 {error !== '' && <p>{error}</p>}
                </form>
            </div>
        </div>
    </div>
    );
}

export default RegisterPage;