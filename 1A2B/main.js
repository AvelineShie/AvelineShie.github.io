const startBtn = document.getElementById("btnradio1");
const resetBtn = document.getElementById("btnradio2");
const showAnswerBtn = document.getElementById("btnradio3");
const $input = document.getElementById("input");
const guessBtn = document.getElementById("guess-btn");

const inputValue = $input.value;

// ==========Create Answer=================
function createRandomNumber (){
    //保證數字唯一
    let answerNumbers = new Set();

    while (answerNumbers.size < 4) {
        let randomNum = Math.floor(Math.random() * 10);
        answerNumbers.add(randomNum);
    }

    // 轉換 Set 為數字陣列
    let randomArray = Array.from(answerNumbers);
    return randomArray.join('');
};

const answer = createRandomNumber().split('').map(Number);

//===========AnswerToast============
function createAnswerToast(){
    // create Toast elements
    //位置有點怪,再調整
    var toastContainer = document.createElement('div');
    toastContainer.classList.add('toast', 'position-absolute', 'top-0', 'start-50',);
    toastContainer.setAttribute('role', 'alert');
    toastContainer.setAttribute('aria-live', 'assertive');
    toastContainer.setAttribute('aria-atomic', 'true');
    // <div class="position-absolute top-0 start-50 translate-middle"></div>

    var toastContent = document.createElement('div');
    toastContent.classList.add('d-flex');

    var toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.innerText = `Answer is：${answer.join('')}`;

    var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('btn-close', 'me-2', 'm-auto');
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');

    toastContent.appendChild(toastBody);
    toastContent.appendChild(closeButton);
    toastContainer.appendChild(toastContent);

    //Toast Elements add body 
    document.body.appendChild(toastContainer);

    //創建 Toast 實例並顯示
    var toastEl = new bootstrap.Toast(toastContainer);
    toastEl.show();
};

showAnswerBtn.addEventListener('click', ()=>{
  createAnswerToast ();
});

let numArray, cleanedInput;
let isValid = true;

// ===============checkAnswer=====================
function checkAnswer(){
  // 去除空白字符
  cleanedInput = $input.value.replace(/\s/g, '');

  // 檢查是否為四位數
  if (cleanedInput.length !== 4 ||isNaN(inputValue)) {
    alert("Please enter a four-digit number!");
    inputValue = "";
    return isValid = false;
  }

// 檢查是否有重複數字
  numArray = cleanedInput.split('').map(Number);
    
  console.log(typeof numArray);

  const uniqueSet = new Set(numArray);
  if (numArray.length !== uniqueSet.size) {
    alert("Please enter four non-repetitive numbers!");
    inputValue = "";
    return isValid = false;
  }

// 檢查是否為數字
  for (const num of numArray) {
    if (isNaN(num)) {
      alert("Please enter a valid number!");
      inputValue = "";
      return isValid = false;
    }
  }
return isValid = true;
}



//=========check answer&resultList===========
function createGuessLists(){
  let ACount = 0;
  let BCount = 0;
  
  // 比對數字及位置
  for (let i = 0; i < 4; i++) {
    if (numArray[i] === answer[i]) 
    {
      ACount++;
    } 
    else if (answer.includes(numArray[i])) 
    {
      BCount++;
    }
  }

  // 更新結果到 HTML
  const resultList = document.getElementById('result-list');
  const resultItem = document.createElement('li');
  resultItem.classList.add('list-group-item', 'border-secondary-subtle');
  resultItem.innerHTML = `<span class="badge bg-info">${ACount}A${BCount}B</span> ${cleanedInput}`;
  resultList.appendChild(resultItem);

  // 如果所有數字和位置都正確，顯示過關
  if (ACount === 4) {
    alert(`Congratulations! Answer is: ${answer.join('')}`);
  }
  
};

//當你按下guessBtn
guessBtn.addEventListener('click', ()=>{
  checkAnswer();
  createGuessLists();
});

resetBtn.addEventListener('click', ()=>{
  location.reload();
  //清除history
  //重刷畫面
});

