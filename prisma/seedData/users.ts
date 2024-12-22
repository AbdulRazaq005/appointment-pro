import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

const password = bcrypt.hashSync("password", 10);
const USERS = [
  {
    name: "Dr. Abdul Razaq",
    role: Role.PROFESSIONAL,
    email: "razaq@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Neurologist",
      city: "Hospet",
      state: "India",
      fee: 200,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
  {
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
    name: "Dr. Emily Brown",
    role: Role.PROFESSIONAL,
    email: "emily@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Psychologist",
      city: "Houston",
      state: "Texas",
      fee: 300,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
  {
    name: "Dr. Michael Lee",
    role: Role.PROFESSIONAL,
    email: "michael@example.com",
    passwordHash: password,
    profession: {
      specialisation: "Dermatologist",
      city: "San Francisco",
      state: "California",
      fee: 250,
      licenseNumber: "123456789",
      phoneNo: "1234567890",
    },
  },
];
export default USERS;
