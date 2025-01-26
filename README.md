# EV Logger

**EV Logger** is a web-based application designed to help users log and analyze their electric vehicle (EV) rides. It provides insights into energy consumption, cost estimation, and real-time analytics to enhance EV usage efficiency.

---

## Features

- **EV Registration**: Add details of your electric vehicle.
- **Log Rides**: Record date, distance, energy consumed, and cost for every ride.
- **Cost Estimation**: Automatically calculate the energy consumed and cost range based on distance.
- **Analytics Dashboard**: Visualize and analyze ride data for insights.
- **Responsive Design**: Seamless user experience across devices.

---

## Tech Stack

### Frontend
- React.js (v19.0.0)
- Tailwind CSS

### Backend
- Firebase Firestore (for data storage)

### Additional Tools
- `gh-pages` for deployment

---

## Setup Instructions

### Prerequisites
1. Node.js and npm installed.
2. Firebase project set up (with Firestore).

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Cap26803/ev-logger.git
   cd ev-logger
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Go to `src/firebase.js`.
   - Add your Firebase project credentials:
     ```javascript
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_AUTH_DOMAIN",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_STORAGE_BUCKET",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     export const db = getFirestore(app);
     ```

4. **Run the App Locally**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

---

## Deployment

The app is deployed using GitHub Pages. Visit the live app at:
[https://Cap26803.github.io/ev-logger](https://Cap26803.github.io/ev-logger)

### Deploying Updates
1. Make changes to the app.
2. Build and deploy:
   ```bash
   npm run deploy
   ```

---

## Project Structure

```
EV Logger
├── public
│   └── index.html         # Main HTML file
├── src
│   ├── components         # React components
│   │   ├── DataAnalytics.js
│   │   ├── EVRegistration.js
│   │   ├── EVSelection.js
│   │   ├── LogForm.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── styles             # CSS files
│   │   ├── styles.css
│   │   └── LogForm.css
│   ├── firebase.js        # Firebase configuration
│   └── App.js             # Main React component
├── package.json           # npm configuration
└── README.md              # Project documentation
```

---

## Available Scripts

### `npm start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run deploy`
Deploys the app to GitHub Pages.

---

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [gh-pages](https://github.com/tschaub/gh-pages)

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any changes or enhancements.

---

## Contact

For queries, please reach out to:
[Cap26803](https://github.com/Cap26803)

---

**Happy Logging! 🚗⚡**