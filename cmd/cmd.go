package cmd

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/LimKianAn/web-app/pkg/keycloak"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

type Cmd struct {
	apiBaseURL      *url.URL
	keycloak        *keycloak.Keycloak
	upstreamAPIHost string
	cobra.Command
}

// NewCmd creates a new Cmd
func NewCmd() *Cmd {
	c := &Cmd{
		apiBaseURL: &url.URL{},
		keycloak:   &keycloak.Keycloak{URL: &url.URL{Scheme: "https"}},
	}
	c.Command = cobra.Command{Run: c.run}
	c.DefineFlags(c.Command.Flags())
	return c
}

func (c *Cmd) DefineFlags(f *pflag.FlagSet) {
	// api related
	f.StringVar(&c.apiBaseURL.Host, "host", "localhost:8765", "URL host of the web app")
	f.StringVar(&c.apiBaseURL.Scheme, "scheme", "http", "URL scheme of the web app")
	f.StringVar(&c.upstreamAPIHost, "billing-api-host", "localhost:8080", "host of upstream billing API")

	// keycloak related
	f.StringVar(&c.keycloak.URL.Host, "keycloak-url-host", "", "keycloak URL host")
	f.StringVar(&c.keycloak.Realm, "keycloak-client-realm", "", "keycloak client realm")
	f.StringVar(&c.keycloak.ClientID, "keycloak-client-id", "", "keycloak client ID")
	f.StringVar(&c.keycloak.ClientSecret, "keycloak-client-secret", "", "keycloak client secret")
	f.StringSliceVar(&c.keycloak.AllowedRoles, "allowed-user-role", []string{"FtFg_Srv_App-BillingPortal-Read_Mod", "FtFg_Srv_App-BillingPortal-Admin_Mod"}, "allowed OIDC user-roles to view GUI")

	if err := viper.BindPFlags(f); err != nil {
		log.Fatal(fmt.Errorf("binding flags: %v", err))
	}
}

func (c *Cmd) run(cmd *cobra.Command, args []string) {
	c.checkRequiredConfig()

	c.keycloak.URL.Path = "auth/realms/" + c.keycloak.Realm

	root, err := fs.Sub(embeddedFS, "public")
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/", http.FileServer(http.FS(root)))
	http.HandleFunc("/auth/keycloak.json", c.keycloak.ServeClientConfig)

	c.initRESTServices()

	log.Fatal(http.ListenAndServe(c.apiBaseURL.Host, nil))
}

func (c *Cmd) checkRequiredConfig() {
	viper.SetEnvKeyReplacer(strings.NewReplacer("-", "_"))
	viper.AutomaticEnv()

	if c.keycloak.URL.Host == "" {
		c.keycloak.URL.Host = mustGetString("keycloak-url-host")
	}
	if c.keycloak.Realm == "" {
		c.keycloak.Realm = mustGetString("keycloak-client-realm")
	}
	if c.keycloak.ClientID == "" {
		c.keycloak.ClientID = mustGetString("keycloak-client-id")
	}
	if c.keycloak.ClientSecret == "" {
		c.keycloak.ClientSecret = mustGetString("keycloak-client-secret")
	}
}

func (c *Cmd) initRESTServices() {
	// new billing API client
	// cl := client.New(openAPIClient.New(c.billingAPIHost, "", nil), strfmt.Default)

	// auth, err := middleware.NewAuth(c.issuerURL.String(), c.clientID, c.allowedUserRoles)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// rest := restful.DefaultContainer
	// rest.Add(service.NewInvoiceService(cl.Billing, auth))
	// rest.Add(service.NewHealthService())
}

//go:embed public
var embeddedFS embed.FS

func mustGetString(key string) string {
	if !viper.IsSet(key) {
		log.Fatalf("flag/env %s not set", key)
	}
	return viper.GetString(key)
}
