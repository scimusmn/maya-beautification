/**
 * screensaver.js
 * After 3 minutes of inactivity, show a full-screen video as a screensaver.
 * See http://stackoverflow.com/a/4029518
 */
$(function () {

  // Reload the page after 3 minutes of inactivity
  idleTime = 0;

  // Increment the idle time counter every minute.
  var idleInterval = setInterval('timerIncrement()', 60000); // 1 minute

  // Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
    idleTime = 0;
  });
  $(this).keypress(function (e) {
    idleTime = 0;
  });

});

/*
 * Reload the page after 3 minutes of inactivity.
 * See http://stackoverflow.com/a/4029518
*/
function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > 2) { // 3 minutes
    window.location.reload();
  }
}
