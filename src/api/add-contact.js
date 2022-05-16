import SendGrid from "@sendgrid/client"

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Incorrect request" })
  }

  if (!req.body?.email_address) {
    res
      .status(400)
      .json({ error: "An email address is required to add a contact" })
  }

  SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

  const contactData = {
    contacts: [
      {
        email: req.body.email_address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
    ],
    list_ids: ["8400711a-65c2-4993-86a7-850a35c71957"],
  }

  const request = {
    method: "PUT",
    url: "/v3/marketing/contacts",
    body: contactData,
  }

  SendGrid.request(request)
    .then(([response]) => {
      res.status(response.statusCode).json(response.body)
    })
    .catch(() => {
      res.status(400).json({
        error: "There was a problem adding you to the newsletter list.",
      })
    })
}
