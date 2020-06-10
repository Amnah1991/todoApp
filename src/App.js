import React from 'react';
import './App.css';


let id = 0;

function Todo(props) {
  return (
    <li className='item' key={props.todo.text}>
      <input className= 'checkbox' type='checkbox' 
      checked={props.todo.checked} onChange={props.onToggle}/>
      <span>{props.todo.text}</span>
      <button onClick={props.onDelete}> &#10006; </button>
    </li>
 )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
  }


  addTodo(event){
    if(event.key === 'Enter'){
      console.log(event.target.value)
      this.setState({ 
        todos: [
        ...this.state.todos , 
        {id : id++ ,text: event.target.value ,checked: false},
        ], 
      })
      event.target.value =''
    }
  }

  toggleTodo(id){
   this.setState({
     todos: this.state.todos.map((todo) => {
      if(todo.id !== id) return todo
      return {
        id: todo.id,
        text: todo.text,
        checked: !todo.checked
      }
     })
   })
  }
  

  removeTodo(id){
   this.setState({
     todos: this.state.todos.filter(todo => todo.id !== id)
   })
  }

  render() {
    return (
      <div className="container">
        <h1>Todo App</h1>
        <div className="flexContainer">
        <div className="total"> Total tasks: {this.state.todos.length} </div>
        <div className="Uncompleted"> Uncompleted : {this.state.todos.filter(todo => !todo.checked).length } </div>
         </div>
       
        <div className="flexContainer">
          <input 
          type='text' 
          placeholder ='type and hit enter to add'
          className ='inputField' 
          onKeyPress={(event) => this.addTodo(event)} />
        </div>
        <ul>
          {this.state.todos.map((todo) => <Todo 
          onDelete={()=> this.removeTodo(todo.id)} 
          onToggle={() => this.toggleTodo(todo.id)}
          todo={todo} />)}
        </ul>
      </div>
    )
  }
}

export default App;
