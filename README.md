# Jacked

## 👀 Demo

#### <a target="_blank" href="https://jackhotchkiss-jacked.vercel.app/">Try it out!</a>

> [!NOTE]
> This app is a work in progress

![Screenshot](https://mzmmssydwsmrzjnkiwal.supabase.co/storage/v1/object/sign/test-bucket/Readme/screenshot.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yMmEyN2YzMy04NmM1LTQxODktOTQ3ZC00NTdmMTY0ODNkMWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZXN0LWJ1Y2tldC9SZWFkbWUvc2NyZWVuc2hvdC5wbmciLCJpYXQiOjE3NTM4MzcyOTQsImV4cCI6NDg3NTkwMTI5NH0.IQvTSvKO9CushMSElXrGalF4QmwtB5rAkoYyiyD3gRU)

## 📚 About

### ℹ️ Description

This project is a web app that allows users to log and visualize their workout data. It will have features such as...

- Workout Tracking
- Weight Tracking
- Exercise Tracking
- Split Creator
- Photo Comparison

### 🛠️ Tech Stack

<div >
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" alt="Next.js" title="Next.js"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="React" title="React"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/express.png" alt="Express" title="Express"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png" alt="PostgreSQL" title="PostgreSQL"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png" alt="Supabase" title="Supabase"/>
	<img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/jest.png" alt="Jest" title="Jest"/>

</div>

### 🌟 Features

- <img width="14" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/turborepo.png" alt="Turborepo" title="Turborepo"/> Monorepo using Turborepo
- 📁 `/app` dir
- <img width="16" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react_query.png" alt="React Query" title="React Query"/> Data Fetching, Caching and Mutation with **React Query**
- ⏱️ Loading UI
- 🛠️ Server and Client Components
- 📱Fuly Responsive Design
- <img width="16" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png" alt="Supabase" title="Supabase"/> Authentication using **Supabase Auth**
- <img width="16" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png" alt="Supabase" title="Supabase"/> Postgres Database using **Supabase Database**
- 👨‍🎨 Styleguide using **Storybook**

### 📁 Project Structure

This repository is a monorepo using the turborepo build system.

```sh
gymapp
|-- apps
|   |-- gym
|   |-- api
|   |-- storybook
|   |-- supabase-backup
|-- packages
|   |-- eslint-config
|   |-- typescript-config
|   |-- jest-config
|   |-- gymui
|
...
```

`/gym` - Frontend of application

`/api` - Backend of application

`/gymui` - Custom component library

`/storybook` - Main storybook application

`/supabase-backup` - Script to backup database

## 🏋️ GymUI

This is a custom component library made specifically for this application

![Screenshot](https://mzmmssydwsmrzjnkiwal.supabase.co/storage/v1/object/sign/test-bucket/Readme/gymui.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yMmEyN2YzMy04NmM1LTQxODktOTQ3ZC00NTdmMTY0ODNkMWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZXN0LWJ1Y2tldC9SZWFkbWUvZ3ltdWkucG5nIiwiaWF0IjoxNzUzODM3MjEyLCJleHAiOjQ4NzU5MDEyMTJ9.u_UMEUqBIIYYt0lGTEZyK9Dua_xaW0Swqnyp_rt2IBU)

To run the component library in storybook

```sh
turbo storybook
```

## 🚀 Usage

_Follow the following steps to run the application on your machine_

> [!WARNING]
> The following commands assume you have turbo globally installed on your machine

### Run the Application

1. Open your terminal
2. In the root of the project run the following command to start all dev servers

```sh
turbo dev
```

5. Go to `http://localhost:3000` in your web browser

## Other Information

### Build the Project

```sh
turbo build
```

This command will build the entire project.

### Test the Project

```sh
turbo test
```

This command will run the tests for the entire project
