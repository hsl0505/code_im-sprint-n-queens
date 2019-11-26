/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var solution = undefined; // fixme
  
  solution = [];
  for (let i=0; i<n; i=i+1) {
    solution[i] = Array(n).fill(0);
    solution[i][i] = 1;
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
  
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; // fixme
  

  let firstmatrix = {};
  for (let i=0; i<n; i=i+1) {
    firstmatrix[i] = Array(n).fill(0);
  }

  let board = new Board(firstmatrix);

  function recursion(row, depth) {
    if (depth === n) {
      return solutionCount++;
    }

    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)
      if (!board.hasAnyColConflicts()) {
        recursion(row +1, depth +1)
      }
      board.togglePiece(row, col)
    } 
  }
  
  recursion(0,0)



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; // fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; // fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
