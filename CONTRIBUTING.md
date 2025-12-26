# Contributing to AgentBook

Thank you for your interest in contributing to AgentBook! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/booking-llm-agent.git
   cd booking-llm-agent
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- Feature: `feature/your-feature-name`
- Bug fix: `fix/bug-description`
- Documentation: `docs/what-you-changed`

### Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add webhook support for booking events
fix: resolve timezone conversion bug in availability
docs: update API documentation for new endpoints
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint)
- Run `npm run lint` before committing
- Run `npm run format` to auto-format code

### Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain or improve code coverage

## Pull Request Process

1. **Update documentation** if you've changed APIs or added features
2. **Add tests** for new functionality
3. **Ensure all tests pass** and linting is clean
4. **Update README.md** if needed
5. **Create a PR** with a clear description of changes

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] My code follows the project's code style
- [ ] I have added tests
- [ ] All tests pass
- [ ] I have updated the documentation
```

## Areas for Contribution

### High Priority

- [ ] Authentication system (OAuth for AI agents)
- [ ] Webhook system for booking notifications
- [ ] Email/SMS notifications
- [ ] Rate limiting on API endpoints
- [ ] Advanced availability rules (holidays, breaks)
- [ ] Multi-staff scheduling optimization
- [ ] Payment integration (Stripe)

### Medium Priority

- [ ] Analytics dashboard
- [ ] Custom domain setup automation
- [ ] Mobile app (React Native)
- [ ] Calendar sync (Google, Outlook)
- [ ] Waiting list functionality
- [ ] Recurring appointments
- [ ] Customer management

### Documentation

- [ ] API usage examples in different languages
- [ ] Video tutorials
- [ ] Integration guides for specific AI agents
- [ ] Best practices guide
- [ ] Deployment guides

## AI Agent Integration

If you're building integrations for specific AI agents:

1. Follow the integration guide in `docs/AGENT_INTEGRATION.md`
2. Add examples to the documentation
3. Test thoroughly with real AI agents
4. Document any quirks or limitations

## Reporting Bugs

Use GitHub Issues and include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

## Suggesting Features

We love feature suggestions! Please:

- Check existing issues first
- Provide a clear use case
- Explain why this would benefit users
- Consider implementation complexity

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on what's best for the community
- Show empathy towards others

## Questions?

- Open a GitHub Discussion
- Join our Discord community
- Email: developers@agentbook.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AgentBook! 🚀

