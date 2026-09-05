# Trainee Connect

Act as an expert UI/UX designer and frontend developer. Build a responsive, clean, and modern web application prototype using React, Tailwind CSS, Lucide icons, and Shadcn UI. 

This prototype is for a "Trainee Management System (TMS)" and needs ONLY the UI and client-side navigation (no backend or real AI yet).

Create a tab or navigation bar at the top allowing the user to switch easily between these views:

1. View 1: Auth / Registration

- A clean card containing: Full Name, Email, Password, Company Name, and Role Selector (Trainee or Supervisor).

- "Sign In / Sign Up" buttons.

2. View 2: Supervisor Dashboard

- "Assign New Task" card:

  - Trainee dropdown selector.

  - Task Title and Instructions textarea.

  - Deadline date-picker.

  - Attachment placeholder button (e.g. "Attach Guidelines PDF").

  - "Send Task to Trainee" button.

- "Submissions & Review" table:

  - Trainee Name, Task Title, Submission Date, Attached Solution file link, and Status badge (Pending / Approved).

  - Feedback input box and an "Approve / Request Changes" action button.

3. View 3: Trainee Dashboard

- "Current Task" card:

  - Shows task title, supervisor instructions, due date countdown, and a button to view/download supervisor's attachment.

- "Task Breakdown Plan" card (Placeholder for future AI):

  - A prominent button: "Generate Study/Work Plan (AI)".

  - A sample interactive checklist below it showing Day 1, Day 2, and Day 3 with priority tags (High, Medium, Low) and checkboxes to mark items done.

- "Submit Deliverables" card:

  - File upload box (drag & drop style).

  - Summary notes textarea for the supervisor.

  - "Submit Task" button.

Design Aesthetic:

- Clean corporate style, blue/slate color palette, soft shadows, rounded corners, and clear typography.

- Make all buttons clickable with mock state toggles so the user can test the UI flow smoothly.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/497f38d5-3db9-475d-8f11-ef1e215758b7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
