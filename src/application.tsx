import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';
import { auth } from './config/firebase';
import logging from './config/logging';
import { Spinner } from 'reactstrap';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                logging.info('User Detected')
            }
            else{
                logging.info('No User Detected')
            }
            setLoading(false)
        })
    })

    if (loading) return <div className='d-flex justify-content-center align-items-center h-w-100' style={{minHeight: '100vh'}}><Spinner color='info' /></div>

    return (
        <div>
            <Switch>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        exact={route.exact} 
                        render={(routeProps: RouteComponentProps<any>) => {
                            if (route.protected)
                                return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                            return <route.component  {...routeProps} />
                        }}
                    />)}
            </Switch>
        </div>
    );
}

export default Application;