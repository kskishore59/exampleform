import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';



export interface IAuthContainerProps {
    header: any;
}

const AuthContainer: React.FunctionComponent<IAuthContainerProps> = props => {
    const { children, header } = props;

    return (
        <Box className='bg-white' style={{minHeight: '100vh', width: '100vw'}}>
            <Row>
                <Col 
                    xs={{ size: 10, offset: 1 }} 
                    sm={{ size: 8, offset: 2 }} 
                    md={{ size: 6, offset: 3 }} 
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='mt-5 bg-white'>
                        <CardHeader className="bg-primary text-white">
                            {header}
                        </CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Box>
    );
}

export default AuthContainer;