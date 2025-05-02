const API_URL = 'http://localhost:54429/';

document.getElementById('get-students-btn').addEventListener('click', getStudents);
document.getElementById('add-student-form').addEventListener('submit', addStudent);

async function getStudents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Помилка при завантаженні студентів');
    const data = await response.json();
    renderStudents(data);
  } catch (error) {
    console.error('Помилка GET:', error);
  }
}

function renderStudents(students) {
  const tbody = document.querySelector('#students-table tbody');
  tbody.innerHTML = '';

  students.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
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
    skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
    email: document.getElementById('email').value,
    isEnrolled: document.getElementById('isEnrolled').checked
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!response.ok) throw new Error('Помилка при додаванні студента');
    getStudents();
    e.target.reset();
  } catch (error) {
    console.error('Помилка POST:', error);
  }
}

async function updateStudent(id) {
  const newName = prompt('Нове ім\'я:');
  if (!newName) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    });
    if (!response.ok) throw new Error('Помилка при оновленні студента');
    getStudents();
  } catch (error) {
    console.error('Помилка PATCH:', error);
  }
}

async function deleteStudent(id) {
  if (!confirm('Точно видалити цього студента?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Помилка при видаленні студента');
    getStudents();
  } catch (error) {
    console.error('Помилка DELETE:', error);
  }
}