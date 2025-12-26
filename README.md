# 🤖 AI-Agent Booking Platform

> The world's first booking platform natively optimized for AI agents

## What is this?

Imagine booking a doctor's appointment by simply telling ChatGPT: *"Book me a dentist appointment for next Tuesday at 2pm"* - and it just works.

This platform enables businesses (doctors, restaurants, salons, consultants) to offer AI-native booking experiences. Users book through their favorite AI assistants (ChatGPT, Claude, etc.) while businesses get a modern booking system with zero manual work.

## 🌟 Key Features

### For End Users
- 💬 Book appointments through natural conversation with AI assistants
- 🔄 Modify or cancel bookings via chat
- 📱 No app downloads or account creation needed
- 🎯 One conversation handles everything

### For Businesses
- 🚀 Quick setup - get your booking page in minutes
- 🤖 AI-discoverable - appear in ChatGPT, Claude, and other agent responses
- 📊 Analytics dashboard showing AI vs. direct bookings
- 💼 Custom subdomain (yourbusiness.agentbook.com)
- 🎨 Optional custom domain
- 📧 Automated reminders and confirmations

### For Developers/AI Agents
- 🔌 RESTful API with OpenAPI specification
- 📝 JSON-LD semantic markup
- 🔐 OAuth 2.0 with agent-specific flows
- 📚 Clear documentation and examples
- ⚡ Fast, reliable endpoints

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│           AI Agents (ChatGPT, etc.)         │
└────────────────┬────────────────────────────┘
                 │ OAuth + API calls
┌────────────────▼────────────────────────────┐
│         API Gateway (AI-optimized)          │
│  - OpenAPI spec                             │
│  - Rate limiting                            │
│  - Auth verification                        │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│          Booking Engine Core                │
│  - Availability calculation                 │
│  - Conflict resolution                      │
│  - Reservation management                   │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│     Multi-Tenant Database (PostgreSQL)      │
│  - Company data                             │
│  - Services & schedules                     │
│  - Bookings & users                         │
└─────────────────────────────────────────────┘
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/booking-llm-agent.git
cd booking-llm-agent

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your platform!

## 📖 Documentation

- [API Documentation](./docs/API.md)
- [AI Agent Integration Guide](./docs/AGENT_INTEGRATION.md)
- [Business Onboarding](./docs/BUSINESS_SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, tRPC
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **AI Integration**: OpenAPI specs, JSON-LD

## 📝 License

MIT License - see [LICENSE](./LICENSE) file

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 💬 Support

- 📧 Email: support@yourdomain.com
- 💬 Discord: [Join our community](#)
- 🐦 Twitter: [@yourbrand](#)

---

Built with ❤️ for the AI-native future

