# 🚀 Quick Start Guide

Get AgentBook running locally in 5 minutes!

## Prerequisites

- Node.js 18+ and npm
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/booking-llm-agent.git
cd booking-llm-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase (Free)

#### Option A: Use Supabase Cloud (Recommended)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Project Settings → API
4. Copy your credentials

#### Option B: Use Local Supabase

```bash
npx supabase start
```

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AgentBook
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
AGENT_API_SECRET=any_random_secret_string
```

### 5. Set Up Database

Run the migration SQL:

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents from `supabase/migrations/001_initial_schema.sql`
3. Run the query

### 6. Seed Test Data (Optional)

```bash
npm run db:seed
```

This creates a test company at `localhost:3000/test-dental`

### 7. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎉 You're Ready!

### Try These URLs:

- **Homepage:** http://localhost:3000
- **Demo:** http://localhost:3000/demo
- **Register:** http://localhost:3000/register
- **Test Company:** http://localhost:3000/test-dental

### Test the AI API:

```bash
# Get services
curl "http://localhost:3000/ai/services?company=test-dental"

# Check availability
curl "http://localhost:3000/ai/availability?company=test-dental&serviceId=YOUR_SERVICE_ID"

# Make a booking
curl -X POST http://localhost:3000/ai/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "companySlug": "test-dental",
    "serviceId": "YOUR_SERVICE_ID",
    "slot": "2025-02-01T14:00:00Z",
    "customer": {
      "name": "Test User",
      "email": "test@example.com"
    }
  }'
```

## Common Issues

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### Database Connection Error

- Verify your Supabase credentials in `.env.local`
- Check if your Supabase project is running

### Build Errors

```bash
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

1. 📖 Read the [full documentation](./README.md)
2. 🔌 Check out [AI Agent Integration Guide](./docs/AGENT_INTEGRATION.md)
3. 🚀 See [Deployment Guide](./docs/DEPLOYMENT.md)
4. 🤝 Read [Contributing Guidelines](./CONTRIBUTING.md)

## Need Help?

- 📧 Email: support@agentbook.com
- 💬 Discord: [Join our community](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/booking-llm-agent/issues)

Happy coding! 🎉

