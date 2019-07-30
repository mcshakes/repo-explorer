import React from 'react';
import RepoList from "./components/RepoList";
import axios from "axios";

class RepoManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            loading: false,
            repos: [],
            sortButtons: false,
            sortAscending: true
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
                loading: false,
                sortButtons: true
            });
		})
        .catch(err => {
			console.log(err);
		})
    }

    // sortStarsAscending = () => {
    //     this.setState(prevState => {
    //         return this.state.repos.sort((a, b) => (a.stargazers_count - b.stargazers_count))
    //     })
    // }

    // sortStarsDescending = () => {
    //     this.setState(prevState => {
    //         return this.state.repos.sort((a, b) => (b.stargazers_count - a.stargazers_count))
    //     })
    // }

    sortByStars = () => {
        let sortedData = this.state.repos.sort((a, b) => {
            if (this.state.sortAscending) {
                return a.stargazers_count - b.stargazers_count
            } else {
                return b.stargazers_count - a.stargazers_count
            }
        })

        this.setState({
            sortAscending: !this.state.sortAscending,
            data: sortedData
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
                            
                            <input 
                                type="text" 
                                id="query" 
                                name="searchQuery"
                                className="question"
                                value={this.state.searchQuery} 
                                onChange={this.handleChange}
                            />
                            <label htmlFor="query"><span>What are you looking for?</span></label>
                        </div>                        
                    </form>
                    <button className="btn" onClick={this.fetchAllRepos}>Search</button>                     
                </div>
                {this.state.sortButtons && (
                    <div className="search-result__actions">
                        <button 
                            className="btn"
                            onClick={this.sortByStars}
                        >
                            Sort By Stars
                        </button>
                    </div>                    
                )}
                <div className="search-result__content">
                    {content}
                </div>
            </div>            
        )
    }
}

export default RepoManager;