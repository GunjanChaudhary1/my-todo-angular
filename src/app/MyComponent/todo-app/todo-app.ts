import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  status: string;
}

@Component({
  selector: 'app-todo-app',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-app.html',
  styleUrls: ['./todo-app.css']
})
export class TodoAppComponent implements OnInit {
  taskName: string = '';
  filterStatus: string = 'All';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
    this.applyFilter();
  }

  // ✅ Add a new task
  addTask() {
    if (this.taskName.trim()) {
      this.tasks.push({ name: this.taskName.trim(), status: 'New' });
      this.taskName = '';
      this.saveTasks();
      this.applyFilter();
    }
  }

  // ✅ Delete a task
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.applyFilter();
  }

  // ✅ Update task status
  updateStatus(index: number) {
    this.saveTasks();
    this.applyFilter();
  }

  // ✅ Filter by dropdown
  applyFilter() {
    if (this.filterStatus === 'All') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(t => t.status === this.filterStatus);
    }
  }

  // ✅ Search task
  searchTask() {
    if (!this.taskName.trim()) {
      this.applyFilter();
      return;
    }

    const searchTerm = this.taskName.trim().toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.name.toLowerCase().includes(searchTerm)
    );

    if (this.filteredTasks.length === 0) {
      this.filteredTasks = [];
    }
  }

  // ✅ Save to Local Storage
  saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
  }

  // ✅ Load from Local Storage
  loadTasks() {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}
