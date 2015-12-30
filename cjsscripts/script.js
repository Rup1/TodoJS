function toDoList() {
  
//grab elements and store them into variables.
  
  var userInput = document.getElementById('theInput');
  var list = document.getElementById('todoList');
  var addButton = document.getElementById('btnAdd');
  var clearAll = document.getElementById('btnClear');  
  
//add eventlisteners
  
  userInput.addEventListener(onkeypress);
  addButton.addEventListener("click", addItem); 
  clearAll.addEventListener("click", clearItems);
  
//function for submitting on enter
  
  onkeypress = function(event) {
    // if key pressed is "Enter", OR matches keycode for Enter '13'"
    if (event.key == "Enter" || event.keyCode == 13) {
      //Run function that adds the task
      addItem();
    }
  };
  
//main function that creates the todo item
  
  function addItem() {
    //if the user types at least one letter
    if (userInput.value.length > 0){
    //create a <li> element
    var listElement = document.createElement('li');
    // create a <p> element
    var pTag = document.createElement('p');
    //place <p> inside the <li> by appending it
    listElement.appendChild(pTag);
    //place the written task in <p>
    pTag.innerText = input.value;
    //add a 'crossout' link within the <li>
    listElement.appendChild(crossOut());
    //add a delete link within the <li>
    listElement.appendChild(deleteTask());
    //place the complete <li> to the task list
    list.appendChild(listElement);
    userInput.value = "";
    }
    //If user tries to submit empty input do nothing.
    else {
      return false;
    }
  }  
  
  //function creating the button that triggers the function that crosses out completed tasks.
  
  function crossOut() {
   //Create the div using createElement()
   var strikeLink = document.createElement('div');
     // set the div's class and class name using setAttribute()
     strikeLink.setAttribute("class", "striketask"); 
     //Place a checkmark character using innerHTML
     strikeLink.innerHTML = "✓";
     //Add eventlistener to each link that runs a function that crosses out the task
     strikeLink.addEventListener("click", strikeItem);
     //return the function
     return strikeLink;
  }
  //function creating "delete" button that triggers the "removeItem" function on click. Same steps as above.
  
  function deleteTask() {  
   var deleteLink = document.createElement('div');     
     deleteLink.setAttribute("class", "deletetask");     
     deleteLink.innerHTML = "X";     
     deleteLink.addEventListener("click", removeItem);
     return deleteLink;
   }
   
  //function for clearing all tasks
  
  function clearItems() {
    //make the innerHTML of the list equal to nothing.
    list.innerHTML = "";
  }  
  
//create function that crosses out completed tasks.
  
  function strikeItem() {
    //'this' keyword refers to the item being clicked that triggers this function. Create a variable that stores the clicked item's parentNode into a variable. In this app the parentnode will refer to the <li> tag
    var parent = this.parentNode;
    //store the first child of the parentnode into a variable. in this app, the first child will be the <p> element created earlier.
    var child = this.parentNode.firstChild;
    // the parentNode to the <li> tag which we stored into the 'parent' variable is the list. Store that into a variable.
    var grandparent = parent.parentNode;
    //begin if statement to check if the task is crossed out or not. If textDecoration style of the first child (<p> tag) does NOT equal line-through
    if(child.style.textDecoration != "line-through"){
      //give it a text-decoration property with a line-through value
      child.style.setProperty("text-decoration", "line-through");
      //then append the the parent div (the <li> tag) to the grandparent (the task list)
      grandparent.appendChild(parent);
    }
    //else if the textDecoration ofthe first child does equal to line-through
    else if (child.style.textDecoration === "line-through") {
      //set property of the child element to text-decoration none
      child.style.setProperty("text-decoration","none");
      // once the item is uncrossed we move it back to the top of the task list using insertBefore, the first child of the grandparent.
    grandparent.insertBefore(parent, grandparent.firstChild);
    }
    //if none of these are true do nothing.
    else{
      return false;
    }
  }
//Create function that deletes completed tasks. 
  
function removeItem() {
    //use removeChild to remove the node to be deleted. For this to work we must first target the grandparent of the element triggering the funtion ('this') then we target the parentnode of the same element. Then we attach the removeChild method to the grandparent, with the parent of 'this' as the value for removeChild.
    var parent = this.parentNode.parentNode;
    var child = this.parentNode;
   parent.removeChild(child);
  }
  
}

toDoList();
