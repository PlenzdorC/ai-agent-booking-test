# Deployment Guide

This guide walks you through deploying AgentBook to production.

## Prerequisites

- [Vercel Account](https://vercel.com) (free tier works)
- [Supabase Account](https://supabase.com) (free tier works)
- Domain name (optional, for custom domains)

## Step 1: Set Up Supabase

### 1.1 Create a New Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: AgentBook (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users

### 1.2 Run Database Migrations

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link to your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Push the schema:
   ```bash
   supabase db push
   ```

   Or manually run the SQL from `supabase/migrations/001_initial_schema.sql` in the SQL Editor.

### 1.3 Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## Step 2: Deploy to Vercel

### 2.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/booking-llm-agent.git
git push -u origin main
```

### 2.2 Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### 2.3 Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=AgentBook
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
AGENT_API_SECRET=generate_a_random_secret
```

### 2.4 Deploy

Click "Deploy" and wait for the build to complete.

## Step 3: Configure Custom Domain (Optional)

### 3.1 Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `agentbook.com`)
3. Follow DNS configuration instructions

### 3.2 Set Up Wildcard Subdomain

For multi-tenant subdomains (e.g., `company-name.agentbook.com`):

1. Add DNS record:
   ```
   Type: CNAME
   Name: *
   Value: cname.vercel-dns.com
   ```

2. Add wildcard domain in Vercel:
   ```
   *.agentbook.com
   ```

## Step 4: Post-Deployment Setup

### 4.1 Seed Test Data

```bash
npm run db:seed
```

### 4.2 Test the API

```bash
# Test services endpoint
curl http://localhost:3000/ai/services?company=test-dental

# Test availability
curl "http://localhost:3000/ai/availability?company=test-dental&serviceId=d11ab103-2f17-47ad-8a81-9aa5845b3811&days=7"

# Test services endpoint
curl https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/ai/services?company=test-dental

# Test availability
curl "https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/ai/availability?company=test-dental&serviceId=d11ab103-2f17-47ad-8a81-9aa5845b3811&days=7"

# Test booking (replace with actual values)
curl -X POST https://ai-agent-booking-test-4eol-oy1oxh8mr.vercel.app/api/ai/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "companySlug": "test-dental",
    "serviceId": "d11ab103-2f17-47ad-8a81-9aa5845b3811",
    "slot": "2025-12-28T10:00:00Z",
    "customer": {
      "name": "Test User",
      "email": "test@example.com"
    }
  }'
```

### 4.3 Update URLs

Update `NEXT_PUBLIC_APP_URL` in Vercel to your custom domain if you added one.

## Step 5: Set Up Monitoring (Recommended)

### Error Tracking

Use Vercel's built-in monitoring or integrate:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)

### Analytics

- Vercel Analytics (built-in)
- Google Analytics
- Plausible Analytics

## Step 6: AI Agent Integration

### 6.1 Submit to ChatGPT Plugin Store

1. Create OpenAPI spec: `https://your-domain.com/ai/openapi.json`
2. Submit to [ChatGPT Plugin Store](https://openai.com/blog/chatgpt-plugins)

### 6.2 Claude Integration

Follow [Claude MCP documentation](https://docs.anthropic.com/claude/docs)

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] Service role key is kept secret (never in client code)
- [ ] Row Level Security (RLS) is enabled on Supabase
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (future)

## Performance Optimization

### Enable Caching

```javascript
// In your API routes
export const revalidate = 60 // Revalidate every 60 seconds
```

### Database Indexing

Indexes are already created in the migration, but monitor slow queries:
1. Go to Supabase → Database → Query Performance
2. Add indexes for frequently queried columns

## Scaling Considerations

### Free Tier Limits

- **Vercel Free:** 100GB bandwidth, unlimited deployments
- **Supabase Free:** 500MB database, 2GB file storage

### When to Upgrade

- 100+ bookings/day: Consider Vercel Pro
- 1000+ companies: Upgrade Supabase
- High API traffic: Implement caching and CDN

### Database Optimization

For high scale:
1. Use read replicas
2. Implement Redis caching
3. Consider database partitioning by company

## Backup Strategy

### Automated Backups

Supabase Pro includes:
- Daily backups
- Point-in-time recovery
- 7-day retention

### Manual Backup

```bash
supabase db dump -f backup.sql
```

## Troubleshooting

### Build Fails

- Check Node version (use v18+)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

### API Errors

- Verify environment variables
- Check Supabase connection
- Review Vercel function logs

### Subdomain Not Working

- Verify wildcard DNS record
- Wait for DNS propagation (up to 48h)
- Check Vercel domain configuration

## Next Steps

1. ✅ Deploy to production
2. 🎨 Customize branding
3. 📧 Set up email notifications
4. 💳 Add payment integration
5. 📊 Build analytics dashboard
6. 🤖 Submit to AI agent marketplaces

## Support

- Documentation: https://docs.agentbook.com
- GitHub Issues: https://github.com/yourusername/booking-llm-agent/issues
- Email: support@agentbook.com

---

**Congratulations!** 🎉 Your AI-optimized booking platform is now live!

