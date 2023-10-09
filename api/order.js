const axios = require('axios');
const cutOffTime = require('../cutOffTime.json'); // Assuming your order.js is inside an 'api' folder

module.exports = async (req, res) => {
    let { igName, phoneNumber, address, mailboxDropoff, paymentMethod, paymentDetails, treeSelection, name, message } = req.body;

    const TELEGRAM_TOKEN = '6501676804:AAEOKcy_JfF-W7IxXZyT8k5Qvn7zyHiHptc';
    const TELEGRAM_CHAT_ID = '1055897795';

    console.log("Before conversion: ", typeof treeSelection, treeSelection);

    // Ensure treeSelection is always an array
    if (!Array.isArray(treeSelection)) {
        treeSelection = [treeSelection];
    }

    console.log("After conversion: ", typeof treeSelection, treeSelection);

    let text = '';
    const treePrices = {
        "Oak": 50,
        "Pine": 40,
        "Birch": 45,
        "Maple": 55
    };

    let afterCutOff = false;
    if (new Date().getHours() * 60 + new Date().getMinutes() > parseInt(cutOffTime.time.split(':')[0]) * 60 + parseInt(cutOffTime.time.split(':')[1])) {
        afterCutOff = true;
    }

    if (igName && address && paymentMethod && paymentDetails && treeSelection) {
        let total = 0;
        treeSelection.forEach(tree => {
            let treeName = tree.split(' - ')[0];
            total += treePrices[treeName];
        });
        text = `New Order:\nIG Name or Alias: ${igName}\nPhone Number: ${phoneNumber}\nAddress: ${address}\nMailbox Dropoff: ${mailboxDropoff ? 'Yes' : 'No'}\nTree(s) From the Menu: ${treeSelection.join(', ')}\nTotal Price: $${total}\nPayment Method: ${paymentMethod}\nPayment Details: ${paymentDetails}`;
        if (afterCutOff) {
            text += "\n\nNote: This order has been made after the cut-off time!";
        }
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
