<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<link rel="stylesheet" href="css/maya.css" type="text/css">
<title>Maya Beautification Demo</title>
</head>

<body>
  <h1>Maya Beautification Demo</h1>
  <section id="app" hidden>
    <div class="container">
      <video id="monitor" autoplay></video>
    </div>
  </section>
  <p><button onclick="init(this)">Capture</button></p>
  <div id="splash">
    <p id="errorMessage">&uarr;<br>Click to begin</p>
  </div>

  <div id="gallery"></div>

  <canvas id="photo" style="display:none"></canvas>
  <script src="js/camera.js"></script>
</body>
</html>
