const title = document.querySelector('.Month');
const today = new Date();
const lastMonthBtn = document.querySelector('.last-month-Btn');
const nextMonthBtn = document.querySelector('.next-month-Btn');
const todayBtn = document.querySelector('.todayBtn');
const dateInput = document.querySelector('#date_input');
const todoInput = document.querySelector('#todo_item_input');
const createModal = new bootstrap.Modal(document.querySelector('#create_todo_modal'));
// const createModal = bootstrap.Modal.getOrCreateInstance('#create_todo_modal');
const updateModal = bootstrap.Modal.getOrCreateInstance('#update_todo_modal');
const updateDateInput = document.querySelector('#date_update_input');
const updateTodoInput = document.querySelector('#todo_item_update_input');
const deleteTodoBtn = document.querySelector('.delete-btn');
const updateTodoBtn = document.querySelector('.update-btn');

let currentYear;
let currentMonth;

// set localStage Key and Value
const localStorageKey = "My-Todo";
let todoItem = {};


//==============render calender=================== F
/** 日曆的第一格與當月1號的關係（1號星期幾，0-6）：
   * 0,1,2,3,4,5,6
   * 日 一 二 三 四 五 六
   * 1,2,3,4,5,6,7      --->(1-0)
   * 0,1,2,3,4,5,6      --->(1-1)
   * -1,0,1,2,3,4,5     --->(1-2)
   * -2,-1,0,1,2,3,4    --->(1-3)
   * -3,-2,-1,0,1,2,3   --->(1-4)
   * -4,-3,-2,-1,0,1,2  --->(1-5)
   * -5,-4,-3,-2,-1,0,1 --->(1-6)
   */
/** 日曆上顯示的最後一格與當月最後一天的關係(假如 f:30號)
   * 0,1,2,3,4,5,6
   * 日 一 二 三 四 五 六
   * f,1,2,3,4,5,6    --->(30 + (6 - 0))
   *  ,f,1,2,3,4,5    --->(30 + (6 - 1))
   *  , ,f,1,2,3,4    --->(30 + (6 - 2))
   * ......
   *  , , , , ,f,1    --->(30 + (6 - 5))
   *  , , , , , ,f    --->(30 + (6 - 6))
   * .......
   */
// getDay：第幾天＝禮拜幾，getDate：該月幾號

function renderCalender(){
    const firstDayOfThisMonth = new Date(currentYear, currentMonth-1, 1);
    const lastDayOfThisMonth = new Date(currentYear, currentMonth-1+1, 0);

    let startDay = 1- firstDayOfThisMonth.getDay();
    const endDay = lastDayOfThisMonth.getDate() + (6 - lastDayOfThisMonth.getDay());
    const daysArea = document.querySelector('.daysArea');
    daysArea.innerHTML = "";

    for(startDay; startDay <= endDay; startDay++){
        //current data & grid
        const currGrid = new Date(currentYear, currentMonth-1, startDay);

        // Create Grid's data and element：<div class="border col"><span class = "d-inline-block, w-100, text-center"></span></div>
        const daysDom = document.createElement('div');
        daysDom.classList.add('border', 'col');

        const gridElement = document.createElement('span');
        gridElement.classList.add('d-inline-block', 'w-100', 'text-center');
        gridElement.textContent= currGrid.getDate();

        //add every grid's click event
        daysDom.addEventListener('click',()=>{
            var modal = new bootstrap.Modal(createTodoModal);
            modal.show();
            dateInput.value = getDateStr(currGrid); 
            todoInput.value = ''; 
        });

        // add today tag 
        if( currGrid.getFullYear() === today.getFullYear() &&
            currGrid.getMonth() === today.getMonth() &&
            currGrid.getDate() === today.getDate())
            // <span class="badge rounded-pill text-bg-warning">Warning</span>
            {gridElement.classList.add('badge', 'rounded-pill', 'text-bg-warning');}
        daysDom.append(gridElement);

        // render todo localStorage
        const dateStr = getDateStr(currGrid);
        const currentDate = dateStr;
        const currentTodo = todoItem[currentDate];
        if(currentTodo){
            const ul = document.createElement("ul");
            currentTodo.forEach((todo, idx)=>{
                const li = document.createElement("li");
                li.textContent = todo;
                // todo list update event(notice: bubble!)
                li.addEventListener('click', (e)=>{
                    e.stopPropagation();
                    updateModal.show();
                    updateDateInput.value = dateStr;
                    updateTodoInput.value = todo;

                    // edit & delete event
                    // 不能使用addEventListener? 否則會重複註冊,點開編輯多次時,會刪除所有點過的?但我沒有?
                    deleteTodoBtn.addEventListener('click', ()=>{
                    deleteTodo(dateStr, idx);
                    updateDateInput.onclick = () =>{
                        updateTodo(dateStr, idx, updateTodoInput.value.trim());
                    };
                    
                    resetStorage(); }); 
                });
                
                ul.append(li);
            });
            daysDom.append(ul);
        }
        daysArea.append(daysDom);
    }
}

