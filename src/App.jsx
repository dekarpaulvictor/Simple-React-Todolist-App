import {useState} from 'react';
import {nanoid} from 'nanoid';

const initialTodos = [
  {
    id: nanoid(),
    task: "Make breakfast",
    done: true,
    hidden: false
  },
  {
    id: nanoid(),
    task: "Take a shower",
    done: false,
    hidden: false
  },
  {
    id: nanoid(),
    task: "Dress and go to work",
    done: true,
    hidden: false
  },
];

const TodoList = ({list, onTaskDone, onTaskDelete}) => {
  return (
    <ul>
      {
        list.map((item => (
          <li
            key={item.id}
            style={
              {
                textDecoration: `${item.done ? 'line-through' : ''}`
              }
            }
            hidden={item.hidden}
          >
            {item.task}
            <input 
              type="checkbox" 
              checked={item.done} 
              onChange={() => onTaskDone(item.id)}
            />
            <button 
              onClick={() => onTaskDelete(item.id)}>
              Delete
            </button>
          </li>
        )))
      }
    </ul>
  );
}

const TodoApp = () => {

  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  
  const handleInputChange = (event) => {
    setText(event.target.value);
  }
  
  const handleCheckboxState = (id) => {
    // Search for todo item with matching id to change
    // it's done status
    setTodos(
      todos.map(item => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done
          }
        } else {
          return item;
        }
      })
    );
  }

  const handleTaskDelete = (id) => {
    // Search todos and delete item with matching id
    setTodos(
      todos.filter(item => item.id !== id)
    );
  }

  const handleShowAll = () => {
    // Search todos and toggle value of `hidden` property if true
    setTodos(
      todos.map(item => {
        if (item.hidden) {
          return {
            ...item,
            hidden: !item.hidden
          };
        } else {
          return item;
        }
      })
    );
  }

  const handleShowDone = () => {
    // Search todos and change `hidden` value of incomplete tasks to true
    setTodos(
      todos.map(item => {
        if (item.done) {
          return {
            ...item,
            hidden: false
          };
        } else{
          return {
            ...item,
            hidden: true
          }
        }
      })
    );
  }

  const handleShowNotDone = () => {
    // Search todos and change value of `hidden` property to true
    // if task is not done
    setTodos(
      todos.map(item => {
        if (!item.done) {
          return {
            ...item,
            hidden: false
          };
        } else{
          return {
            ...item,
            hidden: true
          }
        }
      })
    );
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (text === '') return;
    setTodos(todos.concat({
      id: nanoid(),
      task: text,
      done: false,
      hidden: false
    })); 

    setText('');
  }

  return (
    <div>
      <TodoList list={todos} onTaskDone={handleCheckboxState} onTaskDelete={handleTaskDelete} />
      <span>
        <button onClick={handleShowAll}>All</button>
        <button onClick={handleShowDone}>Done</button>
        <button onClick={handleShowNotDone}>Not done</button>
      </span>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={text} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function App() {
  return <TodoApp />;
}
