import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

const password = bcrypt.hashSync("password", 10);
const USERS = [
  {
    id: "0ab04570-ec0b-4b23-a586-9b47ba1e53e8",
    name: "Saul Goodman",
    role: Role.PROFESSIONAL,
    email: "saul@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Lawyer",
      city: "Albuquerque",
      state: "New York",
      fee: 200,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
  {
    id: "08e26b59-e07a-487a-8d0c-fe398272b20b",
    name: "Dr. Jane Smith",
    role: Role.PROFESSIONAL,
    email: "jane@example.com",
    passwordHash: password,
    profession: {
      specialisation: "General Practitioner",
      city: "Los Angeles",
      state: "California",
      fee: 100,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
  {
    id: "b9d9dc57-d239-4d1e-bc87-2e8118d3485f",
    name: "Dr. John Doe",
    role: Role.PROFESSIONAL,
    email: "john@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Dentist",
      city: "New York",
      state: "New York",
      fee: 150,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
  {
    id: "341ebde8-c55b-4532-add8-21505c46c2a7",
    name: "Emily Brown",
    role: Role.PROFESSIONAL,
    email: "emily@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Charted Accountant",
      city: "Houston",
      state: "Texas",
      fee: 300,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
  {
    id: "08559b17-51e2-4dd0-8cf7-ac893c40b6b2",
    name: "Michael Lee",
    role: Role.PROFESSIONAL,
    email: "michael@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Finance Manager",
      city: "San Francisco",
      state: "California",
      fee: 250,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
];
export default USERS;
