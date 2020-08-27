import React from 'react';
import './css/carga.css';


export default function loader() {

    return (
        <div className="centrar">
            <div className="cssload-thecube">
                <div className="cssload-cube cssload-c1"></div>
                <div className="cssload-cube cssload-c2"></div>
                <div className="cssload-cube cssload-c4"></div>
                <div className="cssload-cube cssload-c3"></div>
            </div>
            <br/>
             <strong>Por favor espere...</strong>
        </div>

    );
}