# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  # Run the "production" script in `package.json` on the "production" branch
  # "production" should be replaced with the name of your Production branch

  npm run build-preview

elif [ "$CF_PAGES_BRANCH" == "preview" ]; then
  # Run the "staging" script in `package.json` on the "staging" branch
  # "staging" should be replaced with the name of your specific branch

  npm run build-preview

else
  echo "unknown branch"
  echo $CF_PAGES_BRANCH
  # Else run the dev script
  npm run build-local
fi