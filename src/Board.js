// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {
  /* eslint-disable */
  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:')
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;')
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;')
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')))
      } else {
        this.set('n', params.length)
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex)
      }, this)
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex]
      this.trigger('change')
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts()
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      )
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts()
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        rowIndex >= 0 && rowIndex < this.get('n') &&
        colIndex >= 0 && colIndex < this.get('n')
      )
    },
    /* eslint-enable */

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /* =========================================================================
    =                 TODO: fill in these Helper Functions                    =
    ========================================================================= */

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      let targetArr = this.attributes[rowIndex];
      let count = 0;
      for(let i = 0; i < targetArr.length; i++){
        if(targetArr[i]){
          count++;
        }
        if(count > 1){
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      let hasconflict = false;
      for(let key in this.attributes){
        if (key === "n") {
          continue;
        }
        if(this.hasRowConflictAt.call(this, key)){
          hasconflict = true;
          break;
        }
      }
      return hasconflict;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      let count = 0;
      for (let key in this.attributes) {
        if (key === "n") {
          continue
        }
        if (this.attributes[key][colIndex]) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      let hasconflict = false;
      for (let key in this.attributes) {
        if (key === "n") {
          continue
        }
        if (this.hasColConflictAt.call(this, key)) {
          hasconflict = true;
          break;
        }
      }
      return hasconflict;

      /*
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;*/
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    /**
     * 새로운 변수를 0으로 선언, attrigutes의 n이 0보다 작을 때 까지 : while문을 돌리기
     * 
     * i, j
     * 0, x
     * 1, x+1
     * 2, x+2
     * 3, x+3
     * .. ...
     * n-1 n-1
     * 
     * 0이 들어옴 > 0,0 > 1,1 > 2,2 > 3,3
     * 1이 들어옴 > 0,1 > 1,2 > 2,3 > (3,4)
     * 2 > 0,2 > 1,3 > (2, 4)
     * 3 > 0,3 > (1,4)
     * j > 0, j > 1, j+1 > 2,j+2 ... > n-1,n-1
     * 
     */
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // console.log('majorDiagonalColumnIndexAtFirstRow',majorDiagonalColumnIndexAtFirstRow)
      let count = 0;
      let i = 0;
      let j = majorDiagonalColumnIndexAtFirstRow;
      while (i < this.attributes.n && j !== this.attributes.n) {
        if (this.attributes[i][j]) {
          count++;
        }
        if(count > 1) {
          return true;
        }

        i++;
        j++;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      let hasMagorDiagnal = false;
      for (let i = -this.attributes.n + 1; i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          hasMagorDiagnal = true;
        }
      }

      return hasMagorDiagnal;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    /**
     * 0 > (0,0)
     * 1 > (0,1) > (1,0)
     * 2 > (0,2) > (1,1) > (2,0)
     * 3 > (0,3) > (1,2) > (2,1) > (3,0)
     */
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let attributes = this.attributes;
      let count = 0;
      let i = 0;
      let j = minorDiagonalColumnIndexAtFirstRow;

      while (i < attributes.n && j >= 0) {

        if (attributes[i][j]) {
          count++;
        }
        if(count > 1) {
          return true;
        }

        i++;
        j--;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      let hasMinorDiagnal = false;
      for (let i = 0; i < this.attributes.n * 2 - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          hasMinorDiagnal = true;
        }
      }

      return hasMinorDiagnal;
    }

    /* --------------------  End of Helper Functions  --------------------- */

  });
  /* eslint-disable */
  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0
      })
    })
  }
  /* eslint-enable */
}());
