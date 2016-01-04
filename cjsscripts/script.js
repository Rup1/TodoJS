//wrap everything in a global function o that all subsequent variables
//and functions are local
function toDoList() {
  

  //I hate writing document.getElementById every time.
  function grab(id) { 
    return document.getElementById(id); 
  }
  
  
  //ditto event listeners
  var onEvent = function() {
    return function(obj, event, fn) {
      obj.addEventListener(event, fn, false);
    }; 
  }();
  
  
  //grab main elements and store them into variables.
  var input = grab('toDo'),
      list = grab("todoList"),
      addButton = grab('btnAdd'),
      clearAll = grab('btnClear');  
  

  
  // one listener to trigger pressedEnter if enter is pressed
  onEvent(input,"keypress", pressedEnter);
  //main button that triggers the function adding tasks to the list
  onEvent(addButton, "click", addItem);
  //clear all button that clears the list
  onEvent(clearAll,"click", clearItems);
  
  
  
  
  //function for submitting on enter
  function pressedEnter(event) {
    // if key pressed is "Enter", OR matches keycode for Enter '13'"
    if (event.key == "Enter" || event.keyCode == 13) {
    //Run function that adds the task
    addItem();
    }
  }
 
  
  //function that toggles the note text area to submit or edit note
  //params are grandparent, parent, child, parent sibling
  
  function formToggle(grp,pr,c,ps){
      
    // if the class attribute of the container is noNote
    if(grp.getAttribute("class") === "noNote" ){
      //set the class attribute to hasNote this will remove textarea
      grp.setAttribute("class", "hasNote");
      //Display value typed into the container div for the note
      pr.innerText = c.value;
      //get the height of the textContainer
      var h = pr.offsetHeight;
      //get the height of the submit button
      var n = ps.offsetHeight;
      //make noteContainer = to the combined height of its children
      grp.style.height = h + n + 20 + "px";
      //change submit button text to Edit
      ps.innerText = "Edit";
    }
    //or else if the class attribute is hasNote
    else{
      //get the height of the note's container
      var nc = pr.offsetHeight;
      //now empty the container
      pr.innerText = "";
      //and append the text area form within the container
      pr.appendChild(c);
      //set the class to noNote
      grp.setAttribute("class", "noNote");
      //set the height of the textarea to the textContainer before it was cleared
      c.style.height = nc + "px";
      //store the textarea's height in a var
      var a = c.offsetHeight;
      //store the height of the note button
      var b = ps.offsetHeight;
      //make the note container equal to the height of the button and textArea + 40px
      grp.style.height = a + b + 40 + "px";
      //change button text to submit.
      ps.innerText = "Submit";
    }
  }
  
  
  
  // function to toggle list items
  
  function pToggle(pr,c,s){
    //if the noteconatiner height is 0 (hidden)
    if(pr.style.height === "0px"){
      //store the height of the note textarea
      var h = c.offsetHeight;
      //store the height of the note button
      var n = s.offsetHeight;
      //set the note container's height to that of its children
      pr.style.height = h + n + 20 + "px";
      }
    //else close the container
    else{
      //if the height is greater than 0 hide the container
      pr.style.height = "0px";
    }
  } 
  
  
  
  //main function that creates the todo item
  //Upon pressing enter after typing an input, or clicking the submit button, 
  //this function creates a new list element with three sibling children: a <p> 
  //holding the task & two divs to check or delete a task. i,li,p,f,f

  function addItem() {
    //if the user types at least one letter
    if (input.value.length > 0){
      //create a <li> element with createElement
      var listElement = document.createElement('li');
      //give it a class using setAttribute
      listElement.setAttribute("class", "fadeable");
      // create a <p> element
      var pTag = document.createElement('p');
      //place <p> inside the <li> by appending it using appendChild
      listElement.appendChild(pTag);
      //make the innerText of the <p> element equal to the input value using innerText
      pTag.innerText = input.value;
      //add a delete link within the <li>
      listElement.appendChild(deleteTask());
      //add a crossoutlink within the <li>
      listElement.appendChild(crossOut());
      //place the complete <li> element to the task list
      list.appendChild(listElement);
      //compute current opacity of the <li>( set to 0 in the css.)
      var liOpacity = window.getComputedStyle(listElement).opacity;
      //then set the opacity to 1
      listElement.style.opacity = 1;
      // clear the input
      input.value = "";
      
      //create the container div for the note form and result
      var noteContainer = document.createElement('div');
      //give it a class of noNote since we havent written one yet.
      noteContainer.setAttribute("class", "noNote");
      //hide it initially by giving it 0 height and hiding the overflow we can set these elements here because we never want them to be modified via css
      noteContainer.style.height = "0px";
      noteContainer.style.overflow = "hidden";
      //create a span container for the textarea where we will type our note
      var textContainer = document.createElement('span');
      //create the textarea form which we will append to the container
      var noteTextArea = document.createElement('textarea');
      //create a new div for the button which will submit or edit notes.
      var noteBtn = document.createElement('div');
      //give the button a class
      noteBtn.setAttribute("class", "notebtn");
      //give the button some text
      noteBtn.innerHTML = "submit";
      //append the container for notes to the list element
      listElement.appendChild(noteContainer);
      //append the container for the note text to the note container
      noteContainer.appendChild(textContainer);
      //append the actual textarea to its container
      textContainer.appendChild(noteTextArea);
      //append the submit/edit button to the main container
      noteContainer.appendChild(noteBtn);
    
      //make the note submit/edit button  trigger the formToggle function 
      onEvent(noteBtn,"click", formToggle.bind(null, noteContainer,textContainer,noteTextArea,noteBtn));
      
      //make the tasks clickable and toggle note container on click.
      onEvent(pTag, "click", pToggle.bind(null, noteContainer,textContainer,noteBtn));  
      
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
    //'this' keyword refers to the item being clicked that triggers 
    //this function. Create a variable that stores the clicked item's 
    //parentNode into a variable. In this app the parentnode will refer to the <li> tag
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
    //use removeChild to remove the node to be deleted. For this to 
    //work we must first target the grandparent of the element triggering
    //the funtion ('this') then we target the parentnode of the same 
    //element. Then we attach the removeChild method to the grandparent, 
    //with the parent of 'this' as the value for removeChild.
    var parent = this.parentNode.parentNode;
    var child = this.parentNode;
    parent.removeChild(child);
  }
  
}

toDoList();
