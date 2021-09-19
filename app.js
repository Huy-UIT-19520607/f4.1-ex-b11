const body = document.querySelector('body');
const addBtn = document.getElementById('add-btn');
const input = document.getElementById('input');
const todoList = document.getElementById('todo-list');
const delBtns = document.querySelectorAll('.close');

console.dir(todoList);

// Hàm làm bg xen kẽ cho thẻ li
function setInterlacedBg() {
    for (let i = 0; i < todoList.children.length; i++) {
        if (i % 2 === 1) {
            todoList.children[i].classList.add('bg-eee');
        }
    }
}

// Hàm click đánh dấu hoặc bỏ đánh dấu công việc
function markCompletedWorkOrNot(elementItem = null) {

    // Sự kiện click vào từng thẻ li - đánh dấu công việc hoàn thành
    elementItem.onclick = function (event) {
        // event.stopPropagation();

        if (elementItem.classList.contains('done')) {
            elementItem.classList.remove('done');
            elementItem.firstElementChild.style.visibility = 'hidden';
        } else {
            elementItem.classList.add('done');
            elementItem.firstElementChild.style.visibility = 'visible';
        }
    };

    console.log('mark');
}

// Hàm click button del để xoá công việc
function removeWork(elementItem = null) {
    
    // Sự kiện click vào button del
    if (elementItem !== null) {
        elementItem.onclick = function (event) {
            elementItem.parentElement.remove();
        }
    }
}

// Khởi tạo
// đặt màu xen kẽ cho toàn bộ thẻ li có sẵn
body.addEventListener('unload', setInterlacedBg);
// thêm sự kiện click cho thẻ li có sẵn
for (let i = 0; i < todoList.children.length; i++) {
    markCompletedWorkOrNot(todoList.children[i]);
}
// thêm sự kiện click xoá thẻ li có sẵn
for (const delBtn of delBtns) {
    removeWork(delBtn);
}

// Sự kiện click button Add 
addBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (input.value === '') {
        return;
    }

    // Tạo ra thẻ li mới
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
        <i class="check far fa-check-square"></i>
        ${input.value}
        <i class="close fas fa-times"></i>
    `;

    // thêm sự kiện click đánh dấu cho thẻ li
    markCompletedWorkOrNot(todoItem);
    removeWork(todoItem.lastElementChild);

    todoList.appendChild(todoItem);
    input.value = '';

    console.dir(todoItem);

    // đặt màu lại do vừa thêm thẻ li mới
    setInterlacedBg();
});

