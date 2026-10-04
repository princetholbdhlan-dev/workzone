import { useState } from "react";
import { Mail, Send } from "lucide-react";

import { api } from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      await api.post("/contact", form);

      setStatus(
        "Message sent successfully."
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      setStatus(
        error.message ||
        "Unable to send message."
      );
    }
  };

  return (
    <section className="section page-section">

      <div className="container">

        <div className="contact-grid">

          <div className="contact-info">

            <span className="section-badge">
              Contact
            </span>

            <h1>
              Let's talk about WorkZone.
            </h1>

            <p>
              Have a question, suggestion or
              feedback? Send us a message.
            </p>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={20} />
              </div>

              <div>
                <strong>Email</strong>
                <span>
                  support@workzone.example
                </span>
              </div>
            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label>Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>

            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
              />
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Send Message
              <Send size={18} />
            </button>

            {status && (
              <div className="form-status">
                {status}
              </div>
            )}

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;
