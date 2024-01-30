package routes

import (
	"fmt"
	"net/http"
	"strconv"

	"metaData/pkg/auth"
	"metaData/pkg/services"

	"github.com/gorilla/mux"
)

func Videos(r *mux.Router) {

	r.HandleFunc("/stream/{uuid}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		w.Header().Set("Content-Type", "application/json")

		var uuid string = vars["uuid"]

		videoInformation, serviceError := services.Stream(uuid)
		if serviceError != nil {
			w.WriteHeader(http.StatusNotImplemented)
			fmt.Fprintf(w, `{"success":false, "err": %v}`, serviceError)
			return
		}
		w.WriteHeader(http.StatusOK)
		fmt.Printf("video information: %v", videoInformation)

		fmt.Fprintf(w, `{"success":true}`)

	}).Methods("GET")

	r.HandleFunc("/{id:[0-9]+}/subscribe", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "not allowed string for deleting comments}`)

			return
		}

		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			http.Error(w, `{"success": false, "err": "Missing Authorization Header"}`, http.StatusUnauthorized)
			return
		}

		tokenPayload, err2 := auth.ValidateJWT(tokenString)
		if err2 != nil {
			http.Error(w, fmt.Sprintf(`{"success": false, "err": "%v"}`, err2), http.StatusUnauthorized)
			return
		}

		serviceError := services.DeleteSubscriber(tokenPayload.Payload.UserId, id)
		if serviceError != nil {
			w.WriteHeader(http.StatusNotImplemented)
			fmt.Fprintf(w, `{"success":false, "err": %v}`, serviceError)
			return
		}
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"success":true}`)

	}).Methods("DELETE")

	r.HandleFunc("/loadBalancer", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		w.WriteHeader(http.StatusOK)

		fmt.Fprintf(w, `{"success":"STREAMING FROM GO!!"}`)

	}).Methods("GET")
}
