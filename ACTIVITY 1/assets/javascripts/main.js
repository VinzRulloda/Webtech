/* mouse hover */
<script>
      $('button').mouseover(() => {
         $('.container').css("display", "block")
      })
      $('button').mouseout(() => {
         $('.container').css("display", "none")
      })
</script>