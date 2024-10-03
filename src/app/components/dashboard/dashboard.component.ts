import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { Todo } from "../../shared/models/models";
import { AuthService } from "../../shared/services/auth.service";
import { CustomerService } from "../../services/customer.service";
import { ToastrService } from "ngx-toastr";


@Component({
    selector: "app-signup",
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css"
})

export class AppDashboardComponent implements OnInit {
    todos: Todo[] = [];
    isPanelOpen: boolean = false;
    panelModel: string = '';
    selectedTodoItem: string = '';
    todoForm!: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private customerService: CustomerService, private toastr: ToastrService) {
        this.todoForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.customerService.getTodoList().then((resp: any) => {
            if (resp.statusCode === 200) {
                this.todos = resp.todoList;
            } else {
                this.todos = [];
                this.toastr.warning(resp.statusMessage)
            }
        }, (error) => {
            this.toastr.error(error.message)
        })
    }

    openTodoPanel(type: string, todoItem: any = false) {
        this.isPanelOpen = true;
        this.panelModel = type;
        if (type === 'edit' && todoItem) {
            this.todoForm.patchValue({ title: todoItem.title, content: todoItem.content });
            this.selectedTodoItem = todoItem._id
        } else if (type === 'add') {
            this.todoForm.reset();
        } else {
            this.todoForm.patchValue({ title: todoItem.title, content: todoItem.content });
            this.todoForm?.get('title')?.disable();
            this.todoForm?.get('content')?.disable();
        }
    }

    closeTodoPanel() {
        this.isPanelOpen = false;
        this.panelModel = '';
        this.todoForm.reset();
        this.todoForm?.get('title')?.enable();
        this.todoForm?.get('content')?.enable();
    }

    onSave() {
        if (this.todoForm.valid) {
            const postData = this.todoForm.value;
            postData.isCompleted = false;
            if (this.panelModel === 'edit') {
                this.customerService.updateTodoItem(postData, this.selectedTodoItem).then((resp: any) => {
                    if (resp.statusCode === 200) {
                        const index = this.todos.findIndex((todo: any) => todo._id === this.selectedTodoItem);
                        if (index !== -1) {
                            this.todos[index] = resp.updatedTodoItem;
                            this.selectedTodoItem = '';
                        }
                    } else {
                        this.toastr.error(resp.statusMessage)
                    }
                }, (error) => {
                    this.toastr.error(error.message);
                })
            } else {
                this.customerService.createTodoItem(postData).then((resp: any) => {
                    if (resp.statusCode === 200) {
                        this.todos.push(resp.todo)
                    } else {
                        this.toastr.error('Failed to create todo item')
                    }
                }, (error) => {
                    this.toastr.error(error.message)
                })
            }

            this.closeTodoPanel();
        }
    }

    onDelete(todo: any) {
        this.selectedTodoItem = todo._id;
        this.customerService.deleteTodoItem(this.selectedTodoItem).then((resp:any)=>{
            if(resp.statusCode === 200){
                this.todos = this.todos.filter(t => t !== todo);
            }else{
                this.toastr.error(resp.statusMessage)
            }
        }, (error)=>{
            this.toastr.error(error.message)
        })
    }

    onView(todo: any) {
        this.selectedTodoItem = todo._id;
        this.customerService.getTodoItem(this.selectedTodoItem).then((resp: any) => {
            if (resp.statusCode === 200) {
                this.openTodoPanel('view', resp.todoItem)
            } else {
                this.toastr.error(resp.statusMessage)
            }
        }, (error) => {
            this.toastr.error(error.message);
        })
    }

    onComplete(todo: any) {
        this.selectedTodoItem = todo._id;
        let postData = { isCompleted: true }
        this.customerService.updateTodoItem(postData, this.selectedTodoItem).then((resp: any) => {
            if (resp.statusCode === 200) {
                const index = this.todos.findIndex((todo: any) => todo._id === this.selectedTodoItem);
                if (index !== -1) {
                    this.todos[index] = resp.updatedTodoItem;
                    this.selectedTodoItem = '';
                }
            } else {
                this.toastr.error(resp.statusMessage)
            }
        }, (error) => {
            this.toastr.error(error.message);
        })
    }

    logoutUser() {
        this.authService.clearToken();
        this.router.navigate(['login'])
    }
}