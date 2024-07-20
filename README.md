# WonderX

WonderX is a comprehensive platform designed for online courses, featuring robust user authentication, course management, progress tracking, and more. The platform leverages cutting-edge technologies including Next.js, Prisma, MongoDB, and TypeScript to deliver a seamless and scalable learning experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Key API Endpoints](#key-api-endpoints)
- [Custom Hooks](#custom-hooks)
- [Development Practices](#development-practices)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

WonderX is an e-learning platform designed to provide users with a wide array of courses. Users can browse courses, track their progress, earn badges and certificates, and manage their profiles. The platform also supports subscription management through Stripe.

## Features

- **User Authentication**: Secure login and registration using NextAuth with providers like GitHub, Google, and custom credentials.
- **Course Management**: Create, read, update, and delete courses, modules, and clips.
- **Progress Tracking**: Monitor progress through clips and courses, both at the user and profile levels.
- **Profile Management**: Support for multiple profiles under a single user account, including favorites and watch lists.
- **Subscription Management**: Integrated with Stripe for handling subscriptions.
- **Reviews and Ratings**: Users can leave reviews and ratings for courses.
- **Achievements**: Users can earn badges and certificates based on their course completions and other milestones.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM, MongoDB
- **Authentication**: NextAuth
- **Payment Processing**: Stripe
- **Styling**: Tailwind CSS
- **State Management**: React Context API, SWR for data fetching

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- Stripe account for subscription management

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/wonderx.git
    cd wonderx
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL="your_mongodb_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_JWT_SECRET="your_jwt_secret"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="your_stripe_public_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000" # or your deployed URL
