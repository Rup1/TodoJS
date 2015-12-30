function toDoList() {
  
//grab elements and store them into variables.
  var input = document.getElementById('textBox');
  var list = document.getElementById('todoList');
  var addButton = document.getElementById('btnAdd');
  var clearAll = document.getElementById('btnClear');  
  
//add eventlisteners
  input.addEventListener(onkeypress);
  addButton.addEventListener("click", addItem); 
  clearAll.addEventListener("click", clearItems);
  
//function for submitting on enter
  onkeypress = function(event) {
    if (event.key == "Enter" || event.keyCode == 13) {
      addItem();
    }
  };
  
//main function that creates the todo item
  function addItem() {
    if (textBox.value.length > 0){
    var listElement = document.createElement('li');
    var pTag = document.createElement('p');
    listElement.appendChild(pTag);
    pTag.innerText = input.value;
    listElement.appendChild(deleteTask());
    listElement.appendChild(crossOut());
    list.appendChild(listElement);
    textBox.value = "";
    }
    else {
      return false;
    }
  }  
  
  //function creating the button that triggers the funciton that crosses out completed tasks.
  function crossOut() {
   var strikeLink = document.createElement('div');
     strikeLink.setAttribute("class", "striketask");    
     strikeLink.innerHTML = "✓";     
     strikeLink.addEventListener("click", strikeItem);   
     return strikeLink;
  }
  //function creating "delete" button that triggers the "removeItem" function on click.
  function deleteTask() {  
   var deleteLink = document.createElement('div');     
     deleteLink.setAttribute("class", "deletetask");     
     deleteLink.innerHTML = "X";     
     deleteLink.addEventListener("click", removeItem);
     return deleteLink;
   }
   
  //function for clearing all tasks
  function clearItems() {
    list.innerHTML = "";
  }  
  
//create function that crosses out completed tasks.
  function strikeItem() {
    var parent = this.parentNode;
    var child = this.parentNode.firstChild;
    var grandparent = parent.parentNode;
    if(child.style.textDecoration != "line-through"){
      child.style.setProperty("text-decoration", "line-through");
      parent.parentNode.appendChild(parent);
    }
    else if (child.style.textDecoration === "line-through") {
      child.style.setProperty("text-decoration","none");
    grandparent.insertBefore(parent, grandparent.firstChild);
    }
    else{
      return false;
    }
  }
//Create function that deletes completed tasks.  
function removeItem() {
    var parent = this.parentNode.parentNode;
    var child = this.parentNode;
   parent.removeChild(child);
  }
  
}

toDoList();
