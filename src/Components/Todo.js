import { useState, useEffect } from "react";

const Todo = () => {
  const [inputText, setInputText] = useState("");
  const [todoArr, setTodoArr] = useState(() => {
    const storedTodoArr = localStorage.getItem("todos");
    return storedTodoArr ? JSON.parse(storedTodoArr) : [];
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(null);

  // Save tasks to local storage whenever the todoArr changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoArr));
  }, [todoArr]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Add a particular task...
  const handleAddButton = (e) => {
    if (inputText) {
      setTodoArr((prev) => {
        const newArr = [{ text: inputText, id: Date.now() }, ...prev];
        return newArr;
      });
      setInputText("");
      setIsEdit(false);
    }
  };

  /// Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isEdit) {
        handleSaveButton();
      } else {
        handleAddButton();
      }
    }
  };

  // Delete a particular task...
  const handleDeleteButton = (e) => {
    const taskId = Number(e.target.value);
    setTodoArr((prev) => {
      const newArr = prev.filter((todo) => todo.id !== taskId);
      return newArr;
    });
  };

  // Edit a particular task...
  const handleEditButton = (e) => {
    setIsEdit(true);
    const taskId = Number(e.target.value);
    setEditedTaskId(taskId);
    const taskToEdit = todoArr.find((todo) => todo.id === taskId);
    setInputText(taskToEdit.text);
  };

  // Save an edited task...
  const handleSaveButton = () => {
    if (editedTaskId !== null && inputText) {
      setTodoArr((prev) => {
        return prev.map((todo) => {
          if (todo.id === editedTaskId) {
            return { ...todo, text: inputText };
          }
          return todo;
        });
      });
      setEditedTaskId(null);
      setInputText("");
      setIsEdit(false);
    }
  };

  // Delete all tasks at once...
  const handleDeleteAllTasksButton = () => {
    setTodoArr([]);
    setInputText("");
  };

  return (
    <main>
      <h2>My Todos</h2>
      <div className="input-btn">
        <input
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Handle "Enter" key press
          value={inputText}
        />
        {!isEdit && <button onClick={handleAddButton}>Add</button>}
      </div>

      {todoArr.map(({ text, id }) => {
        return (
          <div key={id} className="todos">
            {isEdit && id === editedTaskId ? (
              <input
                className="editTaskInput"
                type="text"
                value={inputText}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Handle "Enter" key press
              />
            ) : (
              <p>{text}</p>
            )}
            <div className="update">
              {isEdit && id === editedTaskId ? (
                <button onClick={handleSaveButton} value={id}>
                  Save
                </button>
              ) : (
                <>
                  <button onClick={handleEditButton} value={id}>
                    Edit
                  </button>
                  <button onClick={handleDeleteButton} value={id}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
      {todoArr.length > 0 && (
        <button className="delete-btn" onClick={handleDeleteAllTasksButton}>
          Delete All Todos
        </button>
      )}
    </main>
  );
};

export default Todo;
