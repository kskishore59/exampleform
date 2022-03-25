import { useSelector } from 'react-redux';
import IPageProps from '../interfaces/page';
import { UserDetails } from '../rootSlice';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import '../components/Styles/styles.css'

const ResultPage: React.FunctionComponent<IPageProps> = props => {
    const location = useLocation()

    const details = useSelector<UserDetails, UserDetails['yourDetails']>((state) => state.yourDetails)
    const {firstName, lastName, dob, gender, phoneNumber, annualIncome, address} = details

    return(
        <>
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
          <li className={location.pathname === "/step3" ? "active" : ""}>
            <Link to="/step3">Step 3</Link>
          </li>
        </ul>
      </nav>
      <br/>
      <br/>
      <div className='d-flex align-items-center justify-content-center'>
      <ul className='text-start d-flex flex-column align-items-start' style={{}}>
           <li className='list'>First Name: {firstName}</li>
           <li className='list'>Last Name: {lastName}</li>
           <li className='list'>DOB: {dob}</li>
           <li className='list'>Gender: {gender}</li>
           <li className='list'>Phone Number: {phoneNumber}</li>
           <li className='list'>Address:  doorNo : {address.doorNo} , street: {address.street}, Zip Code: {address.zipCode}</li>
        </ul>
        </div>
    </div>
    </>
        
    )

}

export default ResultPage
    
