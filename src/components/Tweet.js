import React, { Component } from 'react';

import './Tweet.css';
import like from '../like.svg';
import api from '../services/api';



export default class Tweet extends Component {

    handleLike = async () => {

        const { _id }  =  this.props.data; 

        await api.post('likes/'+_id);

    };
  render() {
    const { data } = this.props;

    return (
        <li className="tweet">
            <strong>{data.author}</strong>
            <p>{data.content}</p>
            <button type="button" onClick={this.handleLike}>
            <img src={like} alt ="like"/>
            {data.likes}
            </button>
        </li>


    );
  }
}
