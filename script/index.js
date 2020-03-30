import DataBase from './db.js';
const $studentsList = $('#students-list');
const $updateStudent = $('#update-student');
const $deleteStudent = $('#delete-student');


const db = new DataBase('https://frontend-lectures.firebaseio.com', 1);
// console.log(db);

db.deleteStudent('-M3SWENqcMXppikXVzLl').then(response => {
     console.log('response', response);
});

db.getStudents().then(response => {
    // console.log('response', response);

    const students = Object.entries(response).map((item) => {
        let [key, value] = item;
        // console.log('value', value);
        value.id = key;
        return value;
    });
    // console.log('students', students);

    students.forEach(student => {
        $('<a>').text(`${student.firstname} ${student.lastname}`)
                .addClass('list-group-item')
                .attr({'data-id': student.id,
                        'href': ''})
                .appendTo($studentsList);
    });
});

$studentsList.on('click', '[data-id]', function(event) {
    event.preventDefault();

    const studentId = $(this).data('id');

    db.getStudent(studentId).then(response => {
        // console.log('response', response);
        for (let key in response) {
            $updateStudent.find(`[name="${key}"]`).val(response[key]);
        }
        
    }); 
});

$updateStudent.on('submit', function(event) {
    event.preventDefault();

    const elements = Array.from(this.elements);
    // console.log(elements);

    const data = {};
    elements.forEach(item => {
        const name = $(item).attr('name');
        if (!name) return;

        const value = $(item).val();

        // console.log($(item).attr('name'));
        // console.log($(item).val());

        data[name] = value;
    });

    // console.log(data);
});
