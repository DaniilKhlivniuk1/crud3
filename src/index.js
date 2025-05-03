const api = 'https://680dfedbc47cb8074d91bfe7.mockapi.io/ap/post/users';

document.getElementById('get-students-btn').addEventListener('click', getStudents);
document.getElementById('add-student-form').addEventListener('submit', addStudent);

async function getStudents() {
  try {
    const res = await fetch(api);
    const data = await res.json();
    renderStudents(data);
  } catch (err) {
    console.error('GET error:', err);
  }
}

function renderStudents(students) {
  const tbody = document.querySelector('#students-table tbody');
  tbody.innerHTML = '';
  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills?.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function addStudent(e) {
  e.preventDefault();
  const student = {
    name: document.getElementById('name').value,
    age: Number(document.getElementById('age').value),
    course: document.getElementById('course').value,
    skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
    email: document.getElementById('email').value,
    isEnrolled: document.getElementById('isEnrolled').checked
  };

  try {
    await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    getStudents();
    e.target.reset();
  } catch (err) {
    console.error('POST error:', err);
  }
}

async function updateStudent(id) {
  const updatedName = prompt('Нове ім\'я:');
  if (!updatedName) return;

  try {
    await fetch(`${api}/${id}`, {
      method: 'PUT', // или PATCH, если хочешь частично
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updatedName })
    });
    getStudents();
  } catch (err) {
    console.error('UPDATE error:', err);
  }
}

async function deleteStudent(id) {
  if (!confirm('Ви впевнені, що хочете видалити цього студента?')) return;

  try {
    await fetch(`${api}/${id}`, {
      method: 'DELETE'
    });
    getStudents();
  } catch (err) {
    console.error('DELETE error:', err);
  }
}