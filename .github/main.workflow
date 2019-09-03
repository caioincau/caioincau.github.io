workflow "New workflow" {
  on = "push"
  resolves = ["new-action"]
}

action "Setup Ruby for use with actions" {
  uses = "actions/setup-ruby@623660d1366330cb8f0b2a6243e9659429eaeed5"
  runs = "gem install jekyll bundler"
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Setup Ruby for use with actions"]
  runs = "npm install && gulp"
}

action "new-action" {
  uses = "owner/repo/path@ref"
  needs = ["GitHub Action for npm"]
}
