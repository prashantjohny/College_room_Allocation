const API = "http://127.0.0.1:8000/api";

function addClassroom() {
    const data = {
        room_id: document.getElementById("roomId").value,
        capacity: document.getElementById("capacity").value,
        floor_no: document.getElementById("floorNo").value,
        near_washroom: document.getElementById("washroom").checked
    };

    fetch(`${API}/add-classroom/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        displayClassrooms();
        alert("Classroom added successfully");
    });
}

function displayClassrooms() {
    fetch(`${API}/classrooms/`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("classroomTable");
            table.innerHTML = "";
            data.forEach(r => {
                table.innerHTML += `
                    <tr>
                        <td>${r.room_id}</td>
                        <td>${r.capacity}</td>
                        <td>${r.floor_no}</td>
                        <td>${r.near_washroom ? "Yes" : "No"}</td>
                    </tr>`;
            });
        });
}

function allocateSeats() {
    const students = document.getElementById("students").value;
    const result = document.getElementById("result");

    fetch(`${API}/allocate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students })
    })
    .then(res => res.json())
    .then(data => {
        result.innerHTML = "";
        if (data.error) {
            result.innerHTML = `<span style="color:red">${data.error}</span>`;
            return;
        }
        data.allocated.forEach(r => {
            result.innerHTML += `
                ${r.room_id} | Capacity: ${r.capacity} | Floor: ${r.floor_no}<br>
            `;
        });
    });
}

/* Auto-load classrooms */
displayClassrooms();
pyt