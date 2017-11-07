import './SearchResults.css';

import React from 'react';

import WebSearchResults from './WebSearchResults';
import NewsSearchResults from './NewsSearchResults';
import ImagesSearchResults from './ImagesSearchResults';
import VideosSearchResults from './VideosSearchResults';
import ForumSearchResults from './ForumSearchResults';

import SearchResultsPagination from './SearchResultsPagination';
import SearchResultsNotFound from './SearchResultsNotFound';

import SearchStore from './../../stores/SearchStore'
import AccountStore from './../../stores/AccountStore';

import {log} from '../../logger/Logger';
import {LoggerEventTypes} from '../../constants/LoggerEventTypes';

import history from '../../components/App/History';
import AppActions from './../../actions/AppActions';

var configuration = require('../../config');

var Loader = require('react-loader');


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var getSearchState = () => {
  
    return {
        query: SearchStore.getQuery(),
        vertical: SearchStore.getVertical(),
        results: SearchStore.getResults(),
        serp_id : SearchStore.getSerpId(),
        matches: SearchStore.getMatches(),
        userId: AccountStore.getId(),
        activePage: SearchStore.getPageNumber() ? SearchStore.getPageNumber() : 1,
        elapsedTime : ((SearchStore.getElapsedTime())/1000).toFixed(2).toString(),
        resultsNotFound : SearchStore.getResultsNotFound()
    }
};

export default class SearchResults extends React.Component {
    constructor() {
        super();
        this.state = getSearchState();
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        
        SearchStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._onChange);
    }

    componentWillUpdate(nextProps, nextState){
       
    }

    _onChange() {
        this.setState(getSearchState);
    }
    

    handlePageChange(pageNumber) {
        
        var metaInfo = {
            query: this.state.query,
            page: pageNumber,
            previous_page: this.state.activePage,
            vertical: this.state.vertical,
            serp_id: this.state.serp_id
        }
        log(LoggerEventTypes.SEARCHRESULTS_NEXT_PAGE, metaInfo);
        history.push({'pathname': '/?q='+this.state.query+'&v='+this.state.vertical + '&p=' + pageNumber});
        AppActions.nextPage(this.state.query, this.state.vertical, pageNumber);
        this.setState({activePage: pageNumber,
            results: SearchStore.getResults()
        });
           
    }
      

    render() {
        //only if more than X search results are returned do we enter approximate numbering
        var prefix = "About ";
        if (this.state.matches < configuration.aboutPrefixAt) {
            prefix = "";
        }
        var timeIndicator = prefix + numberWithCommas(this.state.matches) + " results (" + this.state.elapsedTime + " seconds)";
        
        var introMsg = "You can upvote (the result was useful) and downvote (the result was not useful) search results. For every result you are shown the total number of votes (positives-negatives) your fellow learners have assigned to it.";
        
        
        
        
        return (
                <div >
                    {SearchStore.getResultsNotFound() ? <SearchResultsNotFound/> : 
                    <div>
                        <div className="row SearchResults" data-intro={introMsg} data-position="auto" data-set="step3" >
                            <div className="col-xs-12" >
                                {this.state.results.length > 0 ? <p className = "TimeIndicator"> {timeIndicator} </p> : ""}
                                
                                {this.state.vertical === 'web' ? <WebSearchResults  results={this.state.results} 
                                    query={this.state.query} page={this.state.activePage} serp_id = {this.state.serp_id}/> : ''}
                                {this.state.vertical === 'news' ? <NewsSearchResults results={this.state.results} 
                                    query={this.state.query} page={this.state.activePage} serp_id={this.state.serp_id}/> : ''}
                                {this.state.vertical === 'images' ? <ImagesSearchResults results={this.state.results} 
                                    query={this.state.query} page={this.state.activePage} serp_id = {this.state.serp_id}/> : ''}
                                {this.state.vertical === 'videos' ? <VideosSearchResults results={this.state.results} 
                                    query={this.state.query} page={this.state.activePage} serp_id = {this.state.serp_id}/> : ''}
                                {this.state.vertical === 'forums' ? <ForumSearchResults results={this.state.results}
                                    query={this.state.query} page={this.state.activePage} serp_id = {this.state.serp_id}/> : ''}
                            </div>
                            {  SearchStore.getSubmittedQuery() ? <Loader loaded={this.state.results.length > 0 || SearchStore.isFinished()  }/> : "" }

                            
                        </div>
                    
                        <SearchResultsPagination vertical={this.state.vertical}   
                            length={this.state.matches} activePage={this.state.activePage}  
                            handlePageChange={this.handlePageChange.bind(this)} finished={this.state.results.length > 0 || SearchStore.isFinished()  }/>
                        
                        {  SearchStore.getSubmittedQuery() & SearchStore.isFinished() ? 
 			    <div className="col-xs-12 text-center" >
                            	<p className="Footer"> About <a href="https://searchx.ewi.tudelft.nl:80/about" target="_blank">SearchX</a>.</p>
			    </div>
                             : ""
                        }
                        
                    </div>
                    }
                </div>

            
        )
    }
}
