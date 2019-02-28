import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Timeline.css';
import api from '../services/api';

import Tweet from '../components/Tweet';
import socket from 'socket.io-client';


export default class Timeline extends Component {
    state = {
        newTweet:"",
        tweets:[]
    };

    async componentDidMount() {
        this.subscribeToEvents();
        const dados = await api.get('tweets');

        this.setState({ tweets : dados.data });
    };


    subscribeToEvents = () =>{
        const io = socket('https://node-api-danielstackjs.herokuapp.com/');

        io.on('tweet', data =>{
           this.setState({ tweets: [data, ...this.state.tweets]});
        });

        io.on('like', data =>{
            this.setState(
                {
                     tweets: this.state.tweets.map(r=> r._id === data._id ? data : r )
                });
        });

    };

    handleNewTweet = async e =>{

        if(e.keyCode !== 13)return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        await api.post('tweets', {content: content, author: author});

        this.setState({newTweet : '' })
      //  console.log(content , author);

    };
    handleInputChange = e => {
        this.setState({ newTweet: e.target.value});

    }
  render() {
    return (
        <div className="timeline-wrapper">
            <img height={24} src={twitterLogo} alt="GoTwwiter"/>

        <form>
            <textarea
                value={this.state.newTweet}
                onChange={this.handleInputChange}
                onKeyDown={this.handleNewTweet}
                placeholder="O que está acontecendo?"
                />
        </form> 
        <ul className="tweet-list">
        {
             this.state.tweets.map( t => 
            (
               <Tweet key={t._id}  data={t} />     
            )) 
            
        }
            </ul>
        </div>


    );
  }
}
