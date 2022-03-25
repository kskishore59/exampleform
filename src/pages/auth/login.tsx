import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IPageProps from '../../interfaces/page';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
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
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data: any) => {
        const {email, password} = data
        if (error !== '') setError('')
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result)
            history.push('/')
        })
        .catch(error => {
            logging.error(error.message);
            setError(error.message)
        })

    }


    return (
        <div className='d-flex align-items-center justify-content-center bg-white h-100' style={{minHeight: '100vh', }}>
        <div className="card m-3 bg-white" style={{width: '30%', color: 'black', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <h5 className="card-header bg-white text-center">Login</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group w-100">
                            <label>Email</label>
                            <input id='email'  type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group w-100">
                            <label>Password</label>
                            <input id='password'  type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-info mt-2 w-100">Login</button>
                 </div>
                 <small>
                     <p>Don't have an account ? <Link to='/register'>Register</Link></p>
                     <p>Forgot Password ? <Link to='/forgot' >Reset</Link></p>
                 </small>
                 {error !== '' && <p>{error}</p>}
                </form>
            </div>
        </div>
    </div>
    );
}

export default RegisterPage;