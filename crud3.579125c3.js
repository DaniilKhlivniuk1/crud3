const API_URL = 'http://localhost:54429/';
document.getElementById('get-students-btn').addEventListener('click', getStudents);
document.getElementById('add-student-form').addEventListener('submit', addStudent);
async function getStudents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u0456 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0456\u0432");
        const data = await response.json();
        renderStudents(data);
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 GET:", error);
    }
}
function renderStudents(students) {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = '';
    students.forEach((student)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "\u0422\u0430\u043A" : "\u041D\u0456"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${student.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `;
        tbody.appendChild(tr);
    });
}
async function addStudent(e) {
    e.preventDefault();
    const student = {
        name: document.getElementById('name').value,
        age: Number(document.getElementById('age').value),
        course: document.getElementById('course').value,
        skills: document.getElementById('skills').value.split(',').map((skill)=>skill.trim()),
        email: document.getElementById('email').value,
        isEnrolled: document.getElementById('isEnrolled').checked
    };
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0434\u043E\u0434\u0430\u0432\u0430\u043D\u043D\u0456 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
        getStudents();
        e.target.reset();
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 POST:", error);
    }
}
async function updateStudent(id) {
    const newName = prompt("\u041D\u043E\u0432\u0435 \u0456\u043C'\u044F:");
    if (!newName) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName
            })
        });
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0456 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
        getStudents();
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 PATCH:", error);
    }
}
async function deleteStudent(id) {
    if (!confirm("\u0422\u043E\u0447\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u044C\u043E\u0433\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u0456 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430");
        getStudents();
    } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 DELETE:", error);
    }
}

//# sourceMappingURL=crud3.579125c3.js.map
