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
function remove_video(id, file_path, schedule_id) {
    fetch("remove_video.php", {
        method: "POST",
        body: JSON.stringify({
            videoid: id,
            path: file_path,
            schedule_id: schedule_id,
    }),
    headers: {
        "Content-type": "application/json"
    }
    }).then(() => {
        const schedule_id = $('#schedule_id').val();
        fetch_video_list(schedule_id);

    });

}

$('#viewScheduleModal').on('show.bs.modal', e => {
    var schedule_id = $(e.relatedTarget).data('id');
    $('#schedule_id').val(schedule_id);
    fetch_video_list(schedule_id);
})

function fetch_video_list(schedule_id) {
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
                tableData += `
                <tr>
                    <td>${video.sequence}</td>
                    <td>${video.title}</td>
                    <td>${video.file_path}</td>
                    <td>${video.uploaded_by}</td>
                    <td>
                        <button class="btn btn-danger" onclick="remove_video('${video.id}', '${video.file_path}', '${video.schedule_id}')">
                            Remove
                        </button>
                    </td>
                </tr>`;

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

}

