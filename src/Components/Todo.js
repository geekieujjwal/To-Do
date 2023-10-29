import { useState } from "react";

const Todo = () => {
  const [inputText, setInputText] = useState("");
  const [todoArr, setTodoArr] = useState([]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleButton = (e) => {
    console.log(inputText);
    if (inputText) {
      setTodoArr((prev) => {
        const newArr = [inputText, ...prev];
        return newArr;
      });
      console.log(todoArr);
    }
    setInputText("");
  };

  return (
    <main>
      <h2>My Todos</h2>
      <div className="input-btn">
        <input type="text" onChange={handleChange} value={inputText} />
        <button onClick={handleButton}>Add</button>
      </div>

      {todoArr.map((todo) => {
        return (
          <div className="todos">
            <p>{todo}</p>
            <div className="update">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Todo;
