class Square {
  constructor() {
    this.value = "";
    this.selected = false;
    this.currentTurn = false;
  }
}

class Board {
  constructor() {
    this.running = true;
    this.winner = null;
    this.turn = "White";
    this.countMoves = 0;
    this.clickStatus = "";
    this.selectedValue = "";
    this.selectedIndex = -1;
    this.squares = new Array(64).fill().map((x) => new Square());

    //Assigning each pieces in the game to their respective starting positions.

    //Starting position for White Pawn
    for (var i = 8; i <= 15; i++) {
      this.squares[i].value = "WP";
    }

    //Starting position for Black Pawn
    for (var i = 48; i <= 55; i++) {
      this.squares[i].value = "BP";
    }

    //Starting position for White Rook
    this.squares[0].value = "WR";
    this.squares[7].value = "WR";

    //Starting position for Black Rook
    this.squares[56].value = "BR";
    this.squares[63].value = "BR";

    //Starting position for White Horse
    this.squares[1].value = "WH";
    this.squares[6].value = "WH";

    //Starting position for Black Horse
    this.squares[57].value = "BH";
    this.squares[62].value = "BH";

    //Starting position for White Bishop
    this.squares[2].value = "WB";
    this.squares[5].value = "WB";

    //Starting position for Black Bishop
    this.squares[58].value = "BB";
    this.squares[61].value = "BB";

    //Starting position for White Queen
    this.squares[3].value = "WQ";

    //Starting position for Black Queen
    this.squares[59].value = "BQ";

    //Starting position for White King
    this.squares[4].value = "WK";

    //Starting position for Black King
    this.squares[60].value = "BK";

    //On load setting the 'currentTurn' value to all White coins as True 
    this.squares.forEach(square => {
      if (square.value[0] == "W")
        square.currentTurn = true;
    });
    //When the user clicks a piece for the first time the possible moves will be highlighted.
    //When the user clicks for the second time, it checks if the clicked location is one of the highlighted areas and moves the piece.
    this.click = function (i) {
      if (this.clickStatus == "" && this.squares[i].currentTurn) {
        if ((this.squares[i].selected = true)) {
        }
        this.squares[i].selected = true;
        this.selectedValue = this.squares[i].value;
        this.selectedIndex = i;

        //If selected piece is a white pawn
        if (this.squares[i].value == "WP") {
          if (this.squares[i + 8].value == "")
            this.squares[i + 8].selected = true;
          if (i >= 8 && i <= 15) this.squares[i + 16].selected = true;

          if (this.squares[i + 7].value[0] == "B")
            this.squares[i + 7].selected = true;

          if (this.squares[i + 9].value[0] == "B")
            this.squares[i + 9].selected = true;
        }

        //If selected piece is a black pawn
        if (this.squares[i].value == "BP") {
          if (this.squares[i - 8].value == "")
            this.squares[i - 8].selected = true;
          if (i >= 48 && i <= 55) this.squares[i - 16].selected = true;

          if (this.squares[i - 7].value[0] == "W")
            this.squares[i - 7].selected = true;

          if (this.squares[i - 9].value[0] == "W")
            this.squares[i - 9].selected = true;
        }

        //If selected piece is a white rook
        if (this.squares[i].value == "WR" || this.squares[i].value == "BR") {
          //A rook can move in all 4 directions.
          //Highlighting all possible moves in the Right direction
          for (var x = i + 1; x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x != 64; x++) {
            if (this.squares[x].value == "")
              this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Left direction
          for (var x = i - 1; x != -1 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55; x--) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Down direction
          for (var x = i + 8; x <= 63 && x <= 64 && x <= 65 && x <= 66 && x <= 67 && x <= 68 && x <= 69 && x <= 70; x = x + 8) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Up direction
          for (var x = i - 8; x != -8 && x != -7 && x != -6 && x != -5 && x != -4 && x != -3 && x != -2 && x != -1; x = x - 8) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }
        }

        if (this.squares[i].value == "WK" || this.squares[i].value == "BK") {
          //A King can move in all 4 directions.
          //Highlighting all possible moves in the Right direction
          var x = i + 1;
          if (x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x != 64) {
            if (this.squares[i + 1].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Left direction
          var x = i - 1;
          if (x != -1 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55) {
            if (this.squares[i - 1].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Down direction
          var x = i + 8;
          if (x != 64 && x != 65 && x != 66 && x != 67 && x != 68 && x != 69 && x != 70 && x != 71) {
            if (this.squares[i + 8].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Up direction
          var x = i - 8;
          if (x != -8 && x != -7 && x != -6 && x != -5 && x != -4 && x != -3 && x != -2 && x != -1) {
            if (this.squares[i - 8].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Top Left direction
          var x = i - 9;
          if (x >= 0 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55) {
            if (this.squares[i - 9].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Top Right direction
          var x = i - 7;
          if (x > 6 && x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56) {
            if (this.squares[i - 7].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Bottom Right direction
          var x = i + 9;
          if (x <= 63 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x != 64) {
            if (this.squares[i + 9].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Highlighting all possible moves in the Bottom Left direction
          var x = i + 7;
          if (x <= 63 && x != 55 && x != 47 && x != 39 && x != 31 && x != 23 && x != 15 && x != 7) {
            if (this.squares[i + 7].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

        }

        //Moves for Bishop
        if (this.squares[i].value == "WB" || this.squares[i].value == "BB") {
          //Highlighting all possible moves in the Bottom Right direction
          for (var x = i + 9; x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x <= 63; x = x + 9) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
            else
              break;
          }
          //Highlighting all possible moves in the Bottom Left direction
          for (var x = i + 7; x < 63 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55; x = x + 7) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
            else
              break;
          }
          //Highlighting all possible moves in the Top Right direction
          for (var x = i - 7; x > 0 && x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56; x = x - 7) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Top Left direction
          for (var x = i - 9; x >= 0 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55; x = x - 9) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
            else
              break;
          }
        }

        //Moves for Queen
        if (this.squares[i].value == "WQ" || this.squares[i].value == "BQ") {
          //Highlighting all possible moves in the Right direction
          for (var x = i + 1; x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x != 64; x++) {
            if (this.squares[x].value == "")
              this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Left direction
          for (var x = i - 1; x != -1 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55; x--) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Down direction
          for (var x = i + 8; x <= 63 && x <= 64 && x <= 65 && x <= 66 && x <= 67 && x <= 68 && x <= 69 && x <= 70; x = x + 8) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Up direction
          for (var x = i - 8; x != -8 && x != -7 && x != -6 && x != -5 && x != -4 && x != -3 && x != -2 && x != -1; x = x - 8) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }
          //Highlighting all possible moves in the Bottom Right direction
          for (var x = i + 9; x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x <= 63; x = x + 9) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }
          //Highlighting all possible moves in the Bottom Left direction
          for (var x = i + 7; x < 63 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55; x = x + 7) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }
          //Highlighting all possible moves in the Top Right direction
          for (var x = i - 7; x > 0 && x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56; x = x - 7) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }

          //Highlighting all possible moves in the Top Left direction
          for (var x = i - 9; x >= 0 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55; x = x - 9) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
              break;
            }
            else
              break;
          }
        }

        //Moves for Knight
        if (this.squares[i].value == "WH" || this.squares[i].value == "BH") {
          //Bottom Right 1
          var x = i + 10;
          if (x <= 63 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x != 17 && x != 25 && x != 33 && x != 41 && x != 49 && x != 57 && x != 56 && x != 65 && x != 73) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }


          }

          //Bottom Right 2
          var x = i + 17;
          if (x <= 63 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Bottom Left 1
          var x = i + 6;
          if (x <= 63 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55 && x != 63 && x != 6 && x != 14 && x != 22 && x != 30 && x != 38 && x != 46 && x != 54 && x != 62) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Bottom Left 2
          var x = i + 15;
          if (x <= 63 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 55 && x != 63) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Top Right 1
          var x = i - 6;
          if (x > 0 && x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48 && x != 56 && x != 9 && x != 17 && x != 25 && x != 33 && x != 41 && x != 49 && x != 57) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Top Right 2
          var x = i - 15;
          if (x > 0 && x != 8 && x != 16 && x != 24 && x != 32 && x != 40 && x != 48) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

          //Top Left 1
          var x = i - 10;
          if (x >= 0 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47 && x != 6 && x != 14 && x != 22 && x != 30 && x != 38 && x != 46 && x != 54 && x != 62) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }


          //Top Left 2
          var x = i - 17;
          if (x >= 0 && x != 7 && x != 15 && x != 23 && x != 31 && x != 39 && x != 47) {
            if (this.squares[x].value == "") this.squares[x].selected = true;
            else if ((this.selectedValue[0] == "W" && this.squares[x].value[0] == "B") || (this.selectedValue[0] == "B" && this.squares[x].value[0] == "W")) {
              this.squares[x].selected = true;
            }
          }

        }

        this.clickStatus = "pieceSelected";
      }
      else if (this.clickStatus == "pieceSelected") {
        //If chosen move is valid, then location of the piece will be updated
        if (this.squares[i].selected && i != this.selectedIndex) {
          if (this.squares[i].value == "" || ((this.squares[i].value[0] == "B" && this.selectedValue[0] == "W") || ((this.squares[i].value[0] == "W" && this.selectedValue[0] == "B")))) {
            this.squares[i].value = this.selectedValue;
            this.squares[this.selectedIndex].value = "";
            this.squares[i].selected = false;

            //Making all white pieces clickable during white turn and vice versa.
            this.squares.forEach(square => {
              if (this.turn == "White") {
                if (square.value[0] == "B")
                  square.currentTurn = true;
                else
                  square.currentTurn = false;
              }
              else {
                if (square.value[0] == "W")
                  square.currentTurn = true;
                else
                  square.currentTurn = false;
              }
            });
            if (this.turn == "White")
              this.turn = "Black";
            else
              this.turn = "White"
          }
        }

        //Resetting all the values to go back to the new move state.
        this.squares.forEach((square) => {
          square.selected = false;
          console.log(square.selected);
        });
        this.selectedValue = "";
        this.selectedIndex = -1;
        this.clickStatus = "";
      }
    };
  }
}
