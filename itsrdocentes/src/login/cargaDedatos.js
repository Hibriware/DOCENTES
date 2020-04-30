import React from 'react';
import './carga.css';


export default function loader() {

    return (
        <div className="centrar">
            <div class="cssload-thecube">
                <div class="cssload-cube cssload-c1"></div>
                <div class="cssload-cube cssload-c2"></div>
                <div class="cssload-cube cssload-c4"></div>
                <div class="cssload-cube cssload-c3"></div>
            </div>
            <br/>
             <strong>Por favor espere...</strong>
        </div>

    );
}