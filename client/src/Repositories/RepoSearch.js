import React from 'react';
import RepoList from "./components/RepoList";
import axios from "axios";

class RepoSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            loading: false,
            repos: []
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    fetchAllRepos = () => {
        this.setState({ isLoading: true })
        let query = this.state.searchQuery;

        axios({
            method: "get",
            url: "http://localhost:3001/repos",
            params: { query: query }
        })
        .then(resData => {
			const repos = resData.data.items;
            this.setState({ 
                repos: repos,
                loading: false
            });
		})
        .catch(err => {
			console.log(err);
		})
    }

    render() {
        const repos = this.state.repos;
        let content;

        if (!repos) {
            content = <div>Nothing Here</div>
        } else {
            content = <RepoList repos={repos} />
        }

        return (
            <div>
                <div className="search__area">
                    <form className="search__form">
                        <div className="form-control">
                            <label htmlFor="query">Search Query</label>
                            <input 
                                type="text" 
                                id="query" 
                                name="searchQuery"
                                value={this.state.searchQuery} 
                                onChange={this.handleChange}
                            />
                        </div>                        
                    </form>
                    <button className="btn" onClick={this.fetchAllRepos}>Search</button>                     
                </div>

                <div className="search-result__content">
                    {content}
                </div>
            </div>            
        )
    }
}

export default RepoSearch;