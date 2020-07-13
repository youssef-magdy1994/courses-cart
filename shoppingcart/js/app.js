/*jshint esversion: 6 */


// setup localStorage of cartCourses
setupCourseslocalStorage();

// change buttons of selected courses form local Storage onload
loadLocalCourses();
//print localStorage courses onload
printStorageCourses();

// add eventlistener to courses' buttons
let coursesList = document.querySelector("#courses-list");
coursesList.addEventListener("click", addRemoveCourse);

// add eventListener to the cart table's body (remove & clear)
let shoppingCart = document.querySelector("#shopping-cart");
shoppingCart.addEventListener("click",addRemoveCourse);

//                              --- functions ---

// localStorage of cartCourses
function setupCourseslocalStorage() {
  //check the existence of cartCourses item in localStorage
  if (localStorage.getItem("cartCourses") === null) {
    localStorage.setItem("cartCourses", "[]");
  }
}
// get array of localStorage item
function getLocalStorageItem(item) {
  return JSON.parse(localStorage.getItem(item));
}
// set the localStorage item to an array parameter
function setLocalStorageItem(item, content) {
  localStorage.setItem(item, JSON.stringify(content));
}


// add / remove courses form storage event function
function addRemoveCourse(e) {
  e.preventDefault();
  // select the primary button
  if (e.target.classList.contains("button-primary")){
    // create course object to be added in localStorage
    let course = {
      image: e.target.parentElement.parentElement.querySelector("img").src,
      name: e.target.parentElement.querySelector("h4").textContent,
      price: e.target.parentElement.querySelector("p span").textContent,
      id: e.target.getAttribute("data-id")
    };
    // add course object to localStorage
    if (e.target.textContent === "Add to Cart") {
      let cartArray = getLocalStorageItem("cartCourses");
      cartArray.push(course);
      setLocalStorageItem("cartCourses", cartArray);
      printStorageCourses();
      //change the button's text
      e.target.textContent = "Remove from Cart";
    }
    // remove course by clicking "Remove from Cart" button
    else if (e.target.textContent === "Remove from Cart") {
      removecourse(course.id);
      e.target.textContent = "Add to Cart";
    }
  }
  // remove course by the remove button on the cart
  else if(e.target.className === "remove"){
    removecourse(e.target.getAttribute("data-id"));
    // Clear cart button
  }else if(e.target.id === "clear-cart"){
    setLocalStorageItem("cartCourses", []);
    loadLocalCourses();
    printStorageCourses();
  }

}

// print courses from local storage to the cart
function printStorageCourses() {
  // select the body of the cart's table
  let cartBody = document.querySelector("#cart-content tbody");
  // create new element to receive courses from localStorage
  let newCart = document.createElement("tbody");
  getLocalStorageItem("cartCourses").forEach(c => {
    newCart.innerHTML += `
      <td><img src=${c.image} width="100"></td>
      <td>${c.name}</td>
      <td>${c.price}</td>
      <td><a href="#" class="remove" data-id="${c.id}">X</a></td>

    `;
  });
  // replace the old cart's body with the new one
  cartBody.parentElement.replaceChild(newCart, cartBody);
}
//remove course
function removecourse(ID) {
  // filter the localStorage array form the removed course
  let filteredArray = getLocalStorageItem("cartCourses").filter(c => c.id !== ID);
  setLocalStorageItem("cartCourses", filteredArray);
  printStorageCourses();
  loadLocalCourses();
}

// change buttons of selected courses form local Storage onload or change
function loadLocalCourses(){
  //select courses' buttons
  let buttons = document.querySelectorAll(".info-card a");
  // make array of courses' buttons ID
  let buttonsId = Array.from(buttons).map(b=>b.getAttribute("data-id"));
  // loop over the array of courses' buttons ID to check it's existence in localStorage
  buttonsId.forEach((btnId,index)=>{
    if(getLocalStorageItem("cartCourses").map(c=>c.id).indexOf(btnId) !== -1){
      buttons[index].textContent = "Remove from Cart";
    }else{
      buttons[index].textContent = "Add to Cart";
    }
  });
}
