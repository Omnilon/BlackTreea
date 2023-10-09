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
});
