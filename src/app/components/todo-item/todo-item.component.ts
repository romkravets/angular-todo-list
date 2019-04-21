import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:comment-format
  //Set Dynamic Classes
  setClasses() {
    // tslint:disable-next-line:prefer-const
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo) {
    // tslint:disable-next-line:comment-format
    //Toggle in UI
    todo.completed = !todo.completed;
    // tslint:disable-next-line:comment-format
    //Toggle in server
    // tslint:disable-next-line:no-shadowed-variable
    this.todoService.toggleCompleted(todo).subscribe(todo =>
      console.log(todo));

  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
