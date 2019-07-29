import React from 'react';

const RepoItem = props => {
    return <li className="repo__list-item">
        <div>
            <h3>{props.name}</h3>
            <h4>{props.description}</h4>
        </div>
        <div>
            <p>WRITTEN IN: {props.language}</p>
            <p>STARS: {props.star}</p>
        </div>

    </li>
	
};

export default RepoItem;
