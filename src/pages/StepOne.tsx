import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { Step1, UserDetails } from '../Store/rootSlice';
import { AppDispatch } from '../Store/store';
import { Stepper } from './Stepper';






const HomePage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    const {firstName, lastName} = details;
    const { handleSubmit, formState: { errors }, register } = useForm<Step1>({
        defaultValues: {firstName, lastName}
      });


    const { push } = useHistory();

    const onSubmit: SubmitHandler<Step1> = (data) => {
        console.log(data)
        dispatch({type: "UPDATE_DETAILS", payload: data})
        console.log(details)
        push('./Step2')
    };
    return (
             <Box sx={{ flexGrow: 1 }}>     
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img style={{height: '40px', width: '50px'}} src="https://res.cloudinary.com/joinditto-in/image/upload/v1647523910/ditto_log_iqxxha.png" alt='logo' />
          </Typography>
          <Button style={{color: 'white'}}><Link to="/logout" style={{color: 'white', textDecoration: 'none', transform: 'scale(1.0)'}}>LOGOUT</Link></Button>
        </Toolbar>
      </AppBar>
      <div className='text-center align-items-center bg-white' style={{minHeight: '100vh'}}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
           
      <br/>
      <br/>
      <div className='form-container' >
      <form onSubmit={handleSubmit(onSubmit)} className="list-card p-4">
      <div className='d-flex flex-column'>
      <TextField
        {...register("firstName", { required: 'This is required*' })}
          id="firstName"
          label="First Name"
        />
       <p className='label' style={{color: 'red'}}>
        <ErrorMessage errors={errors} name="firstName"
         />
         </p>
      
      </div>
      <div className='d-flex flex-column'>
      <TextField
        {...register("lastName", { required: 'This is required*' })}
          id="demo-helper-text-misaligned"
          label="Last Name"
        />
        <p className='label' style={{color: 'red'}}>
        <ErrorMessage errors={errors} name="lastName"
         />
         </p>
      </div>    
      <div>
      <Button
        variant="contained"
        color="primary"
        type='submit'
        fullWidth
      >Next</Button>
      </div>
    </form>
    </div>
        </div>
        
    </Box>
    );
}                              

export default HomePage;