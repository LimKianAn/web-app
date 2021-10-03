package keycloak

import (
	"encoding/json"
	"net/http"
	"net/url"
)

type Keycloak struct {
	AllowedRoles []string
	ClientID     string
	ClientSecret string
	Realm        string
	URL          *url.URL
}

func (k *Keycloak) ServeClientConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	cfg := &clientConfig{
		AuthServerURL: k.URL.Scheme + "://" + k.URL.Host + "/auth",
		Realm:         k.Realm,
		Resource:      k.ClientID,
	}
	json.NewEncoder(w).Encode(cfg)
}

type clientConfig struct {
	AuthServerURL string `json:"auth-server-url"`
	Realm         string `json:"realm"`
	Resource      string `json:"resource"`
}
