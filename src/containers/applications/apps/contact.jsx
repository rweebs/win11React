import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToolBar, LazyComponent } from "../../../utils/general";
import "./assets/contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faInbox,
    faPaperPlane,
    faCheck,
    faPen,
} from "@fortawesome/free-solid-svg-icons";

export const ContactApp = () => {
    const wnapp = useSelector((state) => state.apps.contactme);
    const [sent, setSent] = useState(false);
    const [activeFolder, setActiveFolder] = useState("compose");
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "General Hello",
        message: "",
    });

    if (!wnapp) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { name, email, subject, message } = form;
        const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
        const mailtoBody = encodeURIComponent(
            `Hi Rahmat,\n\nName: ${name}\nEmail: ${email}\n\n${message}`
        );
        window.open(
            `mailto:rahmat.wibowo21@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
            "_blank"
        );
        setSent(true);
    };

    const resetForm = () => {
        setSent(false);
        setForm({
            name: "",
            email: "",
            subject: "General Hello",
            message: "",
        });
    };

    return (
        <div
            className="contactApp floatTab dpShad"
            data-size={wnapp.size}
            data-max={wnapp.max}
            style={{
                ...(wnapp.size == "cstm" ? wnapp.dim : null),
                zIndex: wnapp.z,
            }}
            data-hide={wnapp.hide}
            id={wnapp.icon + "App"}
        >
            <ToolBar
                app={wnapp.action}
                icon={wnapp.icon}
                size={wnapp.size}
                name="Contact Me"
            />
            <div className="windowScreen flex" data-dock="true">
                <LazyComponent show={!wnapp.hide}>
                    {/* Sidebar */}
                    <div className="contactSidebar">
                        <div className="sidebarTitle">
                            <FontAwesomeIcon icon={faEnvelope} />
                            Mail
                        </div>
                        <div className="folderList">
                            <div
                                className="folderItem"
                                data-active={activeFolder === "compose"}
                                onClick={() => setActiveFolder("compose")}
                            >
                                <FontAwesomeIcon icon={faPen} />
                                <span>Compose</span>
                            </div>
                            <div
                                className="folderItem"
                                data-active={activeFolder === "inbox"}
                                onClick={() => setActiveFolder("inbox")}
                            >
                                <FontAwesomeIcon icon={faInbox} />
                                <span>Inbox</span>
                            </div>
                            <div
                                className="folderItem"
                                data-active={activeFolder === "sent"}
                                onClick={() => setActiveFolder("sent")}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                                <span>Sent</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="contactContent win11Scroll">
                        {activeFolder === "compose" && !sent && (
                            <>
                                <div className="contactHeader">
                                    <div className="contactTitle">Get in Touch</div>
                                    <div className="contactSubtitle">
                                        Send me a message and I&apos;ll get back to you as soon as
                                        possible.
                                    </div>
                                </div>

                                <div className="contactForm">
                                    <div className="formRow">
                                        <div className="formGroup">
                                            <label className="formLabel">Your Name</label>
                                            <input
                                                className="formInput"
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="formGroup">
                                            <label className="formLabel">Your Email</label>
                                            <input
                                                className="formInput"
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="formLabel">Subject</label>
                                        <select
                                            className="formSelect"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                        >
                                            <option value="General Hello">General Hello</option>
                                            <option value="Business Inquiry">
                                                Business Inquiry
                                            </option>
                                            <option value="Collaboration">Collaboration</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="formGroup">
                                        <label className="formLabel">Message</label>
                                        <textarea
                                            className="formTextarea"
                                            name="message"
                                            placeholder="Write your message here..."
                                            value={form.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div
                                        className="submitBtn"
                                        onClick={handleSubmit}
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        Send Message
                                    </div>
                                </div>
                            </>
                        )}

                        {activeFolder === "compose" && sent && (
                            <>
                                <div className="contactHeader">
                                    <div className="contactTitle">Message Sent</div>
                                </div>
                                <div className="successMessage">
                                    <div className="successIcon">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                    <div className="successText">
                                        <div className="successTitle">
                                            Your email client has been opened!
                                        </div>
                                        <div className="successDesc">
                                            Complete sending the email in your mail application. Thank
                                            you for reaching out — I&apos;ll respond as soon as I can.
                                        </div>
                                    </div>
                                </div>
                                <div className="resetBtn" onClick={resetForm}>
                                    Send another message
                                </div>
                            </>
                        )}

                        {activeFolder === "inbox" && (
                            <div className="contactHeader">
                                <div className="contactTitle">Inbox</div>
                                <div className="contactSubtitle">
                                    No new messages. Check back later!
                                </div>
                            </div>
                        )}

                        {activeFolder === "sent" && (
                            <div className="contactHeader">
                                <div className="contactTitle">Sent</div>
                                <div className="contactSubtitle">
                                    {sent
                                        ? "1 message sent in this session."
                                        : "No sent messages yet."}
                                </div>
                            </div>
                        )}
                    </div>
                </LazyComponent>
            </div>
        </div>
    );
};
