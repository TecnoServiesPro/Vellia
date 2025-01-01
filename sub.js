const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// إعداد تحليل JSON
app.use(bodyParser.json());

// إعداد Nodemailer مع Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mustafa019u18@gmail.com', // ضع بريدك الإلكتروني هنا
        pass: 'mustafa2008re-password',    // استخدم App Password من Gmail
    },
});

// Endpoint لاستقبال الاشتراكات وإرسال إشعارnode -v
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).send("Invalid email address.");
    }

    try {
        // إرسال بريد إلكتروني ترحيبي للمستخدم
        await transporter.sendMail({
            from: 'mustafa019u18@gmail.com', // بريدك الإلكتروني
            to: email,                    // البريد الإلكتروني للمستخدم
            subject: 'Welcome to our Newsletter!',
            text: 'Thank you for subscribing to our newsletter! Stay tuned for updates and special offers.',
        });

        console.log("Email sent to:", email);
        res.status(200).send("Subscription successful. Email sent.");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send email.");
    }
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
