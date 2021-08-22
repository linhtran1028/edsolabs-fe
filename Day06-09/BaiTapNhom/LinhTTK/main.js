import autoPoints from './createPoint.js'
import inputName from './findMember.js'
import data from "./listStudent.json" assert { type: "json" };
console.log(data);

const btnSearch = document.querySelector('.btn2')
const btnAutoPoint = document.querySelector('.btn1')


btnAutoPoint.addEventListener('click', autoPoints)
btnSearch.addEventListener('click', inputName)