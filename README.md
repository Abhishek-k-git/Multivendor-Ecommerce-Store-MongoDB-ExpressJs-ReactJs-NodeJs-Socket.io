# Multivendor Store + Real-time Chat App

A fully functional multivendor e-commerce application built with popular and powerful technologies, including MongoDB for flexible data storage, Express.js for efficient server-side logic, React.js for dynamic and user-friendly interfaces, Node.js for a robust backend foundation and socket.io for low-latency, bidirectional and event-based communication between a client and a server.

#### Key Features:

**Seamless User Experience:**

- _Intuitive dashboards:_ Dedicated dashboards for users, sellers, and admins cater to their specific roles and needs.
- _Streamlined shopping:_ Users can browse products, add them to their cart or wishlist, and checkout securely with multiple payment options.
- _Real-time chat:_ Users can directly interact with sellers through built-in chat functionality powered by Socket.io.

**Comprehensive Product Management:**

- _Multiple categories:_ Organize products into various categories for easy navigation.
- _Detailed product pages:_ Showcase product information, images, and reviews effectively.
- _Seller control:_ Sellers can manage their inventory, orders, and customer interactions with ease.
- _Admin control:_ Admin can view and manage all data's related to users and sellers.

**Enhanced Security and Reliability:**

- _Email verification:_ Secure user accounts with email verification via Nodemailer.
- _Secure payments:_ Accept payments through Stripe and PayPal with robust security measures.
- _Seller wallet:_ Enable convenient in-app payments with a built-in user wallet.

#### Additional Functionalities:

- _Scalability:_ The application is designed to scale comfortably as your business grows.
- _Customization:_ Tailor the application to your specific brand and requirements. - _Future-proof:_ Built with modern technologies to stay relevant and adaptable.

#### Benefits:

- _Reduced development time and costs:_ Leverage a pre-built application to accelerate your e-commerce journey.
- _Enhanced user experience:_ Deliver a smooth and engaging shopping experience for all stakeholders.
- _Scalability and flexibility:_ Accommodate growth and adapt to changing needs.
- _Secure and reliable:_ Ensure user trust and data protection with robust security features.

#### Getting Started:

```bash
git clone https://github.com/Abhishek-k-git/...

cd backend
npm install
cd..
cd frontend
npm install
cd..
cd socket
npm install
```

**Frontend:** created with vite + reactjs

```bash
npm create vite@latest frontend
```

Contains client side / frontend code in reactjs, tailwind css and material ui

- _running on port:_ 5173
- _run command:_ npm run dev
- _installed packages:_

```bash
"dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.15.10",
    "@mui/x-data-grid": "^6.19.4",
    "@paypal/react-paypal-js": "^8.1.3",
    "@reduxjs/toolkit": "^2.2.1",
    "@stripe/react-stripe-js": "^2.5.0",
    "@stripe/stripe-js": "^3.0.2",
    "axios": "^1.6.7",
    "country-state-city": "^3.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.1",
    "react-lottie": "^1.2.4",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.0",
    "react-toastify": "^10.0.4",
    "redux": "^5.0.1",
    "socket.io-client": "^4.7.4",
    "timeago.js": "^4.0.2"
},
    "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0"
}
```

**Backend:** created with nodejs

```bash
npm init -y
```

Contains code / api's for dynamic operations in nodejs, express, mongoose, cloudinary

- _running on port:_ 8000
- _run command:_ npm run dev
- _installed packages:_

```bash
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cloudinary": "^2.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.4",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.1.2",
    "nodemailer": "^6.9.9",
    "nodemon": "^3.0.3",
    "stripe": "^14.16.0"
}
```

**Socket:** created with nodejs

```bash
npm init -y
```

Contains code for real time chat and more using socket.io

- _running on port:_ 4000
- _run command:_ npm run dev
- _installed packages:_

```bash
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.4",
    "express": "^4.18.2",
    "nodemon": "^3.0.3",
    "socket.io": "^4.7.4"
}
```
