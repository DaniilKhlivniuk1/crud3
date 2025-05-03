let api="https://680dfedbc47cb8074d91bfe7.mockapi.io/ap/post/users";async function getStudents(){try{let t=await fetch(api),e=await t.json();renderStudents(e)}catch(t){console.error("GET error:",t)}}function renderStudents(t){let e=document.querySelector("#students-table tbody");e.innerHTML="",t.forEach(t=>{let n=document.createElement("tr");n.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills?.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${t.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `,e.appendChild(n)})}async function addStudent(t){t.preventDefault();let e={name:document.getElementById("name").value,age:Number(document.getElementById("age").value),course:document.getElementById("course").value,skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:document.getElementById("email").value,isEnrolled:document.getElementById("isEnrolled").checked};try{await fetch(api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),getStudents(),t.target.reset()}catch(t){console.error("POST error:",t)}}async function updateStudent(t){let e=prompt("Нове ім'я:");if(e)try{await fetch(`${api}/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})}),getStudents()}catch(t){console.error("UPDATE error:",t)}}async function deleteStudent(t){if(confirm("Ви впевнені, що хочете видалити цього студента?"))try{await fetch(`${api}/${t}`,{method:"DELETE"}),getStudents()}catch(t){console.error("DELETE error:",t)}}document.getElementById("get-students-btn").addEventListener("click",getStudents),document.getElementById("add-student-form").addEventListener("submit",addStudent);
//# sourceMappingURL=crud3.2086ca9b.js.map
