'use strict';
const studentEnrollForm = document.querySelector('.enrollment-form-container');
const overlay = document.querySelector('.overlay');
const enrollButton = document.querySelector('.button');
const userSpecificDetails = document.querySelector('.details');
const facultyHiringForm = document.querySelector('.faculty-container');
const enrollStudentBtn = document.querySelector('.enroll-student')
const hireFacultyBtn = document.querySelector('.hire-faculty');
const closeEnrollmentFormBtn = document.querySelector('.close-enrollment-form')
const closeFacultyFormBtn = document.querySelector('.close-faculty-form')
const userAllDetails = document.querySelector('.user-details');
const scheduleForm = document.querySelector('.schedule');
const enrollSuccessButton = document.querySelector('enroll-success-button')

//Home button - navbar
const homeBtnFunctionality = () => {
    studentEnrollForm.classList.add('hidden');
    facultyHiringForm.classList.add('hidden');

    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.schedule').classList.add('hidden');
    document.querySelector('.th-table-div').classList.add('hidden');
    document.querySelector('.st-table-div').classList.add('hidden');
    document.querySelector('.sch-table-div').classList.add('hidden');
    document.querySelector('.contact').classList.add('hidden');

    overlay.classList.add('hidden');
}
document.querySelector('.home-btn').addEventListener('click', homeBtnFunctionality)

//About section
const viewAbout = () => {
    document.querySelector('.about').classList.remove('hidden');
    overlay.classList.remove('hidden');
}
document.querySelector('.about-btn').addEventListener('click', viewAbout);
const closeAboutBtn = document.querySelector('.close-about')

const closeAbout = () => {
    document.querySelector('.about').classList.add('hidden');
    overlay.classList.add('hidden');
}
closeAboutBtn.addEventListener('click', closeAbout);
overlay.addEventListener('click', closeAbout)

