const axios = require('axios');

module.exports = async (req, res) => {
    const { name, message } = req.body;

    const TELEGRAM_TOKEN = '6338711548:AAHAdZ3MnM7M9IMTIEkC5Y-aoq-SvJNEx_s';
    const TELEGRAM_CHAT_ID = '@BlackTreea';

    const text = `New Contact Message:\nName: ${name}\nMessage: ${message}`;

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
