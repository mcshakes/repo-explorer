import React from 'react';
import "./RepoItem.css";

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
        <div className="repo__list-item-image">
            <img src={props.owner.avatar_url} alt={props.owner.login} />
        </div>
    </li>
	
};

export default RepoItem;
