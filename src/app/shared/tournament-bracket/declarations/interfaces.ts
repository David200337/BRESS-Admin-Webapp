export interface Tournament {
    rounds: Round[];
  }
  
  export interface Round {
    /**
     * The type determines where in which branch to place a match.
     * SingleElimination-Trees only consist of a winnerbracket and a final
     */
    type: 'Winnerbracket' | 'Loserbracket' | 'Final';
    matches: any[];
  }
  