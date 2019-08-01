import React from 'react';
import "./RepoItem.css";

const RepoItem = props => {
    return <li className="repo__list-item">
        <div className="repo__list-item-info">
            <h3>{props.name}</h3>
            <h4>{props.description}</h4>
            <p>WRITTEN IN: {props.language}</p>
            <p>STARS: {props.star}</p>
        </div>
        <div className="repo__list-item-image">
            <img src={props.owner.avatar_url} alt={props.owner.login} />
            <h2>{props.owner.login}</h2>
        </div>
    </li>
	
};

export default RepoItem;
