import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import Terms from './components/Terms';
import Alg from './components/Alg2.js'
import Privacy from './components/Privacy'
import NavBar from './components/NavBar.js';
import Form from './components/Form.js'
import FAQs from './components/FAQs.js'
import Footer from './components/Footer.js';
import RequestContact from './components/Request.js';
import About from './components/About.js';

export const RoutesList = () => {
  return (
    <div class='bodyodyody'>
      <NavBar />
        <Routes>

            <Route path="/" element= {<App />}>          
            </Route>
            <Route path="/form" element= {<Form />}>          
            </Route>
            <Route path="/faqs" element= {<FAQs />}>          
            </Route>
            <Route path="/terms" element= {<Terms />}>     
            </Route>
            <Route path="/algorithm" element= {<Alg />}>     
            </Route>
            <Route path="/privacy" element= {<Privacy />}>     
            </Route>
            <Route path="/contact" element= {<RequestContact />}>     
            </Route>
            <Route path="/about" element= {<About />}>     
            </Route>
            <Route path="*" element={ <p>Uh oh! There's nothing here! </p>} />
        </Routes>
        {/* <Footer /> */}

    
    </div>
  );
};