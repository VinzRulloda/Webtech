function updateTimestamp() {
    var video = document.getElementById('vidPlayer');
    localStorage.setItem('videoTimestamp', video.currentTime);
}

function setVideoTimestamp() {
    var video = document.getElementById('vidPlayer');
    var timestamp = localStorage.getItem('videoTimestamp');
    if (timestamp) {
        video.currentTime = parseFloat(timestamp);
    }
}   
function remove_video(id, file_path) {
    fetch("remove_video.php", {
        method: "POST",
        body: JSON.stringify({
            videoid: id,
            path: file_path,
    }),
    headers: {
        "Content-type": "application/json"
    }
    }).then(() => {
        window.location.reload();
    });

}

$('#viewScheduleModal').on('show.bs.modal', e => {
    var schedule_id = $(e.relatedTarget).data('id');
    console.log(schedule_id);

    fetch("schedule_list.php", {
        method: "POST",
        body: JSON.stringify({
            schedule_id: schedule_id
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((result) => {
        let tableData = "";
        if (result['success'] == true && result['dataCount'] > 0) {
            result.data.forEach(video => {
                // console.log(video.id);
                tableData += `
                <tr>
                    <td>${video.sequence}</td>
                    <td>${video.title}</td>
                    <td>${video.file_path}</td>
                    <td>${video.uploaded_by}</td>
                    <td>Actions</td>
                </tr>`

            });
        } else {
            tableData = `
            <tr>
                <td>No data found.</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            `

        }
        document.getElementById("videoTableBody").innerHTML = tableData

    });

})

