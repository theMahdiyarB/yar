# Yar (یار) - The Companion Project

**Yar** (Persian for "helper" or "friend") is a web application designed to connect patients in need of companionship with volunteers who are willing to help. This platform aims to reduce loneliness and provide support for individuals during difficult times.

## ✨ Key Features

  * **User Roles**: Three distinct user types:
      * **Patients**: Can request companionship.
      * **Healthcare Professionals**: Can request companionship on behalf of their patients.
      * **Companions (Yar)**: Volunteers who can accept requests.
  * **Request System**: A simple interface for creating and managing companionship requests.
  * **Bilingual Support**: Fully supports both **English** and **Persian (فارسی)** with a one-click language switcher.
  * **Secure Authentication**: User registration and login handled securely via Supabase.

-----

## 🛠️ Technology Stack

  * **Frontend**: [React](https://react.dev/) (with Vite)
  * **Backend & Database**: [Supabase](https://supabase.com/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  * **Internationalization (i18n)**: [react-i18next](https://react.i18next.com/)

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * [Node.js](https://nodejs.org/en) (v18 or later)
  * [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/theMahdiyarB/yar.git
    cd yar
    ```

2.  **Install NPM packages:**

    ```bash
    npm install
    ```

3.  **Set up your environment variables:**

      * Create a new file in the root of your project named `.env`.
      * Copy the contents of `.env.example` (if you have one) or add the following lines:

    <!-- end list -->

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

      * Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual credentials from your Supabase project dashboard (**Settings \> API**).

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

-----

## 🤝 Contributing

Contributions, issues, and feature requests are welcome\! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/theMahdiyarB/yar/issues).

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📧 Contact

Mahdiyar B - [theMahdiyarB](https://www.google.com/search?q=https://github.com/theMahdiyarB)