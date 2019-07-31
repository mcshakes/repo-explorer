import React from 'react';
import RepoItem from "./RepoItem";
import "./RepoList.css";

class RepoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtered: []
        }
    }

    componentDidMount() {
        this.setState({
            filtered: this.props.repos
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.repos
        });
      }

    handleChange = (e) => {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.props.repos;

            newList = currentList.filter(repo => {
                
                if (repo.description === null) {
                    return false
                }
                const repoLowered = repo.description.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return repoLowered.includes(filter);
            });

        } else {
            newList = this.props.repos;
        }

        this.setState({
            filtered: newList
        });
    }
     
    render() {

        const repos = this.state.filtered.map(repo => {
            return <RepoItem 
                        key={repo.id}
                        name={repo.name}
                        description={repo.description}
                        language={repo.language}
                        star={repo.stargazers_count}
                        owner={repo.owner}
                    />
    
        })

        return (
            <div>
                <div>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Search..." 
                        onChange={this.handleChange}
                        />
                </div>
                <ul className="repo__list"> { repos } </ul>
            </div>
            
        )
    }
    
	
};

export default RepoList;