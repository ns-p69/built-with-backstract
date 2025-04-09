# Hackathon Management Portal - Application Flow Documentation

## Overview
This document provides a step-by-step guide on the user flow for the Hackathon Management Portal. It outlines how each screen interacts with API endpoints and manages application state. This documentation is structured for an LLM to generate essential components for the project flow without breaking functionality.

---

## Step-by-Step Application Flow

### **Screen 1: Email Input & Team Fetching**
#### **UI Requirements:**
- Display a text input field for users to enter their organization email.
- Show a heading and description instructing users to enter an email ending with `@novostack.com`.
- Provide a "Proceed" button to trigger API calls.

#### **API Calls:**
1. On clicking "Proceed", make a GET request to:
   - **Endpoint:** `/get/teams/email`
   - **Method:** `GET`
   - **Query Params:** `team_id`
   - **Response:** Returns `team_details`.
2. Use the `team_id` from the response to make a second API call:
   - **Endpoint:** `/participants/{team_id}`
   - **Method:** `POST`
   - **Payload:** `{ "team_id": "<retrieved_team_id>" }`
   - **Response:** Returns a list of all team participants.
3. Navigate to **Screen 2** with the participant data.

---

### **Screen 2: Display Team Participants & Start Challenge**
#### **UI Requirements:**
- Show a list of all participants retrieved from the API.
- Provide a "Start Challenge" button.

#### **API Calls:**
1. When the "Start Challenge" button is clicked:
   - **Endpoint:** `/challenges/{id}`
   - **Method:** `GET`
   - **Response:** Returns `challenge` details, including:
     - `problem`
     - `description`
     - `instructions`
     - `constraints`
     - `time_limit`
2. Navigate to **Screen 3** with the challenge data.

---

### **Screen 3: Show Challenge Details & Start Timer**
#### **UI Requirements:**
- Display challenge details retrieved from the API.
- Show a timer starting from when the challenge was started.
- Provide a "Submit" button.

#### **State Management:**
- Store a variable in `localStorage` to track if the challenge has started.
- If the variable is present, redirect users to **Screen 4** by default.

---

### **Screen 4: Active Challenge & Submission**
#### **UI Requirements:**
- Continuously display the challenge details and a live ticking clock.
- Provide a "Submit" button.

#### **Submission Process:**
1. On clicking "Submit," display a modal with:
   - A required input field for **Swagger Collection URL**.
   - An optional input for **Live Deployment URL**.
   - A file upload box for project submission (ZIP format, max size: **5MB**).

#### **API Calls (To Be Defined Later)**
- Submission API call to be integrated.

---

## **Next Steps**
- Define API endpoints for challenge submission.
- Implement state persistence for tracking challenge progress.
- Add authentication mechanisms if needed.
- Validate user inputs in forms before making API calls.

This document will be updated as the API calls and flow evolve.

hackathon-management-portal/
├── components/
│   ├── EmailInput.js
│   ├── TeamParticipants.js
│   ├── ChallengeDetails.js
│   ├── Timer.js
│   └── SubmissionModal.js
├── pages/
│   ├── index.js
│   ├── screen1.js
│   ├── screen2.js
│   ├── screen3.js
│   └── screen4.js
├── utils/
│   └── axiosInstance.js
├── styles/
│   └── globals.css
└── package.json