import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* comment subclass, then transform into what we call "function component"
class Square extends React.Component {
  render() {
    return (
      <button 
        className = "square" 
        onClick = {() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}*/
  //function component
  function Square(props){
    return (
      <button className = "square" onClick = {props.onClick}>
        <div className = "content">
        {props.value}
        </div>
      </button>
    );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return <Square 
                value = {this.props.squares[i]} 
                onClick = {() => this.props.onClick(i)}
              />;
    }
  
    render() {
  
      return (
        <div>
          <div></div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xTurn: true,
        step: 0
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0,this.state.step+1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.evaluateGame(squares) !== "NOT EMPTY"){
        this.setState({
          history: [{
            squares: Array(9).fill(null),
          }],
          step: 0,
          xTurn: true
        });
      }
      else if (squares[i] == null){
        squares[i] = (this.state.xTurn) ? 'X' : 'O'; //good old if-else can also be used
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          step: history.length,
          xTurn: !this.state.xTurn
        });
      }  
    }

    /*undoClick(hist, curr){
      for(i in hist){
        if(i === curr){
          this.setState({
            history: history.concat([{
              squares: squares,
            }]),
            xTurn: !this.state.xTurn
          });
        }
      }
    }*/

    evaluateGame(squares){
      let full = "TIED";
      //column check
      for(let i = 0; i <= 2; i++){
        if(squares[i] != null && squares[i] === squares[i+3] && squares[i+3] === squares[i+6]) return (squares[i] + ' WON');
      }
      //row check
      for(let i = 0; i <= 6; i += 3){
        if(squares[i] == null || squares[i+1] == null || squares[i+2] == null) full = "NOT EMPTY";
        if(squares[i] != null && squares[i] === squares[i+1] && squares[i+1] === squares[i+2]) return (squares[i] + ' WON');
      }
      //diagonal check
      for(let i = 8; i >= 6; i -= 2){
        if(squares[i] != null && squares[i] === squares[4] && squares[4] === squares[i%4]) return (squares[i] + ' WON');
      }
      return full;
    }

    timeTravel(i){
      this.setState({
        history: this.state.history,
        step: i ? (this.state.step + 1) : (this.state.step - 1),
        xTurn: !this.state.xTurn
      });
    }

    prevArrow(){
      return (this.state.step > 0) ?
        <button onClick={() => this.timeTravel(0)}>
          Undo
        </button>
        :
        <button className='strikethrough'>
          Undo
        </button>
    }

    nextArrow(){
      return (this.state.history.length !== this.state.step+1) ?
        <button onClick={() => this.timeTravel(1)}>
          Redo
        </button>
        :
        <button className='strikethrough'>
          Redo
        </button>
    }

    render() {
      console.log("render is called");
      const history = this.state.history;
      const current = history[this.state.step];
      const winner = this.evaluateGame(current.squares);
      //let status = ;

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
              {this.prevArrow()}
              <div>{(winner !== "NOT EMPTY") ? winner + ' 🤯🤯🤯': 'Current player: ' + (this.state.xTurn ? 'X' : 'O')}</div>
              {this.nextArrow()}
            {/*<div>{status}</div>*/}
            <div className="board-row">
              <div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  