# Contributing to UBC Unlimited Web

## Branch Strategy

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| `main` | Production-ready code | `www.ubcunlimited.com` (via Manus) |
| `develop` | Staging / integration | `ubcmerch-buvnwzjn.manus.space` (via Manus) |
| `feature/*` | Feature branches | No auto-deploy |
| `fix/*` | Bug fix branches | No auto-deploy |

## Workflow

### Day-to-day development

```bash
# 1. Start from develop
git checkout develop
git pull github develop

# 2. Create a feature branch
git checkout -b feature/my-feature

# 3. Make changes, commit
git add .
git commit -m "feat: describe your change"

# 4. Push to GitHub
git push github feature/my-feature

# 5. Open a PR: feature/my-feature → develop
#    CI must pass before merging
```

### Releasing to production

```bash
# 1. Open a PR: develop → main on GitHub
#    CI must pass before merging

# 2. After merge, sync Manus with latest main:
git pull github main

# 3. In Manus: save a checkpoint to trigger production deploy
#    (use the Manus Management UI → Publish button)
```

### Syncing GitHub changes into Manus

When you have merged changes on GitHub and want to deploy them via Manus:

```bash
# Inside the Manus sandbox terminal:
cd /home/ubuntu/ubc-unlimited-web
git pull github main        # or develop for staging
pnpm db:push                # only if schema changed
# Then save a checkpoint in the Manus UI to deploy
```

## CI/CD Pipeline

Every push to `main` or `develop` (and every PR targeting those branches) triggers the CI workflow:

1. **TypeScript check** — `pnpm check`
2. **Unit tests** — `pnpm test`
3. **Production build** — `pnpm build`

All three must pass before a PR can be merged (enforced by branch protection rules).

## Environment Variables

Secrets are managed in two places:

| Location | Used for |
|----------|---------|
| Manus project secrets | Live server runtime (injected automatically) |
| GitHub repository secrets | CI/CD pipeline only (build-time validation) |

Never commit `.env` files. Never hardcode secrets in source code.

## Environments

| Environment | URL | Branch | Managed by |
|-------------|-----|--------|------------|
| Production | `https://www.ubcunlimited.com` | `main` | Manus |
| Staging/Dev | `https://ubcmerch-buvnwzjn.manus.space` | `develop` | Manus |
