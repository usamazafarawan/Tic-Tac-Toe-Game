import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPlayer: 'X' | 'O' = 'X';
  board: any = [['', '', ''], ['', '', ''], ['', '', '']];
  winner: string | null = null;

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner(row, col);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner(row: number, col: number) {
    const player = this.board[row][col];
    if (
      this.board[row][0] === player &&
      this.board[row][1] === player &&
      this.board[row][2] === player
    ) {
      this.winner = player;
    }
    else if (
      this.board[0][col] === player &&
      this.board[1][col] === player &&
      this.board[2][col] === player
    ) {
      this.winner = player;
    }
    else if ((row === col || row + col === 2) &&
      ((this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) ||
       (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player))
    ) {
      this.winner = player;
    }

    if (!this.winner && this.isBoardFull()) {
      this.winner = 'None';
    }
  }
  isBoardFull(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === '') {
          return false;
        }
      }
    }
    return true;
  }
  resetGame() {
    this.currentPlayer = 'X';
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.winner = null;
  }}
