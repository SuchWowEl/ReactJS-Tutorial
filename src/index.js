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
        <div class = "content">
          {props.value}
        </div>
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xTurn: true,
      };
    }

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

    handleClick(i){
      const squares = this.state.squares.slice();
      if (this.evaluateGame(squares) !== "NOT EMPTY"){
        this.setState({
          squares: Array(9).fill(null),
          xTurn: true
        });
      }
      else if (squares[i] == null){
        squares[i] = (this.state.xTurn) ? 'X' : 'O'; //good old if-else can also be used
        this.setState({
          squares: squares,
          xTurn: !this.state.xTurn
        });
      }  
    }

    renderSquare(i) {
      return <Square 
                value = {this.state.squares[i]} 
                onClick = {() => this.handleClick(i)}
              />;
    }
  
    render() {
      const winner = this.evaluateGame(this.state.squares);
      let status = (winner !== "NOT EMPTY") ? winner + ' 🤯🤯🤯': 'Current player: ' + (this.state.xTurn ? 'X' : 'O');
      //const status = 'Current player: ' + (this.state.xTurn ? 'X' : 'O');
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  