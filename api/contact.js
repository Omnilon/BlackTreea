const axios = require('axios');

module.exports = async (req, res) => {
    const { orderName, address, paymentMethod, paymentDetails, name, message } = req.body;

    const TELEGRAM_TOKEN = '6338711548:AAHAdZ3MnM7M9IMTIEkC5Y-aoq-SvJNEx_s';
    const TELEGRAM_CHAT_ID = '6683416611';

    let text = '';

    if (orderName && address && paymentMethod && paymentDetails) {
        text = `New Order:\nName or Alias: ${orderName}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nPayment Details: ${paymentDetails}`;
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
