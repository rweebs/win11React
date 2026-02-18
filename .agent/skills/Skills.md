# Agent Skills: Win11React Portfolio Integration

This document defines the specific skills and operational context required to transform the `win11React` repository into a personal portfolio for Rahmat Wibowo.

## 1. System Architect (Redux & Registry)
**Description:** Expertise in the `win11React` state management system to register new applications without breaking existing OS functionality.
**Context:** The app uses Redux to manage window states (`isOpen`, `isActive`, `isMaximized`). New apps must be registered in the `apps` reducer or constant registry.
**Capabilities:**
* **Locate Registry:** Identify the central application config (usually `src/utils/apps.js` or `src/reducers/apps.js`) where app icons, titles, and IDs are defined.
* **Register Apps:** Inject new app entries for "Portfolio", "Resume", and "Contact Me" into the initial state.
* **Icon Mapping:** Assign appropriate icons (using existing assets or new SVG paths) to the new apps.
* **Start Menu Injection:** Ensure the new apps appear in the Start Menu and Taskbar pinned lists.

## 2. App Developer: Portfolio Showcase
**Description:** Ability to build a React component that mimics the Windows 11 "File Explorer" or "Microsoft Store" to display projects.
**Context:** Rahmat has specific projects (Sahabat STK PMSOL, Zammad implementation, Rust Desktop App) that need to be showcased with descriptions and tech stacks.
**Capabilities:**
* **Component Structure:** Create `src/containers/applications/Portfolio.jsx`.
* **Data Integration:** Create a `src/data/projects.json` file to store project metadata (Title, Description, Tech Stack, GitHub Link, Photos).
* **Layout Implementation:** Use CSS Grid/Flexbox to create a "grid view" of project folders/cards.
* **Tagging System:** Implement a UI to display tags for skills (e.g., "DevOps", "React", "Rust", "Management").

## 3. App Developer: Contact & Communication
**Description:** Ability to build a functional form application that mimics the native Windows "Mail" app.
**Context:** Needs to function without a dedicated backend server, utilizing client-side email services.
**Capabilities:**
* **Component Structure:** Create `src/containers/applications/Contact.jsx`.
* **Service Integration:** Implement `EmailJS` (or similar) to handle form submissions directly from the client.
* **Validation:** specific validation for "Business Inquiries" vs "General Hello".
* **Feedback Loop:** Implement a Windows-style "Toast Notification" (Action Center) upon successful email transmission.

## 4. App Developer: Resume Viewer
**Description:** Ability to render PDF documents seamlessly within the simulated window environment.
**Context:** The user wants the resume to open *inside* the OS simulation, not download immediately or open a new browser tab.
**Capabilities:**
* **Component Structure:** Create `src/containers/applications/Resume.jsx`.
* **PDF Rendering:** Implement `react-pdf` or a styled `<iframe>` to render `public/resume.pdf`.
* **Toolbar:** Add a custom top bar with "Download", "Print", and "Zoom" buttons that matches the Windows 11 PDF viewer aesthetic.

## 5. UI/UX Specialist (Glassmorphism)
**Description:** Expertise in SCSS and Windows 11 design language (Mica material, Acrylic blur).
**Context:** All new apps must visually match the existing OS simulation.
**Capabilities:**
* **Mica Effect:** Apply the specific background-blur and translucency CSS utilized by the repo's base theme.
* **Animation:** Ensure windows open/close with the correct framer-motion or CSS transition scale effects.
* **Responsive Design:** Ensure the portfolio apps resize correctly when the simulated window is snapped or maximized.

## 6. Content Strategist
**Description:** optimizing the text content for an Engineer.
**Context:** Rahmat is Technical Engineer (Backend/DevOps).
**Capabilities:**
* **Profile Summary:** Draft a "About PC" section in the Settings app that summarizes the background.
* **Project Descriptions:** Write concise, impact-driven descriptions for the `projects.json` file (e.g., "Reduced costs by X% using Spot Instances").

---

## Workflow Instructions for Agent
1.  **Analysis:** First, read `src/utils` and `src/reducers` to map the current app registration flow.
2.  **Asset Prep:** Ask user to upload `resume.pdf` and project icons to `public/img`.
3.  **Implementation:** Build the "Portfolio" app first as a proof-of-concept for the windowing logic.
4.  **Integration:** Wire up the Start Menu to launch the new apps.