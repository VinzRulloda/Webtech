document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("vidPlayer")
    video.play();
  
    video.addEventListener("ended", function () {
      video.src = "assets/videos/sample2.mp4"

      video.onload();
  
      video.play();
    })
  })
  