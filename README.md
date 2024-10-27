# CrackEd Documentation

## Introduction

Welcome to CrackEd, an educational platform designed specifically for the Islamic University of Technology (IUT), Bangladesh, admission test. This documentation provides a comprehensive overview of the installation process, platform’s features and functionalities, categorized for students, tutors, and admins.

Live at: [crack-ed-app.vercel.app](https://crack-ed-app.vercel.app/)
<br><br>
![image](https://github.com/takitajwar17/CrackEd-App/assets/111155827/d56d84f5-7815-4f7c-9182-02204b33860c)

## Project Context

This project is developed by our team, [XtraDrill](#developers), for the Software Project Lab (SWE 4404) during the 4th semester at the Islamic University of Technology. It is a fullstack application capable of handling a large number of users.

## Table of Contents

1. [Tools and Technologies](#tools-and-technologies)
2. [Installation Process](#installation-process)
3. [Features for Students](#features-for-students)
4. [Features for Tutors](#features-for-tutors)
5. [Features for Admin](#features-for-admin)
6. [Developers](#developers)
7. [Conclusion](#conclusion)

## Tools and Technologies

CrackEd is built using the following tools and technologies:

- **MERN Stack**:
  - **Frontend**: React
  - **Backend**: Node.js, Express.js
  - **Database**: MongoDB Atlas

## Installation Process

To set up and run CrackEd locally, follow these steps:

### Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed. You can download and install them from [Node.js official website](https://nodejs.org/).

2. **MongoDB**: Install MongoDB and start the MongoDB server. You can download it from [MongoDB official website](https://www.mongodb.com/).

3. **Git**: Ensure you have Git installed to clone the repository. You can download it from [Git official website](https://git-scm.com/).

4. **IDE**: It is recommended to use Visual Studio Code (VS Code) for development. You can download it from [VS Code official website](https://code.visualstudio.com/).

### Step-by-Step Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/imtiaz-risat/Cracked-SPL-II.git
   cd Cracked-SPL-II
   ```

2. **Install Dependencies**:
   Navigate to the `client` directory and install the required npm packages.
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Run the Application**:
   To run the frontend, use the following command from the root directory:
   ```bash
   cd client
   npm run start
   ```
   To run the backend, use the following command from the root directory:
   ```bash
   cd server
   nodemon server.js
   ```
### Accessing the Application

1. **Browser Compatibility**: Ensure you are using a modern browser such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.

2. **Open the Application**: Once both servers are running, open your browser and navigate to `http://localhost:3000` to access the CrackEd platform.

## Features for Students

### 1. Student Dashboard
The Student Dashboard serves as the central hub for students, providing quick access to various features such as ***model tests, mock tests, leaderboard, and performance statistics*** represented through a PieChart.
<br><br>
![image](https://github.com/takitajwar17/CrackEd-App/assets/111155827/179e3c19-c022-44d1-96ce-dc734708c33a)

### 2. Student Doubts
This feature allows students to post their doubts, manage existing doubts, and view answers provided by teachers. It ensures that students receive timely assistance and clarification on their queries.

### 3. Student Mock Test
Students can create and participate in mock tests by selecting the subject, marks, and time limit. This feature is designed to help students prepare effectively for their exams.

### 4. Student Model Test
The Student Model Test feature provides a list of live and archived model tests. Students can participate in live tests and review archived ones to enhance their learning experience.

### 5. Student Profile
Students can view and update their personal information, choose an avatar, and change their password with proper validation to ensure account security.

### 6. Student Question Bank
Students have access to a repository of previous admission tests listed by year, which they can use for practice and preparation.

### 7. Mistake Exam
This feature enables students to take exams specifically based on the questions they have previously answered incorrectly, allowing them to focus on areas where they need improvement. Additionally, on the Mistake Exam page, students can view detailed statistics on the number of incorrect answers they have made, both for individual subjects and combined across all subjects.
<br><br>
![image](https://github.com/takitajwar17/CrackEd-App/assets/111155827/80a4c2f6-5bab-469d-85f2-951706466ac5)

## Features for Tutors

### 1. Tutor Dashboard
The Tutor Dashboard provides an overview of key metrics and resources, including the total number of questions, pending reviews, and live model tests. It helps tutors manage their tasks efficiently.
<br><br>
![image](https://github.com/takitajwar17/CrackEd-App/assets/111155827/0d2730d4-6349-4273-9c51-258f9aa2ec5f)

### 2. Questions Database
This feature allows tutors to view, add, edit, and delete questions for various subjects. It also provides question counts per subject to help tutors keep track of their contributions.

### 3. Model Tests
Tutors can create, manage, and review model tests with options to specify test details. The search and filter functions make it easy to find specific tests or questions.

### 4. Tutor Profile
Tutors can view and update their profile information, choose an avatar, and change their password with validation to ensure their account's security.

### 5. Doubt Reviews
The Doubt Reviews feature enables tutors to review and answer student doubts. It provides a list of doubts and a submit answer button for resolving queries, ensuring that students receive prompt and accurate assistance.

## Features for Admin

### 1. Admin Dashboard
The Admin Dashboard offers a high-level overview of platform activity, showing counts for the total number of students and tutors. This feature helps admins monitor and manage the platform effectively.
- **URL:** `/sys-admin-cracked`
- **Credentials:** *Username:* admin, *Password:* CRACKed
<br><br>
![image](https://github.com/takitajwar17/CrackEd-App/assets/111155827/47c768ad-079d-4459-95da-d87db2b9a434)


### 2. Add Tutor
Admins can register new tutors to the platform, ensuring that the platform has sufficient teaching resources to cater to the students' needs.

### 3. Admin Student List
Admins can view, search, manage, and perform actions on the student base. Key features include:
- **Search Functionality:** Filter students by username or email.
- **List of Students:** Displays username, email, gender, and date of birth.
- **Actions:**
  - **Ban/Unban Student:** Toggle the ban status of a student.
  - **Delete Student:** Remove a student account from the platform.

### 4. Admin Tutor List
Admins can view, search, manage, and perform actions on the tutor base. Key features include:
- **Search Functionality:** Filter tutors by username or email.
- **List of Tutors:** Displays username, email, gender, and date of joining.
- **Actions:**
  - **Ban/Unban Tutor:** Toggle the ban status of a tutor.
  - **Delete Tutor:** Remove a tutor account from the platform.

## Developers

The CrackEd project is developed and maintained by [@codenim34](https://github.com/codenim34), [@takitajwar17](https://github.com/takitajwar17), and [@imtiaz-risat](https://github.com/imtiaz-risat).

## Conclusion

CrackEd is designed to provide a comprehensive and efficient learning and teaching environment for students and tutors. With a range of features tailored to meet the needs of both parties, CrackEd ensures a seamless educational experience.