//ACADEMICS --
//opening student enrollment form
const openStudentEnrollFormOnClick = function () {
    studentEnrollForm.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
enrollStudentBtn.addEventListener('click', openStudentEnrollFormOnClick);

//closing student enrollment form
const closeStudentEnrollFormOnClick = function () {
    studentEnrollForm.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeEnrollmentFormBtn.addEventListener('click', closeStudentEnrollFormOnClick)
overlay.addEventListener('click', closeStudentEnrollFormOnClick)

document.addEventListener('keydown', function (event) {
    // console.log(event.key);
    if (event.key === 'Escape' && !studentEnrollForm.classList.contains('hidden')) {
        closeStudentEnrollFormOnClick();
    }
});

//---------------------------------------------------
const cleanStudentFormAfterEnrollment = function () {
    document.getElementById('student-full-name').value = "";
    document.getElementById('student-class').value = "";
    document.getElementById('student-dob').value = "";
    document.getElementById('student-email').value = "";
    document.getElementById('student-phone').value = "";
}

let studentObj = {};
//Fetching data from local storage --
function getStudentData() {
    return localStorage.getItem('studentData') != null ? JSON.parse(localStorage.getItem("studentData")) : [];
}

// Adding-Enrolling students on local storage
const addStudentDetails = function () {
    event.preventDefault();
    const data = getStudentData();
    // console.log(data)

    let fullName = document.getElementById('student-full-name').value;
    let std = document.getElementById('student-class').value;
    let dob = document.getElementById('student-dob').value;
    let emailId = document.getElementById('student-email').value;
    let phoneNumber = document.getElementById('student-phone').value;
    let studentGender = document.getElementsByName('student-gender');
    let sGen;

    for (let i = 0; i < studentGender.length; i++) {
        if (studentGender[i].checked) {
            sGen = studentGender[i].value;
        }
    }

    const birthYr = dob.split("-")
    studentObj.fullName = fullName;
    const lastName = fullName.split(" ");
    studentObj.class = std;
    studentObj.dateOfBirth = dob;
    studentObj.email = emailId;
    studentObj.gender = sGen;
    studentObj.phoneNumber = phoneNumber;
    studentObj.uniqueId = lastName[1] + "@" + birthYr[2];

    data.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(data));

    // console.log(JSON.parse(localStorage.getItem("studentData")));
    cleanStudentFormAfterEnrollment();
    closeStudentEnrollFormOnClick();
}


//-------------------------------------------------
//opening faculty hiring form.
const openFacultyHiringForm = function () {
    facultyHiringForm.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
hireFacultyBtn.addEventListener('click', openFacultyHiringForm);

//closing faculty hiring form.
const closeFacultyHiringForm = function () {
    facultyHiringForm.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeFacultyFormBtn.addEventListener('click', closeFacultyHiringForm);
enrollButton.addEventListener('click', closeFacultyHiringForm);
overlay.addEventListener('click', closeFacultyHiringForm)

document.addEventListener('keydown', function (event) {
    // console.log(event.key);

    if (event.key === 'Escape' && !facultyHiringForm.classList.contains('hidden')) {
        closeFacultyHiringForm();
    }
});

const cleanTeacherForm = function () {
    document.getElementById('teacher-fullname').value = "";
    document.getElementById('teacher-subject').value = "";
    document.getElementById('teacher-exp').value = "";
    document.getElementById('teacher-email').value = "";
    document.getElementById('teacher-phone').value = "";
    document.getElementsByName('teacher-gender').checked = false;
}

//Hiring Faculty fucntionality
const getTeacherData = function () {
    return localStorage.getItem('teacherData') != null ? JSON.parse(localStorage.getItem('teacherData')) : [];
}

let teacherObj = {};
const addTeachers = function () {
    event.preventDefault();
    const data = getTeacherData();

    //Setting key value pair
    let fullName = document.getElementById('teacher-fullname').value;
    let subject = document.getElementById('teacher-subject').value;
    let exp = document.getElementById('teacher-exp').value;
    let email = document.getElementById('teacher-email').value;
    let phoneNumber = document.getElementById('teacher-phone').value;
    let teacherGender = document.getElementsByName('teacher-gender');

    let tGen;
    for (let i = 0; i < teacherGender.length; i++) {
        if (teacherGender[i].checked) {
            tGen = teacherGender[i].value;
        }
    }

    // console.log(tGen);
    const splitPhoneNum = phoneNumber.split("")
    const nameSplit = fullName.split(" ");
    teacherObj.fullName = fullName;
    teacherObj.subject = subject;
    teacherObj.experience = exp + " years";
    teacherObj.email = email;
    teacherObj.phoneNumber = phoneNumber;
    teacherObj.gender = tGen;
    teacherObj.uniqueId = splitPhoneNum[splitPhoneNum.length - 3] + splitPhoneNum[splitPhoneNum.length - 2] + splitPhoneNum[splitPhoneNum.length - 1] + "#" + nameSplit[0];

    data.push(teacherObj);
    localStorage.setItem("teacherData", JSON.stringify(data));

    cleanTeacherForm();
}


//------------------------------------------------------
//close student list table function
const closeStudentListTable = () => {
    document.querySelector('.st-table-div').classList.add('hidden');
    overlay.classList.add('hidden')
}
document.querySelector('.close-st').addEventListener('click', closeStudentListTable);

//fetch class to get the student list of that specific class
let studentsOfAppropriateClass;
function getAllStudentsOfSpecificClass() {
    const data = getStudentData();
    const queriedClass = Number(prompt("For which class you want the student list?"));
    if (queriedClass == null) {
        closeStudentListTable();
    }
    studentsOfAppropriateClass = data.filter(ele => ele.class == queriedClass);
    return studentsOfAppropriateClass;
    // console.log(studentsOfAppropriateClass);
}
document.querySelector('.student-list').addEventListener('click', getAllStudentsOfSpecificClass);

//-------------------------------------------------
//getting teacher list from the local storage.
function getAllTeacherList() {
    const data = getTeacherData();
    return data;
}

//--------------------------------------------------
// reseting schedule creation for after closing
const cleanScheduleForm = function () {
    document.getElementById('monday').value = "";
    document.getElementById('tuesday').value = "";
    document.getElementById('wednesday').value = "";
    document.getElementById('thursday').value = "";
    document.getElementById('friday').value = "";
}

//closing schedule form.
const closeScheduleForm = function () {
    document.querySelector('.schedule').classList.add('hidden');
    overlay.classList.add('hidden');
    cleanScheduleForm();
}
const scheduleFormCloseBtn = document.querySelector('.close-schedule-form');
scheduleFormCloseBtn.addEventListener('click', closeScheduleForm)
enrollButton.addEventListener('click', closeScheduleForm)

// opening schedule form
const openScheduleForm = function () {
    const scheduleForClass = prompt("For which class you want to plan the weekly schedule?")
    if (scheduleForClass == "" || scheduleForClass == null) {
        closeScheduleForm();
        return;
    }
    document.getElementById('class-number').innerText = scheduleForClass;
    document.querySelector('.schedule').classList.remove('hidden');
    overlay.classList.remove('hidden');
}
document.querySelector('.schedule-create').addEventListener('click', openScheduleForm);

//close by escape key
document.addEventListener('keydown', function (event) {
    // console.log(event.key);
    if (event.key === 'Escape' && !scheduleForm.classList.contains('hidden')) {
        closeScheduleForm();
    }
});

//getting schedule form local storage
const getSchedule = function () {
    return localStorage.getItem('scheduleData') != null ? JSON.parse(localStorage.getItem('scheduleData')) : [];
}

//Function for creating schedule.
let scheduleObj = {}
function addSchedule() {
    const data = getSchedule();
    event.preventDefault();

    let monSchedule = (document.getElementById('monday').value).split(",");
    let tueSchedule = (document.getElementById('tuesday').value).split(",");
    let wedSchedule = (document.getElementById('wednesday').value).split(",");
    let thursSchedule = (document.getElementById('thursday').value).split(",");
    let friSchedule = (document.getElementById('friday').value).split(",");

    scheduleObj.Monday = monSchedule
    scheduleObj.Tuesday = tueSchedule
    scheduleObj.Wednesday = wedSchedule
    scheduleObj.Thursday = thursSchedule
    scheduleObj.Friday = friSchedule

    data.push(scheduleObj);
    localStorage.setItem("scheduleData", JSON.stringify(data));

    cleanScheduleForm();
    closeScheduleForm();
}

//Function to view schedule after clicking the view button on nav bar
const viewSchedule = function () {
    const scheduleAskedForClass = Number(prompt("For which class you want to view the schedule ?"));
    if (scheduleAskedForClass == "" || scheduleAskedForClass == null) {
        closeScheduleForm();
        return;
    }
    const data = getSchedule(); //fetching schedule data from the local storage
    console.log(data[`${scheduleAskedForClass}` - 1]);
    const classScheduleData = data[`${scheduleAskedForClass}` - 1]
    //  console.log(x.Monday);
    return classScheduleData;
}


//--------------------------------------------------
const studentListBtn = document.querySelector('.student-list')
const studentTable = document.querySelector('.student-table')
//storing in table
const displayStudentTable = (student) => {
    let tr = studentTable.insertRow(-1);
    tr.innerHTML = `
    <td>${student.fullName}</td>
    <td>${student.uniqueId}</td>
    <td>${student.dateOfBirth}</td>
    <td>${student.gender}</td>
    <td>${student.phoneNumber}</td>
    <td>${student.email}</td>`
}

//getting table of student list
const openStudentListOfClass = function () {
    document.querySelector('.st-table-div').classList.remove('hidden');
    document.querySelector('.st').classList.remove('hidden');
    overlay.classList.remove('hidden')
    studentTable.innerHTML = "";
    for (let student of studentsOfAppropriateClass) {
        displayStudentTable(student);
    }
}
studentListBtn.addEventListener('click', openStudentListOfClass)


//---------------------------------------------------
//Teacher table list 
const closeTeacherTable = () => {
    document.querySelector('.th-table-div').classList.add('hidden');
    overlay.classList.add('hidden')
}
document.querySelector('.close-th').addEventListener('click', closeTeacherTable);

const teacherListBtn = document.querySelector('.teacher-list')
const teacherTable = document.querySelector('.teacher-table')

//adding data in table of teacher
const displayTeacherTable = (teacher) => {
    let tr = teacherTable.insertRow(-1);
    tr.innerHTML = `
    <td>${teacher.fullName}</td>
    <td>${teacher.uniqueId}</td>
    <td>${teacher.subject}</td>
    <td>${teacher.email}</td>
    <td>${teacher.phoneNumber}</td>
    <td>${teacher.experience}</td>
    <td>${teacher.gender}</td>`
}

//teacher list table function
const openTeacherList = function () {
    document.querySelector('.th-table-div').classList.remove('hidden');
    document.querySelector('.th').classList.remove('hidden');
    overlay.classList.remove('hidden');
    teacherTable.innerHTML = "";
    const res = getAllTeacherList();
    // console.log(res);
    for (const teacher of res) {
        displayTeacherTable(teacher);
    }
}
teacherListBtn.addEventListener('click', openTeacherList);



//---------------------------------------------------------
const time_table = document.querySelector('.time-table')
//adding data in table
function displaySch(weekday, tt) {
    let tr = time_table.insertRow(-1);
    tr.innerHTML = `
    <td>${weekday}</td>
    <td>${tt[0]}</td>
    <td>${tt[1]}</td>
    <td>${tt[2]}</td>
    <td>${tt[3]}</td>
    `
}

//view schedule of specific class
const viewScheduleTable = () => {
    document.querySelector('.sch-table-div').classList.remove('hidden')
    // document.querySelector('.schedule-table').classList.remove('hidden')
    overlay.classList.remove('hidden');
    time_table.innerHTML = "";
    const obj = viewSchedule();
    console.log(obj);
    const days = ["Monday", "Tuesday", "Wednesday", 'Thursday', 'Friday'];
    // console.log(obj.Monday);
    for (const weekday of days) {
        displaySch(weekday, obj[weekday]);
        console.log(weekday, obj[weekday]);
    }
}
document.querySelector('.schedule-view').addEventListener('click', viewScheduleTable);

//close schedule table list function
const closeScheduleTable = () => {
    document.querySelector('.sch-table-div').classList.add('hidden')
    // document.querySelector('.schedule-table').classList.add('hidden')
    overlay.classList.add('hidden');
}
document.querySelector('.close-sch').addEventListener('click', closeScheduleTable);
overlay.addEventListener('click', closeScheduleTable);

//Contact form opening
const openContact=()=>{
    document.querySelector('.contact').classList.remove('hidden');
    overlay.classList.remove('hidden');
}
document.querySelector('.contact-btn').addEventListener('click',openContact);
overlay.addEventListener('click', openContact)

//contact form closing
const closeContact=()=>{
    document.querySelector('.contact').classList.add('hidden');
    overlay.classList.add('hidden');
}
document.querySelector('.close-con').addEventListener('click', closeContact)
