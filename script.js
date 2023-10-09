document.addEventListener('DOMContentLoaded', function() {
    const treeSelection = document.getElementById('treeSelection');
    const totalPrice = document.getElementById('totalPrice');
    const treePrices = {
        "Oak": 50,
        "Pine": 40,
        "Birch": 45,
        "Maple": 55
    };

    treeSelection.addEventListener('change', function() {
        let total = 0;
        for (let option of treeSelection.selectedOptions) {
            let treeName = option.text.split(' - ')[0];
            total += treePrices[treeName];
        }
        totalPrice.textContent = "Total: $" + total;
    });
});
