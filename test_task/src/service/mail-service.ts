import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import 'dotenv/config'

class MailService {
    transporter: any
    constructor() {
        const transporter = (this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS
            }
        } as SMTPTransport.Options))
    }
    async sendActivationMail(email: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: email,
            subject: 'Активация:' + (process.env.API_URL as string),
            text: `dada...${process.env.API_URL as string}`,
            html:
                `<div> ` +
                `<h1>Ссылка для активации</h1>` +
                ` <a href="${link}">${link}</a>` +
                `</div>`
        })
    }
}

export default new MailService()
