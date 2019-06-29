# Deploy only the folder server(where is the server, duuhh) to heroku
git push heroku `git subtree split --prefix server master`:master --force