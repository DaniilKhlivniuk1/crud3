let API_URL="http://localhost:54429/";async function getStudents(){try{let t=await fetch(API_URL);if(!t.ok)throw Error("Помилка при завантаженні студентів");let e=await t.json();renderStudents(e)}catch(t){console.error("Помилка GET:",t)}}function renderStudents(t){let e=document.querySelector("#students-table tbody");e.innerHTML="",t.forEach(t=>{let n=document.createElement("tr");n.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${t.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `,e.appendChild(n)})}async function addStudent(t){t.preventDefault();let e={name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked};try{if(!(await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw Error("Помилка при додаванні студента");getStudents(),t.target.reset()}catch(t){console.error("Помилка POST:",t)}}async function updateStudent(t){let e=prompt("Нове ім'я:");if(e)try{if(!(await fetch(`${API_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})})).ok)throw Error("Помилка при оновленні студента");getStudents()}catch(t){console.error("Помилка PATCH:",t)}}async function deleteStudent(t){if(confirm("Точно видалити цього студента?"))try{if(!(await fetch(`${API_URL}/${t}`,{method:"DELETE"})).ok)throw Error("Помилка при видаленні студента");getStudents()}catch(t){console.error("Помилка DELETE:",t)}}document.getElementById("get-students-btn").addEventListener("click",getStudents),document.getElementById("add-student-form").addEventListener("submit",addStudent);
//# sourceMappingURL=crud3.3823eb2d.js.map
