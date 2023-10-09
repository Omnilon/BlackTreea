document.addEventListener('DOMContentLoaded', function() {
    const treeSelection = document.getElementById('treeSelection');
    const totalPrice = document.getElementById('totalPrice');
    const treePrices = {
        "Oak - $10": 10,
        "Pine - $15": 15,
        "Birch - $20": 20,
        "Maple - $25": 25
    };

    treeSelection.addEventListener('change', function() {
        let total = 0;
        for (let option of treeSelection.selectedOptions) {
            total += treePrices[option.value];
        }
        totalPrice.textContent = "Total: $" + total;
    });

    fetch('/cutOffTime.json')
    .then(response => response.json())
    .then(data => {
        // Convert 24-hour format to 12-hour format
        let [hours, minutes] = data.time.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const displayTime = hours + ':' + minutes + ' ' + ampm;
        document.getElementById('cutOffTime').textContent = displayTime;
    });
});
