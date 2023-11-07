document.addEventListener('DOMContentLoaded', function() {
    fetch('/cutOffTime.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('cutOffTime').textContent = data.time;
    });
});
