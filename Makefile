.PHONY: run
run:
	@if [ ! -d ./cmd/public ]; then make frontend; fi
	@go run .

.PHONY: frontend
frontend:
	@cd frontend && npm run build && cp -r build ../cmd/public
