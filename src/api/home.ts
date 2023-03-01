import axios from "axios";

export interface addTodoData {
    todo: string
}

export interface addResponse {
    code: number,
    msg: string,
    data: any,
}

export function getTodo() {
    return axios.get("/todos");
}

export function addTodo(todo: addTodoData) {
    return axios.post<any,addResponse>("/todos", todo);
}