import { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItem from './TodoItem'

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem('todo')?JSON.parse(localStorage.getItem('todo')):[]);
  const inputRef = useRef();
  const add = () => {
      const inputText = inputRef.current.value.trim();
      if(inputRef === '') return;
      const newTodo =  {
        id: Date.now(),
        text: inputText,
        isCompleted: false,
      }
      setTodoList((prev) => [...prev, newTodo])
      inputRef.current.value = ''
      inputRef.current.focus()
  }

  const deleteTodo = (id) => {
    setTodoList((prev) => {
        return prev.filter((todo) => todo.id !== id)
    })
  }

  const toggle = (id) => {
    setTodoList((prev) => {
        return prev.map((todo) => {
            if(todo.id === id){
                return {...todo, isCompleted: !todo.isCompleted}
            }
            return todo;
        })
    })
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todoList));
  }, [todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md rounded-xl flex flex-col p-7 min-h-[550px]'>
        {/* Title */}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt='' />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/* Input box */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Add your task' />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add +</button>
        </div>

        {/* Todo list */}
        <div>
        {todoList && todoList.map((item, index) => {
            return <TodoItem text={item.text} key={index} id={item.id} isCompleted={item.isCompleted} deleteTodo={deleteTodo} toggle={toggle}/>
        })}
        </div>
    </div>
  )
}

export default Todo
