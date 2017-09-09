# Very basic progressive web app that might be useful to understand how webpack works. It uses:
- webpack
- babel
- jest
- eslint
- scss
- images
- fonts

# Install nodejs v6
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs

# Install dependencies
  sudo npm install --production

# Run (must be launched to develop!)
  npm run watch
# Or with webpack-dev-server
  npm run start

# Run tests
   npm run test

# Deploy for production
  npm run build

# Add packages
  sudo npm install {{package}} --save

# Create a git hook
vim .git/hooks/pre-commit
# Paste inside: npm run test
# Make it executable
chmod +x .git/hooks/pre-commit
