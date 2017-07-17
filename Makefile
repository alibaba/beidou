MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: lint install clean test-clean clean-all test-only test-all test cov changelog

lint:
	./node_modules/.bin/lint-staged --fix lib

install:
	yarn install
	./node_modules/.bin/lerna bootstrap
	./scripts/install-examples.sh

clean:
	make test-clean
	rm -rf coverage
	rm -rf .run
	rm -rf run
	rm -rf packages/*/npm-debug*
	rm -rf packages/*/test/fixtures/*/.babel.json
	rm -rf packages/*/test/fixtures/*/*/*_config.json
	rm -rf packages/*/test/fixtures/*/*/*.log
	rm -rf packages/*/test/fixtures/*/*/*/*.log
	rm -rf examples/*/logs/
	rm -rf examples/*/run/


test-clean:
	rm -rf packages/*/test/run
	rm -rf packages/*/test/debug

clean-all:
	rm -rf node_modules
	rm -rf packages/*/node_modules
	rm -rf examples/*/node_modules
	make clean

test-only:
	./scripts/test.sh
	make test-clean

test-all:
	./scripts/test-all.sh
	make test-clean

test:
	make lint
	make test-only

cov: ./node_modules/.bin/egg-bin cov

ci: make cov

changelog: ./node_modules/.bin/lerna-changelog


