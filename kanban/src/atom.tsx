import { atom, selector } from "recoil";

export const minutesState = atom({
   key:"kanban",
   default:0, 
});

export const hoursSelector = selector<number>({
   key:"hour",
   get:({get})=>{
      const minute = get(minutesState);
      return minute / 60;
   },
   set:({set}, newValue) =>{
      const minutes = Number(newValue) *60
      set(minutesState, minutes);
   }
})

interface toDoStateProps {
   [key:string] : string[]
}

export const toDoState = atom<toDoStateProps>({
   key:"toDo",
   default: {
      "To Do": ["a", "b", "c"],
      doing : ["D", "E", "F"],
      done : ["H", "I", "J"],
      asd : ["asd"],
   },
})