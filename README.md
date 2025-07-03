# AdZPay - Personalized Ad Discovery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13.0-black.svg)](https://nextjs.org/)

[Live Demo](https://adzpay.demo.net) | [Documentation](https://docs.adzpay.net) | [Report Bug](https://github.com/yourusername/addvantage/issues) | [Request Feature](https://github.com/yourusername/addvantage/issues)

## Overview

AdZPay is a modern web application that connects advertisers with their target audience through a personalized ad discovery platform. Built with Next.js 13, TypeScript, and Tailwind CSS, it offers a seamless experience for both advertisers and users.

## Features

### For Advertisers

- **Ad Management Dashboard**: Create, publish, and manage ad campaigns
- **Real-time Analytics**: Track views, clicks, and engagement metrics
- **Smart Targeting**: Reach your ideal audience through AI-powered matching
- **Flexible Duration**: Set and extend campaign durations as needed

### For Users

- **Personalized Feed**: Discover relevant ads based on interests
- **Request System**: Easy access request process for viewing ads
- **Real-time Notifications**: Stay updated on ad requests and responses
- **User Profiles**: Customizable profiles with preference settings

## Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **Backend**: Convex (Backend as a Service)
- **Authentication**: Kinde Auth
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Animations**: Framer Motion

## Project Structure

```
addvantage/
├── src/
│   ├── app/                 # Next.js 13 app directory
│   │   ├── api/            # API routes
│   │   ├── components/     # Reusable components
│   │   ├── dashboard/      # Dashboard pages
│   │   └── onboarding/     # Onboarding flow
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── convex/                 # Convex backend functions
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## ⚡ Quick Start

### System Requirements

- Node.js 16.x or later
- npm 7.x or later
- Git
- Convex account
- Kinde Auth account
- Modern web browser

### Environment Setup

1. **Development Environment**

   ```bash
   # Install nvm (Node Version Manager) - Optional but recommended
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # Install and use the correct Node version
   nvm install 16
   nvm use 16
   ```

2. **Clone and Install**
   \`\`\`bash
   git clone https://github.com/yourusername/addvantage.git
   cd addvantage
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

5. Update .env.local with your credentials:
   \`\`\`
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   KINDE_CLIENT_ID=your_kinde_client_id
   KINDE_CLIENT_SECRET=your_kinde_client_secret
   KINDE_ISSUER_URL=your_kinde_issuer_url
   \`\`\`

6. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Configuration

Required environment variables:
| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_CONVEX_URL | Convex deployment URL | Yes |
| KINDE_CLIENT_ID | Kinde Auth client ID | Yes |
| KINDE_CLIENT_SECRET | Kinde Auth client secret | Yes |
| KINDE_ISSUER_URL | Kinde Auth issuer URL | Yes |

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📦 Deployment

### Production Build

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Deployment Options

1. **Vercel** (Recommended)

   - Connect your GitHub repository
   - Configure environment variables
   - Deploy automatically

2. **Manual Deployment**
   - Set up a production server
   - Configure reverse proxy (Nginx/Apache)
   - Set up SSL certificates
   - Configure environment variables

## 🔒 Security

- All API endpoints are protected with rate limiting
- Authentication using Kinde Auth
- Data encryption in transit and at rest
- Regular security updates and dependency audits

## 📈 Performance

- Lighthouse Score:
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 95+
  - SEO: 100

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Code Style

- Follow the TypeScript style guide
- Use Prettier for code formatting
- ESLint for code quality
- Husky for pre-commit hooks

### Development Process

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 Documentation

- [API Documentation](docs/api.md)
- [Architecture Overview](docs/architecture.md)
- [Development Guide](docs/development.md)
- [Deployment Guide](docs/deployment.md)

## 📜 Versioning

We use [SemVer](http://semver.org/) for versioning. For available versions, see the [tags on this repository](https://github.com/yourusername/addvantage/tags).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Create a [GitHub Issue](https://github.com/yourusername/addvantage/issues)
- Email: info@adzpay.net
- Discord: [Join our community](https://discord.gg/YK6z6zu4ah)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Convex for the backend infrastructure
- Kinde Auth for authentication services
- All contributors who have helped shape this project

## 📊 Project Status

- Current Version: 1.0.0
- Maintained: Yes
- Development Status: Active

---

Made with ❤️ by the AdZPay Team
