$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const $taskInput = $('#task-input');
    const $taskList = $('#task-list');
    const $addTaskForm = $('#add-task-form');
    const $filterBtns = $('.filter-btn');
    
    renderTasks();
    
    $addTaskForm.on('submit', function(e) {
        e.preventDefault();
        
        const taskText = $taskInput.val().trim();
        if (taskText) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            $taskInput.val('');
        }
    });
    
    $taskList.on('change', '.task-checkbox', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    });
    
    $taskList.on('click', '.delete-btn', function() {
        const taskId = $(this).data('id');
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    });
    
    $filterBtns.on('click', function() {
        $filterBtns.removeClass('active');
        $(this).addClass('active');
        renderTasks();
    });
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function renderTasks() {
        const filter = $('.filter-btn.active').data('filter') || 'all';
        
        let filteredTasks = tasks;
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        $taskList.empty();
        
        if (filteredTasks.length === 0) {
            const emptyMessage = filter === 'all' 
                ? 'No tasks yet. Add a new task!' 
                : `No ${filter} tasks.`;
                
            $taskList.append(`
                <li class="list-group-item text-center text-muted py-4">
                    <em>${emptyMessage}</em>
                </li>
            `);
            return;
        }
        
        filteredTasks.forEach(task => {
            const taskElement = `
                <li class="list-group-item d-flex align-items-center ${task.completed ? 'bg-light text-muted' : ''}">
                    <input 
                        type="checkbox" 
                        class="form-check-input me-3 task-checkbox" 
                        ${task.completed ? 'checked' : ''}
                        data-id="${task.id}"
                    >
                    <span class="flex-grow-1 ${task.completed ? 'text-decoration-line-through' : ''}">
                        ${task.text}
                    </span>
                    <button class="btn btn-outline-danger btn-sm delete-btn ms-2" data-id="${task.id}">
                        Delete
                    </button>
                </li>
            `;
            $taskList.append(taskElement);
        });
    }
    
    $filterBtns.first().addClass('active');
});