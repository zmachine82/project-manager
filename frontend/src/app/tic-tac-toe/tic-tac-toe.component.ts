import { Component, OnInit } from '@angular/core';
import { TicTacToeBoard } from './TicTacToeBoard';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  board!: TicTacToeBoard;


  ngOnInit(): void {
    this.board = new TicTacToeBoard();
  }



}
