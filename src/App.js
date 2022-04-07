import React, {useEffect, useState} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
    //states
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState("all")
    const [filteredTodos, setFilteredTodos] = useState([])

    //RUN ONCE
    useEffect(()=>{
        getLocalTodos()
    },[])
    //USE EFFECT 
    useEffect(()=>{
        filterHandler()
        saveLocalTodos()
    }, [todos, status])
    //functions
    const filterHandler = ()=>{
        switch(status){
            case 'completed':
                setFilteredTodos(todos.filter(todo=> todo.completed === true))
                break
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo=> todo.completed === false))
                break
            default:
                setFilteredTodos(todos)
                break
        }
    }
    const saveLocalTodos = ()=>{ 
        localStorage.setItem('todos', JSON.stringify(todos))
        
    }
    const getLocalTodos = ()=>{
        if(localStorage.getItem('todos')===null){
            localStorage.setItem('todos', JSON.stringify([]))
        }
        else{
            let localtodos = JSON.parse(localStorage.getItem('todos')) //, JSON.stringify(todos))
            setTodos(localtodos)
        }
    }
    return (
        <div className="App">
        <header>
            <h1>NH's Todo React App</h1>
        </header>
        <Form 
            todos = {todos}
            setTodos={setTodos} 
            inputText={inputText} 
            setInputText={setInputText}
            setStatus={setStatus}
            />
        <TodoList  
            setTodos={setTodos} 
            todos={todos}
            filteredTodos={filteredTodos}/>
        </div>
  );
}

export default App;
