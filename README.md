<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>Campus Skill Exchange Platform</strong><br />
  A Barter-Based Peer-to-Peer Learning System for University Students.
</p>

<p align="center">
<img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Maintained" />
<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
<img src="https://img.shields.io/badge/Framework-NestJS-red.svg" alt="Framework" />
<img src="https://img.shields.io/badge/Database-PostgreSQL-blue.svg" alt="Database" />
</p>

## 📖 Overview

Developed by **Sifat Hossain**, this platform is designed to facilitate skill sharing within campus communities without the need for monetary transactions. It operates on a strict **knowledge-barter logic**, allowing students to trade expertise directly.

### The Barter Rule:

- **Creators** offer one skill (e.g., _Skill A_) and must list **2+ skills** they wish to learn in return (e.g., _Skill B_ or _Skill C_).
- **Learners** browse posts and propose an exchange by offering one of the skills on the creator's wishlist.

---

## 🛠 Project Architecture

The system is built with **NestJS** and follows a modular architecture for scalability and clean separation of concerns.

### Core Modules:

- **Auth:** Secure JWT-based authentication for campus students.
- **Users:** Profile management including student metadata and campus identification.
- **Skills:** Management of barter "Offer" posts and wishlist requirements.
- **Exchanges:** Logic for handling barter proposals, status transitions (Pending/Accepted), and match verification.

### Database Schema (Entities):

- **User:** `id`, `fullName`, `email`, `campusId`.
- **SkillPost:** `id`, `teachingSkill`, `wantedSkills[]`, `creatorId`.
- **ExchangeRequest:** `id`, `postId`, `proposerId`, `skillOffered`, `status`.

---

## 🚦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) installed.

# Installation

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
### development

$ npm run start

### watch mode

$ npm run start:dev

### production mode

$ npm run start:prod
```
