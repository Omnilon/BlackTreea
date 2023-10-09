const axios = require('axios');

module.exports = async (req, res) => {
    const { igName, phoneNumber, address, mailboxDropoff, paymentMethod, paymentDetails, treeSelection } = req.body;

    const TELEGRAM_TOKEN = '6501676804:AAEOKcy_JfF-W7IxXZyT8k5Qvn7zyHiHptc';
    const TELEGRAM_CHAT_ID = '1055897795';

    const treePrices = {
        "Oak - $10": 10,
        "Pine - $15": 15,
        "Birch - $20": 20,
        "Maple - $25": 25
    };

    let text = '';

    if (igName && phoneNumber && address && paymentMethod && paymentDetails && treeSelection) {
        let total = 0;
        treeSelection.forEach(tree => {
            total += treePrices[tree];
        });
        text = `New Order:
IG Name or Alias: ${igName}
Phone Number: ${phoneNumber}
Address: ${address}
Mailbox Dropoff: ${mailboxDropoff ? 'Yes' : 'No'}
Tree(s) From the Menu: ${treeSelection.join(', ')}
Total Price: $${total}
Payment Method: ${paymentMethod}
Payment Details: ${paymentDetails}`;
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
