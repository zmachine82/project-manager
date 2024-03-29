export class TicTacToeBoard {


  empty = true
  state: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'x'
  moveCounter = 0
  didSomeoneWin = false;

  isEmpty(): boolean {
    return this.empty;
  }

  playMove(move: string) {
    this.empty = false
    const square = this.findSquare(move)
    if (!square.canPlay()) {
      return
    }
    this.state[square.row][square.column] = this.currentPlayer

    this.didSomeoneWin = this.checkForWin()

    if (this.didSomeoneWin) {
      return
    }


    this.switchPlayers()
    this.moveCounter++

  }

  checkForWin(): boolean {

    // horizontal win
    for (const row of this.state) {
      const didXWin = row.every(column => column == 'x')
      const didOWin = row.every(column => column == 'o')
      if (didXWin || didOWin) {
        return true
      }
    }

    // vertical win
    const firstColumns = this.state.map(x => x[0])
    const secondColumns = this.state.map(x => x[1])
    const thirdColumns = this.state.map(x => x[2])

    const didXWinFirstColumn = firstColumns.every(column => column == 'x')
    const didOWinFirstColumn = firstColumns.every(column => column == 'o')
    if (didXWinFirstColumn || didOWinFirstColumn) {
      return true
    }

    const didXWinsecondColumns = secondColumns.every(column => column == 'x')
    const didOWinsecondColumns = secondColumns.every(column => column == 'o')
    if (didXWinsecondColumns || didOWinsecondColumns) {
      return true
    }

    const didXWinthirdColumns = thirdColumns.every(column => column == 'x')
    const didOWinthirdColumns = thirdColumns.every(column => column == 'o')
    if (didXWinthirdColumns || didOWinthirdColumns) {
      return true
    }

    return false
  }

  gameOver(): any {
    return this.didSomeoneWin || this.moveCounter > 8
  }

  private findSquare(move: string): Square {
    if (move == 'top-left') {
      return new Square(this.state[0][0], 0, 0)
    } else if (move == 'top-middle') {
      return new Square(this.state[0][1], 0, 1)
    }
    else if (move == 'top-right') {
      return new Square(this.state[0][2], 0, 2)
    }
    else if (move == 'left') {
      return new Square(this.state[1][0], 1, 0)
    }
    else if (move == 'middle') {
      return new Square(this.state[1][1], 1, 1)
    }
    else if (move == 'right') {
      return new Square(this.state[1][2], 1, 2)
    }
    else if (move == 'bottom-left') {
      return new Square(this.state[2][0], 2, 0)
    }
    else if (move == 'bottom-middle') {
      return new Square(this.state[2][1], 2, 1)
    }
    else if (move == 'bottom-right') {
      return new Square(this.state[2][2], 2, 2)
    } else {
      throw new Error('how did you get here, this is not a vlaid move')
    }


  }

  private switchPlayers() {
    this.currentPlayer == 'x' ? this.currentPlayer = 'o' : this.currentPlayer = 'x'
  }
}






class Square {
  constructor(public state: string, public row: number, public column: number) {

  }

  canPlay() {
    return this.state == ''
  }
}
