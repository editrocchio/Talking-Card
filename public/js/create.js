 function addCard() {
      let cards = document.getElementById("cards");
      //create new row
      let newRow = document.createElement("div");
      newRow.className = "row";
      let newRowID = "row" + parseInt(uniqueCard);
      newRow.id = newRowID;
      //create question 
      let newQuestionDiv = document.createElement("div");
      let newQuestion = document.createElement("textarea");
      let newQuestionID = "question" + parseInt(uniqueCard);
      newQuestionDiv.className = "col-md-5";
      newQuestion.id = newQuestionID;
      newQuestion.className = "textbox";
      newQuestion.placeholder = "Question";
      newQuestionDiv.appendChild(newQuestion);
      newRow.appendChild(newQuestionDiv);
      //create Answer
      let newAnswerDiv = document.createElement("div");
      let newAnswer = document.createElement("textarea");
      let newAnswerID = "answer" + parseInt(uniqueCard);
      newAnswerDiv.className = "col-md-5";
      newAnswer.className = "textbox";
      newAnswer.id = newAnswerID;
      newAnswer.placeholder = "Answer";
      newAnswerDiv.appendChild(newAnswer);
      newRow.appendChild(newAnswerDiv);
      //create button
      let newButtonDiv = document.createElement("div");
      let newButton = document.createElement("button");
      let newButtonID = "button" + parseInt(uniqueCard);
      newButtonDiv.className = "col-md-2";
      newButton.id = newButtonID;
      newButton.innerHTML = "-";
      newButton.className = "previous_question btn btn-outline-primary";
      newButton.onclick = function () { removeCard(newRowID); }
      newButtonDiv.appendChild(newButton);
      newRow.appendChild(newButtonDiv)
      //add row to cards
      $(newRow).insertBefore('#cards > div:last');
      uniqueCard += 1;
    }

    function removeCard(rowID) {
      document.getElementById("cards").removeChild(document.getElementById(rowID));
    }

    function saveCards(e) {
      e.preventDefault();
      let deckName = document.getElementById("deckName").innerHTML;
      firebase.database().ref(deckName).remove();
      let questionNumber = 1;
      for (let i = 1; i < uniqueCard; i++) {
        let card = document.getElementById("row" + parseInt(i));
        if (card !== null) {
          console.log("made it")
          let question = document.getElementById("question" + parseInt(i)).value;
          let answer = document.getElementById("answer" + parseInt(i)).value;
          if (question != "" && answer != "") {
            firebase.database().ref(deckName + '/question ' + parseInt(questionNumber)).set({
              question: question,
              answer: answer
            })
            questionNumber += 1;
          }
        }
      }
      setTimeout(function () { window.location.href = "./review.html"; }, 1000);
    }

    function loadCards() {
      let currentDeck = sessionStorage.getItem("deckName");
      let arr = []
      firebase.database().ref(currentDeck + "/").once(
        'value',
        function (snapshot) {
          for (var deck in snapshot.val()) {
            var question = snapshot.val()[deck]['question'];
            var answer = snapshot.val()[deck]['answer'];
            displayCard(question, answer);
          }
        });
    }

    function displayCard(question, answer) {
      let cards = document.getElementById("cards");
      //create new row
      let newRow = document.createElement("div");
      newRow.className = "row";
      let newRowID = "row" + parseInt(uniqueCard);
      newRow.id = newRowID;
      //create question 
      let newQuestionDiv = document.createElement("div");
      let newQuestion = document.createElement("textarea");
      let newQuestionID = "question" + parseInt(uniqueCard);
      newQuestionDiv.className = "col-md-5";
      newQuestion.className = "textbox";
      newQuestion.id = newQuestionID;
      newQuestion.placeholder = "Question";
      newQuestion.innerHTML = question;
      newQuestionDiv.appendChild(newQuestion);
      newRow.appendChild(newQuestionDiv);
      //create Answer
      let newAnswerDiv = document.createElement("div");
      let newAnswer = document.createElement("textarea");
      let newAnswerID = "answer" + parseInt(uniqueCard);
      newAnswerDiv.className = "col-md-5";
      newAnswer.className = "textbox";
      newAnswer.id = newAnswerID;
      newAnswer.placeholder = "Answer";
      newAnswer.innerHTML = answer;
      newAnswerDiv.appendChild(newAnswer);
      newRow.appendChild(newAnswerDiv);
      //create button
      let newButtonDiv = document.createElement("div");
      let newButton = document.createElement("button");
      let newButtonID = "button" + parseInt(uniqueCard);
      newButtonDiv.className = "col-md-2";
      newButton.id = newButtonID;
      newButton.innerHTML = "-";
      newButton.className = "previous_question btn btn-outline-primary";
      newButton.onclick = function () { removeCard(newRowID); }
      newButtonDiv.appendChild(newButton);
      newRow.appendChild(newButtonDiv);
      //add row to cards
      cards.insertBefore(newRow, cards.firstChild);
      uniqueCard += 1;
    }