## Getting Started

To run the application and configure the necessary proxies to avoid CORS errors, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/qikserve.git
   cd qikserve
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm start
   ```

2. The application should now be running at `http://localhost:3000`.

### Configuring Proxy for CORS

To avoid CORS errors, you need to configure a proxy in the `package.json` file:

1. Open `package.json` and add the following proxy configuration:

   ```json
   "proxy": "http://your-api-server.com"
   ```

2. Save the file and restart the development server:
   ```sh
   npm start
   ```

Now, your application should be able to communicate with the API server without CORS issues.

### Additional Configuration

If you need to configure additional proxies or settings, refer to the [Create React App documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
