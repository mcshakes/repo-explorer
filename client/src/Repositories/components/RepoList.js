import React from 'react';
import RepoItem from "./RepoItem";

const RepoList = props => {
    
    const repos = props.repos.map(repo => {
        return <RepoItem 
                    key={repo.id}
                    name={repo.name}
                    description={repo.description}
                    language={repo.language}
                    star={repo.stargazers_count}
                    owner={repo.owner}
                />

    })

    return <ul className="repo__list"> { repos } </ul>
	
};

export default RepoList;