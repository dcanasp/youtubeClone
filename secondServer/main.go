package main

import (
	"log"
	"metaData/pkg/db"
	"metaData/pkg/routes"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	setENV()
	//instance db
	err := db.InitDB()
	if err != nil {
		log.Fatalf("Failed to initialize the database: %v", err)
	}
	//instance webservice
	r := mux.NewRouter()
	r.Use(mux.CORSMethodMiddleware(r))

	s := r.PathPrefix("/likes").Subrouter()
	k := r.PathPrefix("/comments").Subrouter()
	l := r.PathPrefix("/subscriptions").Subrouter()
	m := r.PathPrefix("/videos").Subrouter()
	// "/products/"
	// s.HandleFunc("/", )
	routes.Likes(s)
	routes.Comments(k)
	routes.Subscriptions(l)
	routes.Videos(m)

	http.ListenAndServe(":80", r)
}
