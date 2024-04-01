import { TicTacToeBoard } from "./TicTacToeBoard"

describe('the board', () => {

  it('should be empty on start', () => {
    const board = new TicTacToeBoard()
    expect(board.isEmpty()).toBe(true)
  })

  it('should not be empty after a move is played', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    expect(board.isEmpty()).toBe(false)
  })

  it('should mark first move as X', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    expect(board.state).toEqual([
      ['x', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
  })
  it('should mark 2nd move as O', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    board.playMove('top-middle')
    expect(board.state).toEqual([
      ['x', 'o', ''],
      ['', '', ''],
      ['', '', '']
    ])
  })

  it('should mark moves in turn', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-middle')
    board.playMove('top-left')
    expect(board.state).toEqual([
      ['o', 'x', ''],
      ['', '', ''],
      ['', '', '']
    ])
  })

  it('should not be able to play same move again', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    board.playMove('top-left')
    expect(board.state).toEqual([
      ['x', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
  })

  it('should end the game, after all the spaces are filled', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    board.playMove('top-middle')
    board.playMove('top-right')

    board.playMove('middle')
    board.playMove('right')
    board.playMove('left')

    board.playMove('bottom-left')
    board.playMove('bottom-right')
    expect(board.gameOver()).toBe(false)
    board.playMove('bottom-middle')
    expect(board.gameOver()).toBe(true)

    expect(board.state).toEqual([
      ['x', 'o', 'x'],
      ['o', 'o', 'x'],
      ['x', 'x', 'o']
    ])
  })



  it('should end the game, after someone wins horizontally', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    board.playMove('left')
    board.playMove('top-middle')
    board.playMove('middle')
    expect(board.gameOver()).toBe(false)
    board.playMove('top-right')
    expect(board.gameOver()).toBe(true)
    expect(board.state).toEqual([
      ['x', 'x', 'x'],
      ['o', 'o', ''],
      ['', '', '']
    ])
  })

  it('should end the game, after someone wins vertically', () => {
    const board = new TicTacToeBoard()
    board.playMove('top-left')
    board.playMove('top-middle')
    board.playMove('left')
    board.playMove('middle')
    expect(board.gameOver()).toBe(false)
    board.playMove('bottom-left')
    expect(board.gameOver()).toBe(true)
    expect(board.state).toEqual([
      ['x', 'o', ''],
      ['x', 'o', ''],
      ['x', '', '']
    ])
  })


})
