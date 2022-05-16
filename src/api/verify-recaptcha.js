import fetch from "node-fetch"

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Incorrect request" })
  }

  if (!req.body?.token) {
    res.status(400).json({ error: "Token required for captcha validation" })
  }

  fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: `POST`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`,
  })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        res.status(200).json({ success: true })
      } else {
        res.status(400).json({ error: json["error-codes"] })
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
