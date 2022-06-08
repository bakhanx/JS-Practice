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

export const toDoState = atom({
   key:"toDo",
   default: ["a", "b", "c", "D", "E", "F", "H", "I", "J"],
})