import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../components/Styles/styles.css';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';
import { Step3, UserDetails } from '../Store/rootSlice';
import { AppDispatch } from '../Store/store';
import { Stepper } from './Stepper';



const StepThree: React.FunctionComponent<IPageProps> = props => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch();
    const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    const {firstName, lastName, gender, phoneNumber, annualIncome, dob} = details
    const {doorNo, street, zipCode} = details.address
    const { handleSubmit, register } = useForm<Step3>({
        defaultValues: {address: {doorNo, street, zipCode}}
      });


    const { push } = useHistory();

    useEffect(() => {
      if (!gender || !phoneNumber || !annualIncome || !dob){
          push('./step2')
      }
    })

    const onClickBack = () => {
      push('./step2')
    }

    const onSubmit: SubmitHandler<Step3> = (data) => {
        console.log(data)
        dispatch({type: "UPDATE_DETAILS", payload: data })
        console.log(details)
        push('./result')
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
      <div className=' d-flex flex-column text-center  bg-white' style={{minHeight: '100vh'}}>
            <p>
                Welcome Home {auth.currentUser?.email}<br />
            </p>
            <Stepper />
      <br/>
      <br/>

      <div className='form-container' >
      <form onSubmit={handleSubmit(onSubmit)} className="list-card">
      <div className='d-flex flex-column'>
      <TextField
        {...register("address.doorNo", { required: 'Please enter Door No.' })}
          id="demo-helper-text-misaligned"
          label="Door No."
        />
        <br/>
      </div>
      <div className='d-flex flex-column'>
        <TextField
        {...register("address.street", { required: 'Please enter Street Name' })}
          id="demo-helper-text-misaligned"
          label="Street."
        />
      </div>
      <br/>
      <div className='d-flex flex-column'>
      <TextField
        {...register("address.zipCode", { required: 'Please enter Zip Code' })}
          id="demo-helper-text-misaligned"
          label="Zip Code"
        />
        <br/>
      </div>
      <br/>
      
    
      <div>
      <Button
        variant="contained"
        color="primary"
        type='submit'
        fullWidth
      >Submit</Button>
        <br/>
        <br/>
        <Button
        fullWidth
        variant="contained"
        color="primary"
        type='button'
        onClick={onClickBack}
      >Back</Button>
      </div>
      <div className='d-flex justify-content-between'>
     
      
      </div>
    </form>
    </div>
      
        </div>
        
    </Box>
    );
}                              

export default StepThree;


/*<div className='list-card d-flex flex-column align-items-start justify-content-center w-100'>
<p>Details Filled</p>
{firstName !== '' ?  (<p>First Name : {firstName}</p>) : ''}
{lastName !== '' ?  (<p>Last Name : {lastName}</p>) : ''}
{dob !== '' ?  (<p>Date of Birth : {dob}</p>) : ''}
{phoneNumber !== '' ?  (<p>Phone Number : {phoneNumber}</p>) : ''}
{annualIncome !== '' ?  (<p>annualIncome : {annualIncome}</p>) : ''}
{gender !== '' ?  (<p>Gender : {gender}</p>) : ''}
</div> */