package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"metaData/pkg/auth"
	"metaData/pkg/dto"
	"metaData/pkg/services"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func Comments(r *mux.Router) {
	r.HandleFunc("/{id:[0-9]+}/comments/", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		videoId, err := strconv.Atoi(vars["id"])
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "not allowed string for comments}`)

			return
		}
		comments, err := services.CheckComments(videoId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "No video found}`)
			return
		}

		var responseComments []dto.Comment
		for _, c := range comments {
			responseComments = append(responseComments, dto.Comment{
				Id:             c.IdComments,
				Username:       c.Username,
				Date:           c.Date.Time.Format("2006-01-02"), // Format date as needed
				UserProfilePic: c.Profile_picture_url.String,
				Content:        c.Content,
			})
		}

		response := dto.CommentResponse{
			Success:  true,
			Comments: responseComments,
		}

		w.Header().Set("Content-Type", "application/json")
		prettyResult := json.NewEncoder(w)
		errJson := prettyResult.Encode(response)
		if errJson != nil {
			log.Printf("failed json")
		}

	}).Methods("GET")

	//todo: jwt on go
	//TODO: how to set a custom body on a post
	type requestBody struct {
		Content string `json:"content"`
	}
	r.HandleFunc("/{id:[0-9]+}/comments/", func(w http.ResponseWriter, r *http.Request) {
		var body requestBody
		errBody := json.NewDecoder(r.Body).Decode(&body)
		if errBody != nil {
			http.Error(w, `{"success": false, "error": "Invalid request body"}`, http.StatusBadRequest)
			return
		}
		vars := mux.Vars(r)
		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "not allowed string for likes}`)

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

		serviceError := services.AddComment(tokenPayload.Payload.UserId, id, body.Content)
		if serviceError != nil {
			w.WriteHeader(http.StatusNotImplemented)
			fmt.Fprintf(w, `{"success":false, "err": %v}`, serviceError)
			return
		}
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"success":true}`)

	}).Methods("POST")

	r.HandleFunc("/{id:[0-9]+}/comments/", func(w http.ResponseWriter, r *http.Request) {
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

		serviceError := services.DeleteComment(tokenPayload.Payload.UserId, id)
		if serviceError != nil {
			w.WriteHeader(http.StatusNotImplemented)
			fmt.Fprintf(w, `{"success":false, "err": %v}`, serviceError)
			return
		}
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"success":true}`)

	}).Methods("DELETE")
}
