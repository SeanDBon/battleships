export type User = {
    id: string,
    username: string,
    socket: any,
}

export type NewUser = {
    username: string,
    roomId?: string,
    roomName?: string,
    isSpectating?: boolean,
}

export type Room = {
    id: string,
    name: string,
    playerOne: User,
    playerTwo: User,
    spectators: User[],
    game: Game,
}

export type Ship = {
    name: string,
    isDestroyed: boolean,
    part1: ShipPart,
    part2: ShipPart
    part3?: ShipPart,
    part4?: ShipPart,
    part5?: ShipPart,
}

export type ShipPart = {
    posX: number,
    posY: number,
    isHit: boolean,
    hitBy: Attack,
}

export enum Attack {
    MISSLE = "MISSLE",
    TORPEDO = "TORPEDO",
}

export enum BoardTile {
    EMPTY = "EMPTY",
    HIT = "HIT",
    MISS = "MISS",
    SCANNED = "SCANNED"
}

export enum GameState {
    WAITING_FOR_PLAYER_TWO = "WAITING_FOR_PLAYER_TWO",
    WAITING_FOR_BOAT_PLACEMENTS = "WAITING_FOR_BOAT_PLACEMENTS",
    GAME_START = "GAME_START",
    GAME_PLAYING = "GAME_PLAYING",
    GAME_OVER = "GAME_OVER",
}

export type Game = {
    gameState: GameState,
    playerOneShips: Ship[],
    playerTwoShips: Ship[],
    playerOneAttackBoard: object,
    playerTwoAttackBoard: object,
}

export const emptyAttackBoard = {
    1:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    2:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    3:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    4:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    5:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    6:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    7:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    8:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    9:  {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
    10: {1: BoardTile.EMPTY, 2: BoardTile.EMPTY, 3: BoardTile.EMPTY, 4: BoardTile.EMPTY, 5: BoardTile.EMPTY, 6: BoardTile.EMPTY, 7: BoardTile.EMPTY, 8: BoardTile.EMPTY, 9: BoardTile.EMPTY, 10: BoardTile.EMPTY},
}
