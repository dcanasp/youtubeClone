package routes

import (
	"fmt"
	"net/http"
	"strconv"

	"metaData/pkg/dto"
	"metaData/pkg/services"

	"github.com/gorilla/mux"
)

func Likes(r *mux.Router) {
	r.HandleFunc("/{id:[0-9]+}/like/", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "not allowed string for likes}`)

			return
		}
		likeCount, err := services.CheckLike(id)
		dislikeCount, err := services.CheckDislike(id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "No video found}`)
			return
		}

		fmt.Fprintf(w, `{"success": %t , "likes": %d , "dislikes": %d}`, true, likeCount, dislikeCount)
	}).Methods("GET")

	//todo: jwt on go
	//TODO: how to set a custom body on a post
	r.HandleFunc("/{id:[0-9]+}/like/", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "not allowed string for likes}`)

			return
		}

		result := services.AddLike(1, id, dto.Like)

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"success":true,"value": %d }`, result)

	}).Methods("POST")

	r.HandleFunc("/{id:[0-9]+}/dislike/", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, `{"success" : false,"err" : "not allowed string for dislikes}`)

			return
		}

		result := services.AddLike(1, id, dto.Dislike)
		if result != nil {
			fmt.Fprintf(w, `{"success":false,"value": %v }`, result)
			return
		}
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"success":true}`)

	}).Methods("POST")
}
