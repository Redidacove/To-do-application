import{v4 as uuidV4} from "uuid"
// console.log(uuidV4());
type Task ={
  id:string
  title: string
  completed:boolean
  createdAt:Date
}
const list=document.querySelector<HTMLUListElement>("#list");
const form=document.getElementById("new-task-form") as HTMLFormElement|null
const input=document.querySelector<HTMLInputElement>("#new-task-title");
const Tasks:Task[] =loadTasks();
Tasks.forEach(addListItem)

form?.addEventListener("submit", e =>{
 e.preventDefault();
 if(input?.value==""||input?.value==null)return;

 const newTask:Task= {
  id: uuidV4(),
  title: input.value,
  completed:false,
  createdAt:new Date()
 }
 Tasks.push(newTask)
  addListItem(newTask)
  saveTasks()
  input.value=""
})
function addListItem(task:Task){
  const item= document.createElement("li");
  const label= document.createElement("label");
  const checkbox= document.createElement("input");
  checkbox.addEventListener("change", (e) => {
    task.completed = checkbox.checked;
    // Find the index of the task in the Tasks array
    const taskIndex = Tasks.findIndex((t) => t.id === task.id);
    // Remove the task from the Tasks array
    Tasks.splice(taskIndex, 1);
    // Remove the task from local storage
    localStorage.removeItem("TASKS");
    // Save the updated Tasks array to local storage
    saveTasks();
    // Remove the list item from the DOM
    item.remove();
  });
  
  checkbox.type="checkbox"
  checkbox.checked=task.completed
  label.append(checkbox,task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks(){
  localStorage.setItem("TASKS",JSON.stringify(Tasks))
}
function loadTasks():Task[]{
 const taskJSON =localStorage.getItem("TASKS")
 if(taskJSON==null)return []
  return JSON.parse(taskJSON)
}
