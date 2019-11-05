import React, { useState, useCallback } from 'react';
import pRetry from 'p-retry';
import fetch from 'node-fetch';

import {createLeaderBoard, finishGame, checkMatch, setCards, shuffle, getLeaderBoard} from '../../services/game/GameService'

import List from '../../components/List/List'

const DeckOfGames = () => {
  const [loading, setLoading] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [leaders, setLeaders] = useState([]);

  const runFetchCards = useCallback(async () => {
    const response = await fetch('http://localhost:8080/api/v1/deck/create', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.status === 404) {
      throw new pRetry.AbortError(response.message);
    }
    return response.json();
  });

  const handleClick = (name, index) => {
    console.log(name, index, openedCards.length)
    if (openedCards.length == 2) {
      setTimeout(() => {
        check();
      }, 750);
    } else {
      setMoves(moves +1);
      let selected = {
        name,
        index,
      };
      const finalCards  = [...finalizedCards];
      const oc = [...openedCards];
      finalCards[index].close = false;
      oc.push(selected);
      setOpenedCards([...oc])
      setFinalizedCards([...finalCards])
      finishGame(finalCards)
      
      if (openedCards.length == 2) {
        setTimeout(() => {
          check();
        }, 750);
      }
    }
  }

  const addToLeaderBoard = () => {
    const loggedUsers = localStorage.getItem('users');
    const currentUserStr = localStorage.getItem('currentUser');
    const userList = loggedUsers ? JSON.parse(loggedUsers) : [];
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : {};

    userList.map(user => {
      if(user.email == currentUser.email){
        user.moves = moves;
      }
    })
    setLeaders(userList);
    localStorage.setItem('users', JSON.stringify(userList));
  }

  const finishGame = (fc) => {
    let isFinished = true
    fc.map(cards => {
      if(cards.close == true){
        isFinished = false;
      }
    });
    if(isFinished) {
      addToLeaderBoard();
    }
    setIsFinished(isFinished);
  }

  const check = () => {
    const finalCards  = finalizedCards;
    const oc = openedCards;
    if ((oc[0].name == oc[1].name) && (oc[0].index != oc[1].index)) {
      finalCards[oc[0].index].complete = true;
      finalCards[oc[1].index].complete = true;
    } else {
      finalCards[oc[0].index].close = true;
      finalCards[oc[1].index].close = true;
    }
    setFinalizedCards([...finalCards])
    setOpenedCards([])
    
  }

  const setCards = (cards) => {
    const cardList = [];
    cards.map((card, index) => {
      const {code, image} = card;
      cardList.push({
        name: code,
        image,
        close: true,
        complete: false,
      });
      cardList.push({
        name: code,
        image,
        close: true,
        complete: false,
      });
    });
    const makeDuplicate = [...cardList];
    setFinalizedCards([...makeDuplicate]);
  }
  

  const shuffle = (array)  => {
    let currentIndex = array.length; 
    let temporaryValue; 
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const resetState = () => {
    setFinalizedCards([])
    setOpenedCards([])
    setMoves(0)
    setShowLeaderBoard(false)
    setIsFinished(false)
    setLeaders([])
  }

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    resetState()
    const resData = await pRetry(runFetchCards);
    const cards = resData.response.data.cards;
    setCards(cards);
    setLoading(false);
  }, [runFetchCards])

  return (
    <div >
    <button className="btn_card" onClick={()=>{fetchUsers()}}>Load Cards</button>
    <button className="btn_board" onClick={()=>{setShowLeaderBoard(true)}}>Leader Board</button>
    <div className="lbl_moves">Your moves : {moves}</div>
    { isFinished === true ?  <div className="lbl_moves">Wow, you've done it! : {moves}</div> : ''}

    {!loading ? (
        <div className="playground">
          {finalizedCards.map(({ close, complete, name, image }, index) => {
            return (
                <div className={`card${!close ? ' opened' : ''}${complete ? ' matched' : ''}`} onClick={() => {handleClick(name, index)}}>
                  <div className="front">
                    ?
                  </div>
                  <div className={!close ? '':"back"}>
                    <img style={{width:'44%'}} src={image} style={{position: 'absolute',top: '2px',height: 'auto',left: 7, width: "84%"}}/>
                  </div>
                </div> 
            )
          })}
        </div>
    ) : (<div className="spinner">
      <span className="spinner__container"></span>
    </div>)
    }
    <br/><br/>
    <hr/>
    { showLeaderBoard ? <List items={leaders} /> : '' }
    </div>
  )
}

export default DeckOfGames;