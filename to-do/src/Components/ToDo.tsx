import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, customCategoryState, IToDo, toDoState } from "../Components/atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name } as any;
    //   const changeToDo = [
    //     ...oldToDos.slice(0, targetIndex),
    //     newToDo,
    //     ...oldToDos.slice(targetIndex + 1),
    //   ];
      //splice(start,removeCount,addElement) // removeCount=0 : add to that position
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex,1,newToDo); 
      console.log(newToDo);
      return newToDos;
    });
  };

  const customCategory = useRecoilValue(customCategoryState);

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
