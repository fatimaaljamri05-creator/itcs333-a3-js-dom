// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
// ITCS333 Assignment 3 - To-Do App
(function() {
  'use strict';

  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    const items = todoList.querySelectorAll('li');
    let activeCount = 0;
    items.forEach(li => {
      if (!li.classList.contains('completed')) {
        activeCount++;
      }
    });
    counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');
    items.forEach(li => {
      const isCompleted = li.classList.contains('completed');
      if (currentFilter === 'all') {
        li.style.display = '';
      } else if (currentFilter === 'active') {
        li.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        li.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const text = todoInput.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden'); 
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="todo-text">${text}</span>
      <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);
    todoInput.value = ''; 

    updateCounter();
    applyFilter();
  });

  todoList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    
    if (deleteBtn) {
      const li = deleteBtn.closest('li');
      if (li) {
        li.remove();
        updateCounter();
      }
      return;
    }

    const li = e.target.closest('li');
    if (li) {
      li.classList.toggle('completed');
      updateCounter();
      applyFilter();
    }
  });

  filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
  });

  filterActive.addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
  });

  filterDone.addEventListener('click', () => {
    currentFilter = 'done';
    applyFilter();
  });

  updateCounter();
})();