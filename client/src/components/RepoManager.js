import React from 'react';
import RepoList from "./Repositories/components/RepoList";
import RepoItem from "./Repositories/components/RepoItem";
import axios from "axios";
import SearchBar from "./SearchBar";

function searchingFor(searchTerm) {
  if (!searchTerm) return () => false;

  let searchLetters = searchTerm.split("").slice(0,-1).join("")

  return function(x) {
    //   console.log("Object coming in", x)
    //   console.log("letters", searchLetters)
    return x.description.toLowerCase().includes(searchLetters.toLowerCase())
  }
    
}

class RepoManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            loading: false,
            repos: [],
            sortButtons: false,
            sortAscending: true,
            fuzzySearch: false,
            fuzzyValue: ""
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
                sortButtons: true,
                fuzzySearch: true
            });
		})
        .catch(err => {
			console.log(err);
		})
    }

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

    handleFuzzySearch = (fuzzyValue) => {
        this.setState({
            fuzzyValue: fuzzyValue
        })
    }

    render() {
        const repos = this.state.repos;
        let content;

        if (repos) {
            content = (<div className="search-result__content">
                        <RepoList repos={repos} />
                        </div>)
        }

        if (this.state.fuzzyValue) {
            let repoArray = this.state.repos;
            content = repoArray.filter(searchingFor(this.state.fuzzyValue)).map(object => {
                return <RepoItem 
                    key={object.id}
                    name={object.name}
                    description={object.description}
                    language={object.language}
                    star={object.stargazers_count}
                    owner={object.owner}
                />
            })
        }

        return (
            <div>
                <div className="intro__section">
                    <h1>Discover New Repositories.</h1>
                    <h2>Stare at new code. Stalk people you've never met</h2>
                </div>
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
                {this.state.fuzzySearch && <SearchBar onFuzzySearch={this.handleFuzzySearch}/>}

                
                
                {content}
            </div>            
        )
    }
}

export default RepoManager;

// {this.state.fuzzyValue && (
//     repoArray = this.state.repos
// )}