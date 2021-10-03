package keycloak

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"reflect"
	"testing"
)

func TestKeycloak_ServeClientConfig(t *testing.T) {
	k := &Keycloak{
		Realm:    "web-apps",
		ClientID: "my-web-app",
		URL: &url.URL{
			Host:   "remotehost",
			Scheme: "https",
		},
	}

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "/auth/keycloak.json", nil)

	m := http.NewServeMux()
	m.HandleFunc("/auth/keycloak.json", k.ServeClientConfig)
	m.ServeHTTP(w, r)

	got := &clientConfig{}
	if err := json.NewDecoder(w.Body).Decode(got); err != nil {
		t.Errorf("decoding response body: %v", err)
	}

	want := &clientConfig{
		AuthServerURL: k.URL.String() + "/auth",
		Realm:         k.Realm,
		Resource:      k.ClientID,
	}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("keycloak client config: got %v want %v", got, want)
	}
}