function resetStorage(){
    const jsonStr = JSON.stringify(todoItem);
    localStorage.setItem(localStorageKey, jsonStr);
};

function deleteTodo(dateStr, idx){
    const todoItemOfDate = todoItem[dateStr]
    todoItemOfDate.splice(idx, 1);
    updateModal.hide();
    renderCalender();
}

function updateTodo(dateStr, idx, content){
    const todoItemOfDate = todoItem[dateStr];
    todoItemOfDate[idx] = content;

    resetStorage();
    updateModal.hide();
    renderCalender();
};

function getDateStr(date){
    //return 2024-02-02
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function initCalender(){
    currentYear = today.getFullYear();
    currentMonth = today.getMonth()+1;
    showTitle(currentYear, currentMonth);
    dateInput.value = getDateStr(today);

    getTodoLocalStorage(); 
    renderCalender();
    
};

function showTitle(year, month){
    title.textContent = `${year}/ ${month.toString().padStart(2, 0)}`;
}

initCalender();

// ====== next & last month =====
lastMonthBtn.addEventListener('click', ()=>{
    currentMonth--;
    if(currentMonth<1){
        currentYear--;
        currentMonth = 12;
    }
    showTitle(currentYear, currentMonth);
    renderCalender();
});

nextMonthBtn.addEventListener('click',()=>{
    currentMonth++;
    if(currentMonth>12){
        currentYear++;
        currentMonth = 1;
    }
    showTitle(currentYear, currentMonth);
    renderCalender();
});

// =====add todo list to local Storage=====
function setTodoLocalStorage(date, content){
    if(!Array.isArray(todoItem[date])){
        todoItem[date]=[];
    }

    todoItem[date].push(content);
    // let todoItemJson = JSON.stringify(todoItem);
    resetStorage();

    // const todoItem = {
    //     "2024-02-11": ["todo1", "todo2"],
    //     "2024-02-09": ["寫作業", "切版"]};
    // let todoItemKey = "2024-02-11";
    // How get Data?  todoItem["2024-02-11"]
    localStorage.setItem(localStorageKey, todoItemJson);
};

function getTodoLocalStorage(){
    const todoObj = JSON.parse(localStorage.getItem(localStorageKey));
    if(todoObj){
        todoItem = todoObj; //add it!
    }
};

// ===========closed modal, date goes back today==========
document
    .querySelector('#create_todo_modal')
    .addEventListener("hidden.bs.modal", ()=>{
        dateInput.value = getDateStr(today);
        todoInput.value = ''; 
    });

// =====modal: go back today=====
todayBtn.addEventListener('click', ()=>{
    initCalender();
});

function createTodo(){
const dateString = dateInput.value;
const todoContent = todoInput.value.trim();
if(todoContent === ''){
    return;
}
setTodoLocalStorage(dateString, todoContent);
todoInput.value = '';
createModal.hide();
renderCalender();
};

initCalender();

// --------------- new todo list model -------------------
const addButton = document.querySelector('.btn-outline-info');
const createTodoModal = document.getElementById('create_todo_modal');

addButton.addEventListener('click', function() {
    var modal = new bootstrap.Modal(createTodoModal);
    modal.show();
})


