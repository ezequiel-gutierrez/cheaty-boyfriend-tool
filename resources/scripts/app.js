const inputField = document.getElementById("input-letters");
const submit = document.getElementById("submit-button");
const leftUL = document.getElementById("left-words");
const rightUL = document.getElementById("right-words");

function fetchWord() {
    const apiUrl = "http://api.datamuse.com/words?sp=";
    const input = inputField.value;
    const requestExtendLeft = `${apiUrl}*${input}`;
    const requestExtendRight = `${apiUrl}${input}*`;

    leftUL.innerHTML = "";
    rightUL.innerHTML = "";
    
    const searchWordLeft = async () => {
        try {
            const response = await fetch(requestExtendLeft)
            if (response.ok) {
                const jsonResponse = await response.json();
                for(let i = 0; jsonResponse.length && i < 10; i++) {
                    const newWord = document.createElement("li");
                    newWord.textContent = jsonResponse[i].word;
                    leftUL.appendChild(newWord);
                }
                return
            }
            throw new Error("Something went wrong")
        } catch(error) {
            console.log(error);
        }
    }

    const searchWordRight = async () => {
        try {
            const response = await fetch(requestExtendRight)
            if (response.ok) {
                const jsonResponse = await response.json();
                for(let i = 0; jsonResponse.length && i < 10; i++) {
                    const newWord = document.createElement("li");
                    newWord.textContent = jsonResponse[i].word;
                    rightUL.appendChild(newWord);
                }
            }
            throw new Error("Something went wrong")
        } catch(error) {
            console.log(error);
        }
    }
    searchWordLeft()
    searchWordRight()
}

function checkInput(event) {
    if(event.key === "Enter" || event.keyCode === 13) {
        fetchWord()
    }
}

inputField.addEventListener("keydown", checkInput);
submit.addEventListener("click", fetchWord);