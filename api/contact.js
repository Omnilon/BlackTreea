const axios = require('axios');

module.exports = async (req, res) => {
    const { orderName, address, paymentMethod, paymentDetails, treeSelection, name, message } = req.body;

    const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_TOKEN';
    const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

    let text = '';
    const treePrices = {
        "Oak": 50,
        "Pine": 40,
        "Birch": 45,
        "Maple": 55
    };

    if (orderName && address && paymentMethod && paymentDetails && treeSelection) {
        let total = 0;
        treeSelection.forEach(tree => {
            let treeName = tree.split(' - ')[0];
            total += treePrices[treeName];
        });
        text = `New Order:\nName or Alias: ${orderName}\nAddress: ${address}\nTree(s) From the Menu: ${treeSelection.join(', ')}\nTotal Price: $${total}\nPayment Method: ${paymentMethod}\nPayment Details: ${paymentDetails}`;
    } else if (name && message) {
        text = `New Contact Message:\nName: ${name}\nMessage: ${message}`;
    } else {
        res.status(400).send('Invalid form submission.');
        return;
    }

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: text
        });
        res.status(200).send('Message sent successfully.');
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).send('Failed to send message.');
    }
};
