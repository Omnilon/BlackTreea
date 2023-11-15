const axios = require('axios');
const cutOffTime = require('../cutOffTime.json'); // Importing the cutOffTime.json file

// Convert 12-hour format time to minutes since midnight
function timeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM') {
        hours = (hours % 12) + 12;
    }
    return hours * 60 + minutes;
}

module.exports = async (req, res) => {
    let { igName, phoneNumber, address, mailboxDropoff, paymentMethod, paymentDetails, customRequest, name, message } = req.body;

    const TELEGRAM_TOKEN = '6913432492:AAGa29FveSNMA7VJ3WYl_4DQ8IhlCAHg6mY';
    const TELEGRAM_CHAT_ID1 = '6683416611';
    const TELEGRAM_CHAT_ID2 = '1055897795';
    
    const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    const cutOffMinutes = timeToMinutes(cutOffTime.time); // Using the function to get cut-off minutes

    let afterCutOff = currentMinutes > cutOffMinutes;

    let text = '';

    if (igName && address && paymentMethod && paymentDetails && customRequest) {
        text = `New Order:\nIG Name or Alias: ${igName}\nPhone Number: ${phoneNumber}\nAddress: ${address}\nMailbox Dropoff: ${mailboxDropoff ? 'Yes' : 'No'}\nCustom Request: ${customRequest}\nPayment Method: ${paymentMethod}\nPayment Details: ${paymentDetails}`;
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
        // Send message to the first Telegram account
        const response1 = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID1,
            text: text
        });
        console.log('Message sent to first account:', response1.data);
    
        // Send message to the second Telegram account
        const response2 = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID2,
            text: text
        });
        console.log('Message sent to second account:', response2.data);
    
        res.status(200).send('Order Submitted.');
    } catch (error) {
        console.error('Error sending message to Telegram:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to send message.');
    }
};    