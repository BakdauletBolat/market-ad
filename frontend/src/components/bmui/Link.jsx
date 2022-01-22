import { Link as ReactRouterLink } from "react-router-dom";
import React from "react";

function Link({to,underline,children}) {
    return ( 
        <ReactRouterLink style={{
            color:'inherit',
            fontSize: 'inherit',
            textDecoration: underline
        }} to={to}>{children}</ReactRouterLink>
     );
}

export default Link;