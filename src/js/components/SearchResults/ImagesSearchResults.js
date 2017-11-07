import './ImagesSearchResults.css';

import React from 'react';
import Lightbox from 'react-images';


import ImagesSearchResult from './ImagesSearchResult';

export default class ImagesSearchResults extends React.Component {

    
    render() { 
            let results = this.props.results.map((result, index) => {
        
            return <ImagesSearchResult result={result} key={index} 
                    query={this.props.query} page={this.props.page} serp_id = {this.props.serp_id}/>
          
        });
        
        return (

        <div className="row ImagesSearchResults">
            
                {results}
            
            
        </div>
       
    )
    }
};