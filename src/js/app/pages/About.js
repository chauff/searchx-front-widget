import React from 'react';
import './About.pcss'

const About = function() {
    return (
        <div className="About">
            <div className="text-center">
                <h1>About <img className="Logo" src='/img/searchx-covid19.png' alt="SearchX Logo"/> </h1>
                <div className="Info" >
                    <p>
                        SearchX is a search interface developed by <a href="http://www.wis.ewi.tudelft.nl"> TU Delft's Web Information Systems group</a>.
                        If you have questions or issues please contact <a href="http://www.wis.ewi.tudelft.nl/moraes/">Felipe Moraes</a> at f.moraes@tudelft.nl or <a href="https://roynirmal.github.io/">Nirmal Roy</a> at n.roy@tudelft.nl
                    </p>
		    <p> To setup SearchX for your own use check our <a href = "https://github.com/felipemoraes/searchx-frontend/"> frontend </a> and <a href = "https://github.com/felipemoraes/searchx-backend/"> backend </a> Github repositories!
	   	   </p>
              <p>We use <a href="https://pages.semanticscholar.org/coronavirus-research">COVID-19 Open Research Dataset (CORD-19) </a> as our collection.</p>
                 </div>
                <img className="TUDLogo" src='/img/tud_logo.png' alt="TU Delft Logo"/>
            </div>
        </div>
    )
};

export default About;
