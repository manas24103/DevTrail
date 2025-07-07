# Competitive Programming Dashboard

A web application to track your competitive programming progress across multiple platforms like Codeforces and LeetCode.

## Features

- View your Codeforces profile information
- View your LeetCode profile information (basic implementation)
- Responsive design
- Clean and modern UI

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   node server.js
   ```
   The backend will start on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The frontend will open in your default browser at `http://localhost:3000`

## Usage

1. Enter your Codeforces and LeetCode usernames in the respective input fields
2. Click the "Search" button to fetch your data
3. View your profile information and statistics

## Project Structure

```
.
├── backend/               # Node.js + Express backend
│   ├── controllers/       # Logic to fetch data from each platform
│   ├── routes/            # API routes
│   ├── services/          # API clients, scrapers, etc.
│   ├── models/            # MongoDB models (if using DB)
│   ├── utils/             # Helper functions
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/              # React app
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI elements
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/        # CSS files
│   └── package.json
└── README.md
```

## Future Enhancements

- Add more platforms (GeeksforGeeks, AtCoder, etc.)
- Implement user authentication
- Add more detailed statistics and graphs
- Enable data persistence with MongoDB
- Add dark mode
- Implement user preferences and settings

## License

This project is open source and available under the [MIT License](LICENSE).
