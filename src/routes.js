import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import ApiReturn from './pages/FromApi/ApiReturn'

function Rota(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/api-return" component={ApiReturn}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default Rota