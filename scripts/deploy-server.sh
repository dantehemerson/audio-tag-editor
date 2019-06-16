# Deploy only the page server to heroku
git push heroku `git subtree split --prefix server master`:master --force