import DataBase from './db.js';
import { getFormData, addStudent } from './function.js';

const $studentsList = $('#students-list');
const $updateStudent = $('#update-student');
const $deleteStudent = $('#delete-student');
const $createStudent = $('#сreate-student');


const db = new DataBase('https://frontend-lectures.firebaseio.com', 1);
// console.log(db);

// db.deleteStudent('').then(response => {
//      console.log('response', response);
// });

db.getStudents().then(response => {

    const students = Object.entries(response).map((item) => {
        let [key, value] = item;
        // console.log('value', value);
        value.id = key;
        return value;
    });
    // console.log('students', students);

    students.forEach(student => {
        addStudent(student, $studentsList);
    });
});

$studentsList.on('click', '[data-id]', function(event) {
    event.preventDefault();

    const studentId = $(this).data('id');

    db.getStudent(studentId).then(response => {
        for (let key in response) {
            $updateStudent.find(`[name="${key}"]`).val(response[key]);
        }
        
        $updateStudent.find('[name="id"]').val(studentId);
    }); 
});

$updateStudent.on('submit', function(event) {
    event.preventDefault();

    const data = getFormData(this);

    // console.log(data);

    db.updateStudent(data.id, data).then(response => {
        console.log('response', response);

        $studentsList
        .find(`[data-id="${data.id}"]`)
            .text(`${response.firstname} ${response.lastname}`);
    });
});

$createStudent.on('submit', function(event) {
    event.preventDefault();

    const data = getFormData(this);
    
    db.createStudent(data).then(response => {
        data.id = response.name;
        addStudent(data, $studentsList);
    });
});