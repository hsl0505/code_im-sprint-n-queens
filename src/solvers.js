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
  var solution = [];

  let firstmatrix = {};
  for (let i=0; i<n; i=i+1) {
    firstmatrix[i] = Array(n).fill(0);
  }

  let board = new Board(firstmatrix);

  function recursion(row, depth) {
    if (depth === n) {
      return board.attributes;
    }

    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)
      if (!board.hasAnyColConflicts()) {
        return recursion(row +1, depth +1)
      }
      board.togglePiece(row, col)
    } 
  }
  
  let temp = recursion(0,0);  // 이중 배열로 바꾸기
  
  for (let key in temp) {
    if (key === "n") {
      continue;
    }
    solution.push(temp[key])
  }

  /*
  solution = [];
  for (let i=0; i<n; i=i+1) {
    solution[i] = Array(n).fill(0);
    solution[i][i] = 1;
  }
  */
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
  
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;
  

  let firstmatrix = {};
  for (let i=0; i<n; i=i+1) {
    firstmatrix[i] = Array(n).fill(0);  // 빈 매트릭스 생성 (백본 메쏘드 적용하기위한)
  }

  let board = new Board(firstmatrix); // 빈 보드 생성

  function recursion(row, depth) {
    if (depth === n) { // 탈출 조건
      return solutionCount++;
    }
    
    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)   // 0,0 d:0

      if (!board.hasAnyColConflicts()) { // 보드의 상태가 컬럼 충돌이 없을 경우 리커젼 돌아감, 있으면 안돌아감
        recursion(row +1, depth +1)  // 1,0 d: 1
      }
      
      board.togglePiece(row, col) // 지우는것??!
    } 
  }
  
  for (let col = 0; col < Math.floor(n/2); col++) {
    board.togglePiece(0,col)   // 0,0 d:0
    recursion(1,1)
    board.togglePiece(0,col);
  }
  solutionCount *= 2;

  if(n % 2) {
    board.togglePiece(0,Math.round(n/2));
    recursion(1,1)
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) { //n = 0
  var solution = [];
  let tmpSolution = 0;
  let board = new Board({n: n}); // 빈 보드 생성

  function recursion(row, depth) { // 0, 0
    if (depth === n) { // 탈출 조건
      tmpSolution = JSON.parse(JSON.stringify(board.attributes));  //{n: 0}
      return;
    }
    
    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)   // 0,0 d:0

      if (!board.hasAnyQueensConflicts()) { // 보드의 상태가 충돌이 없을 경우 리커젼 돌아감, 있으면 안돌아감
        recursion(row +1, depth +1)  // 1,0 d: 1
      }
      
      board.togglePiece(row, col) // 지우는것??!
    } 
  }

  recursion(0,0);

  if (typeof tmpSolution === 'object') {
    for (let key in tmpSolution) {
      if (key === "n") {
        continue;
      }
      solution.push(tmpSolution[key])
    }
  }
  if (tmpSolution === 0) {
    solution = {n:n};
  }
  else {
    solution = {n:n};
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; // fixme

  let board = new Board({n: n}); // 빈 보드 생성

  function recursion(row, depth) {
    if (depth === n) { // 탈출 조건
      return solutionCount++;
    }
    
    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)   // 0,0 d:0

      if (!board.hasAnyQueensConflicts()) { // 보드의 상태가 충돌이 없을 경우 리커젼 돌아감, 있으면 안돌아감
        recursion(row +1, depth +1)  // 1,0 d: 1
      }
      
      board.togglePiece(row, col) // 지우는것??!
    } 
  }
  
  recursion(0,0); // fixme

  return solutionCount;
};
