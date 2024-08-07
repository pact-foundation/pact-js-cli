SHELL:=/bin/bash
export bin=@pact-foundation/pact-cli
export pkg_version=$(shell cat package.json | jq -r .version)
supported_platforms = "linux-x64" "linux-arm64" "darwin-x64" "darwin-arm64" "windows-x64"
export STANDALONE_VERSION=$(shell grep "PACT_STANDALONE_VERSION = '" standalone/install.ts | grep -E -o "'(.*)'" | cut -d"'" -f2)

# https://github.com/npm/npm/issues/17722
# https://github.com/npm/cli/issues/4828
# https://github.com/orhun/packaging-rust-for-npm
# https://blog.orhun.dev/packaging-rust-for-npm/

clean:
	rm -rf @pact-foundation

libs: clean
	bash script/download-libs.sh

all: libs
	for supported_platform in $(supported_platforms); do \
		IFS='-' read -r node_os node_arch <<< "$$supported_platform"; \
		export node_os=$$node_os; \
		export node_arch=$$node_arch; \
		export node_pkg=$(bin)-$$node_os-$$node_arch; \
		export standalone_package=standalone/$$node_os-$$node_arch-$(STANDALONE_VERSION); \
		if [ "$$node_os" = "windows" ]; then \
			export node_os="win32"; \
		fi; \
		echo "Building for $$node_os-$$node_arch"; \
		echo "Building $$node_pkg"; \
		mkdir -p "$$node_pkg/standalone"; \
		mv "$$standalone_package" "$$node_pkg/standalone"; \
		envsubst < package.json.tmpl > "$$node_pkg/package.json"; \
		(cd $$node_pkg && npm publish --access public --dry-run;)\
	done

update_opt_deps:
	@for supported_platform in $(supported_platforms); do \
		IFS='-' read -r node_os node_arch <<< "$$supported_platform"; \
		export node_pkg=$(bin)-$$node_os-$$node_arch; \
		jq '.optionalDependencies."'$$node_pkg'" = "$(pkg_version)"' package.json > package-new.json; \
		mv package-new.json package.json; \
	done

dry_run: all
	set -eu; for supported_platform in $(supported_platforms); do \
		IFS='-' read -r node_os node_arch <<< "$$supported_platform"; \
		export node_os=$$node_os; \
		export node_pkg=$(bin)-$$node_os-$$node_arch; \
		export node_arch=$$node_arch; \
		export standalone_package=standalone/$$node_os-$$node_arch-$(STANDALONE_VERSION); \
		if [ "$$node_os" = "windows" ]; then \
			export node_os="win32"; \
		fi; \
		echo "Building $$node_pkg for $$node_os-$$node_arch (dry-run)"; \
		(cd $$node_pkg && npm publish --access public --dry-run;)\
	done
publish: all
	set -eu; for supported_platform in $(supported_platforms); do \
		IFS='-' read -r node_os node_arch <<< "$$supported_platform"; \
		export node_os=$$node_os; \
		export node_arch=$$node_arch; \
		export node_pkg=$(bin)-$$node_os-$$node_arch; \
		export standalone_package=standalone/$$node_os-$$node_arch-$(STANDALONE_VERSION); \
		if [ "$$node_os" = "windows" ]; then \
			export node_os="win32"; \
		fi; \
		echo "Building for $$node_os-$$node_arch"; \
		echo "Building $$node_pkg for $$node_os-$$node_arch"; \
		(cd $$node_pkg && npm publish --access public;)\
	done
link:
	set -eu; for supported_platform in $(supported_platforms); do \
		IFS='-' read -r node_os node_arch <<< "$$supported_platform"; \
		export node_os=$$node_os; \
		export node_arch=$$node_arch; \
		export node_pkg=$(bin)-$$node_os-$$node_arch; \
		(cd $$node_pkg && npm link || echo "cannot link for platform";);\
		npm link $$node_pkg || echo "cannot link for platform";\
	done


vers:
	@echo $(STANDALONE_VERSION)