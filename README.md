# AppointmentPro
## 🗓️ Appointment Booking Platform
A versatile and user-friendly appointment booking system that allows users to schedule appointments with professionals across various industries, including doctors, lawyers, accountants, and more. 
<br/>
Live app hosted on Vercel : https://appointment-pro.vercel.app/
<br/>

## 🛠️ Tech Stack
Typescript, Next.js, React.js, PostgreSQL, PrismaORM, NextAuth
<br/>

## Project Setup

### Database
This project uses a SQL database, configure any SQL database on local machine or a container and get the connection string.

### Install Dependencies
`npm install`
Add `--force` flag for any errors related to version mismatch.

### Environment variables
Create a `.env` file at the root path of the project with the following variables.
Example :
```
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=someComplexSecretString

GITHUB_ID=YourGithub-OAuth-Id
GITHUB_SECRET=YourGithub-OAuth-Secret
GOOGLE_CLIENT_ID=YourGoogle-OAuth-Id
GOOGLE_CLIENT_SECRET=YourGoogle-OAuth-Secret

DATABASE_URL="postgresql://postgres:password@localhost:5432/yourDbName?schema=public"
```
NEXTAUTH_URL - It's the URL of your site. <br>
NEXTAUTH_SECRET - It is used to encrypt the NextAuth's JWT. <br>
OAuth(Github, Google) Id, Secret are not compulsory (Can use credentials to sign-up and login). <br>
DATABASE_URL - Your DB connection string.

---
### Database Migration and data seeding
  - Apply all database migrations : <br>
`npx prisma db push`
  - Seed data to database : <br>
`npx prisma db seed`

### Generate prisma client
Run : <br>
`npx prisma generate`

### Start the project in dev mode
`npm run dev`

---
That's it. All set to go!
