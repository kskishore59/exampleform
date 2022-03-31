import { ErrorMessage } from '@hookform/error-message';
import Slider from '@material-ui/core/Slider';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Label } from 'reactstrap';
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { Step2, UserDetails } from '../Store/rootSlice';
import { AppDispatch } from '../Store/store';
import { Stepper } from './Stepper';


const StepTwoPage: React.FunctionComponent<IPageProps> = props => {
    const dispatch: AppDispatch = useDispatch();
    const [value, setValue] = React.useState<number>(10);
    const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    const {firstName, lastName,dob, gender, panNumber, annualIncome} = details
    const { handleSubmit, formState: { errors },  register } = useForm<Step2>({
        defaultValues: {dob, gender, panNumber}
      });
      const { push } = useHistory();
    
      useEffect(() => {
        if (!firstName || !lastName){
          push('./')

        }
      })



      const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
          setValue(newValue);
        }
      };

      function valuetext(value: number) {
        return `${value}°C`;
      }


    

    const onClickBack = () => {
      push('./')
    }

    const onSubmit: SubmitHandler<Step2> = (data) => {
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
      <div>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
            </div>
      
      <br/>
      <br/>
      <div className='form-container' >
      <form onSubmit={handleSubmit(onSubmit)} className="list-card">
      <div className='d-flex flex-column'>
        <Label htmlFor='dob' className="label">Date of Birth</Label>
        <TextField type='date' id='dob' fullWidth  {...register("dob", { required: 'Please select the date' })} />
        <p className='label' style={{color: 'red'}}>
        <ErrorMessage errors={errors} name="dob"
         />
         </p>
      </div>
      <br/>
      <div className='d-flex flex-column'>
      <TextField
        {...register("phoneNumber", { required: 'This is required*' })}
        fullWidth
          id="phoneNumber"
          label="Phone Number"
        />
       <p className='label' style={{color: 'red'}}>
        <ErrorMessage errors={errors} name="phoneNumber"
         />
         </p>
      </div>
      <div>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
<RadioGroup
        {...register("gender", { required: 'This is required*' })}
        aria-labelledby="demo-radio-buttons-group-label"
        id='gender'
        row
      >
        <FormControlLabel name='gender'  className='label' value="female" control={<Radio />} label="Female" />
        <FormControlLabel name='gender'   className='label' value="male" control={<Radio />} label="Male" />
        <FormControlLabel  name='gender' className='label' value="other" control={<Radio />} label="Other" />
      </RadioGroup>
</div>
<div className='w-100 d-flex flex-column'>
<label htmlFor="customRange2" className="form-label label">Annual Income (LPA) : </label>
<Slider
        {...register('annualIncome', {required: 'Please select Annual Income'})}
        valueLabelDisplay="auto"
        aria-label="Default"
        getAriaValueText={valuetext}
        marks
        min={10}
        max={50}
      />
  
</div>
<br/>
      <div>
        <button className='submit-button'  type="submit" >
          Next
        </button>
        <br/>
        <br/>
        <button className='submit-button'  type="button" onClick={onClickBack}>
          Back
        </button>
      </div>
    </form>
    </div>
        </div>
        
    </Box>
    );
}                              

export default StepTwoPage;

/*<div className='list-card'>
        <p>Details Filled</p>
        {firstName !== '' ?  (<p>First Name : {firstName}</p>) : ''}
        {lastName !== '' ?  (<p>Last Name : {lastName}</p>) : ''}
      </div> */