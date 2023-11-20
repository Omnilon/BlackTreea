document.addEventListener('DOMContentLoaded', function() {
    fetch('/cutOffTime.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('cutOffTime').textContent = data.time;
    });
});
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4669381329390831"
crossorigin="anonymous"></script>