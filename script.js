console.log("hello");
        let questions = [];
        let qno = 0;

        document.getElementById('start-button').addEventListener('click', startGame);

        async function startGame() {
            document.getElementById("menu").style.display = "none";
            document.getElementById('question-container').style.display = "flex";

            try {
                const response = await fetch("questions.json");
                questions = await response.json();
                showQuestion();
            } catch (error) {
                alert("An unexpected error occurred: " + error);
            }
        }

        function showQuestion() {
            if (qno < questions.length) {
                const quiz = questions[qno];
                document.getElementById("question-container").innerHTML = `
                    <span>${qno + 1}) ${quiz.question}</span>
                    <input type="text" id="answer-input" style="border:1px solid white;border-radius:10px;background-color:transparent;outline:none;color:white;" class="px-2 m-3">
                    <button class="btn btn-outline-light m-5 px-5 py-3" onclick="submitAnswer()">Submit</button>
                    <span id="feedback" class="fs-5 text-white"></span>
                `;
            } else {
                document.getElementById('question-container').innerHTML = `
                    <span>Quiz Complete!</span>
                `;
            }
        }

        function submitAnswer() {
            const answerInput = document.getElementById('answer-input').value.trim().toLowerCase();
            const correctAnswer = questions[qno].answer.trim().toLowerCase();
            const feedback = document.getElementById('feedback');

            if (answerInput === correctAnswer) {
                feedback.innerHTML = '<span class="correct">Correct! Moving to the next question...</span>';
                qno++;
                setTimeout(showQuestion, 1000);
            } else {
                feedback.innerHTML = '<span class="incorrect">Incorrect! Try again.</span>';
            }
        }