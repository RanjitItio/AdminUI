import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Main, DrawerHeader } from './Content';



// Page not found
export default function PageNotFound({open}) {
    const navigate = useNavigate();

    return (
        <Main open={open}>
        <DrawerHeader />
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={()=> navigate('/')}>Back Home</Button>}
            />
        </Main>
    );
};