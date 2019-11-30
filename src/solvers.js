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
  let tmpSolution = 0;

  let board = new Board( {n : n} );

  function recursion(row, depth) {
    if (depth === n) {
      tmpSolution = JSON.parse(JSON.stringify(board.attributes))
      return ;
    }

    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)
      if (!board.hasAnyColConflicts()) {
        recursion(row +1, depth +1)
      }
      board.togglePiece(row, col)
    } 
  }
  
  recursion(0,0);  // 이중 배열로 바꾸기
  
  if (tmpSolution !== 0) {
    for (let key in tmpSolution) {
      if (key === "n") {
        continue;
      }
      solution.push(tmpSolution[key])
    }
  }
  else {
    solution = {n:n}
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
  
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  let board = new Board( {n : n} ); // 빈 보드 생성

  function recursion(row, depth) {
    if (depth === n) { // 탈출 조건
      return solutionCount++; // 리턴이 이거라기보다는 끝나는 조건을 달아준 것!! 끝내고, 카운트 ++ 시키기
    }
    
    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)   

      if (!board.hasAnyColConflicts()) { // 보드의 상태가 컬럼 충돌이 없을 경우 리커젼 돌아감, 있으면 안돌아감
        recursion(row +1, depth +1)  
      }
      
      board.togglePiece(row, col) // 지우는것??!
    } 
  }
  
  
  for (let col = 0; col < Math.floor(n/2); col++) {  // 시간복잡도를 줄이기 -> 대칭을 이용한 가짓수 반으로 줄이기
    board.togglePiece(0,col)   
    recursion(1,1)
    board.togglePiece(0,col);
  }
  solutionCount *= 2;  // 대칭이라서 2배

  if(n % 2) {          // n이 홀수인 경우 가운데 줄만 따로 해주기
    board.togglePiece(0,Math.round(n/2));
    recursion(1,1)
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) { 
  var solution = [];
  let tmpSolution = 0;
  let board = new Board({n: n}); // 빈 보드 생성

  function recursion(row, depth) {
    if (depth === n) { // 탈출 조건
      tmpSolution = JSON.parse(JSON.stringify(board.attributes));
      return ;
    }
    
    for (let col = 0; col<n; col++) {
      board.togglePiece(row,col)  

      if (!board.hasAnyQueensConflicts()) { // 보드의 상태가 충돌이 없을 경우 리커젼 돌아감, 있으면 안돌아감
        recursion(row +1, depth +1) 
      }

      board.togglePiece(row, col) // 지우는것??!
    } 
  }

  recursion(0,0);

  if (tmpSolution !== 0 /*typeof tmpSolution === 'object'*/) {
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
      board.togglePiece(row,col)  

      if (!board.hasAnyQueensConflicts()) { // 보드의 상태가 충돌이 없을 경우 리커젼 돌아감, 있으면 안돌아감
        recursion(row +1, depth +1)  
      }
      
      board.togglePiece(row, col) // 지우는것??!
    } 
  }
  
  recursion(0,0); // fixme

  console.log('Number of solutions for ' + n + ' queens :', solutionCount);

  return solutionCount;
};
