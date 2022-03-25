import { Box } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import '../components/Styles/styles.css';
import {useSelector, useDispatch} from 'react-redux';
import { Step1, UserDetails, Step3, StepTwo } from '../rootSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Input, Label } from 'reactstrap';
import { AppDispatch } from '../store';



const StepTwoPage: React.FunctionComponent<IPageProps> = props => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    const {firstName, lastName,dob, gender, panNumber, annualIncome} = details
    const { handleSubmit, register } = useForm<StepTwo>({
        defaultValues: {dob, gender, panNumber}
      });


    const { push } = useHistory();

    const onSubmit: SubmitHandler<StepTwo> = (data) => {
        console.log(data)
        dispatch({type: "UPDATE_DETAILS", payload: data})
        console.log(details)
        push('./step3')
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
            <nav className="container d-flex">
        <ul className="steps d-flex w-100 justify-content-between">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Step 1</Link>
          </li>
          <li className={location.pathname === "/step2" ? "active" : ""}>
            <Link to="/step2">Step 2</Link>
          </li>
          <li className={location.pathname === "/result" ? "active" : ""}>
            <Link to="/step3">Step3</Link>
          </li>
        </ul>
      </nav>
      <div>
        <p>Details Filled</p>
      </div>
      <br/>
      <br/>
      <div className='form-container' >
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='d-flex flex-column'>
        <Label htmlFor='dob' className="label">Date of Birth</Label>
        <input type='date' {...register("dob", { required: true })} />
      </div>
      <br/>
      <div className='d-flex flex-column'>
      <Label htmlFor='phoneNumber' className="label">Phone Number</Label>
      <input {...register("phoneNumber", { required: true , maxLength: 10})} />
        <br/>
      </div>
      <div className='d-flex'>
          <p className='mr-2'>Gender : </p>
      <div className="form-check d-flex">
  <input className="form-check-input" type="radio" value='male'   id="flexRadioDefault1" {...register('gender')} />
  <label className="form-check-label label" htmlFor="flexRadioDefault1">
    Male
  </label>
</div>
<div className="form-check ml-2">
  <input className="form-check-input" value='female' type="radio" id="flexRadioDefault2"  {...register('gender')} />
  <label className="form-check-label label" htmlFor="flexRadioDefault2">
    Female
  </label>
</div>
</div>
<div className='w-100 d-flex flex-column'>
<label htmlFor="customRange2" className="form-label label">Annual Income : </label>
<input type="range" className="form-range" min="0" max="5" id="customRange2" {...register('annualIncome', {required: true})}></input>
</div>
<br/>
      <div>
        <button className='submit-button'  type="submit" >
          Next
        </button>
      </div>
    </form>
    </div>
        </div>
        
    </Box>
    );
}                              

export default StepTwoPage;