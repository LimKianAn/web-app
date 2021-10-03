package main

import (
	"log"

	"github.com/LimKianAn/web-app/cmd"
)

func main() {
	log.Fatal(cmd.NewCmd().Execute())
}
