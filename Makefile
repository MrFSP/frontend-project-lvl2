# install

install i:
	npm ci
	npm publish --dry-run
	sudo npm link

reinstall ri: uninstall install

uninstall un:
	sudo npm uninstall -g \@hexlet/code

# start

start s:
	node bin/gendiff.js -h

lint l:
	npx eslint .