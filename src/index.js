import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      selectedPiece: null,
    };
  }

  currentPlayer() {
    this.state.xIsNext ? 'X' : 'O';
  }

  takeTurn(squares, addPiece, removePiece) {
    if (addPiece) {
      squares[addPiece] = this.currentPlayer();
    }
    if (removePiece) {
      squares[removePiece] = null;
    }

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: stepNumber + 1,
      xIsNext: !this.state.xIsNext,
    });
  }

  tictactoe(squares, i) {
    if (!squares[i]) {
      this.takeTurn(squares, i);
    }
  }

  selectPiece(i, boardPiece) {
  }

  movePiece(squares, i) {

  }

  choruslapilli(squares, i) {
    const boardPiece = squares[i];
    if (boardPiece) {
      this.selectPiece(i, boardPiece);
      return;
    }
    this.movePiece(squares, i);
  }

  handleClick(i) {
    const history = this.state.history
      .slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)) {
      return;
    }

    if (this.state.stepNumber <= 6) {
      this.tictactoe(squares, i);
      return;
    }
    this.choruslapilli(squares, i);
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + this.currentPlayer();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
