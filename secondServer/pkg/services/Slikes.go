package services

import (
	"fmt"
	"log"

	myDB "metaData/pkg/db"
	"metaData/pkg/dto"
)

func AddLike(userId int, id int, likeDislike dto.LikeDislikeType) error {
	db := myDB.DB

	rows, err := db.Query(`insert into likesdislikes (user_id,video_id,"type") values ($1,$2,$3)`, userId, id, likeDislike)
	fmt.Print(*&err)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
		return err
	}
	defer rows.Close()

	return nil
}
func CheckDislike(id int) (int, error) {
	db := myDB.DB

	rows, err := db.Query(`select count(*) from likesdislikes where video_id = $1 and "type"=$2`, id, dto.Dislike)
	fmt.Print(*&err)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
	}
	defer rows.Close()
	var d int
	rows.Next()
	rows.Scan(&d)
	return d, nil
}
func CheckLike(id int) (int, error) {
	db := myDB.DB

	// rows, err := db.Query("SELECT * FROM users")
	rows, err := db.Query(`select count(*) from likesdislikes where video_id = $1 and "type"=$2`, id, dto.Like)
	fmt.Print(*&err)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
	}
	defer rows.Close()
	var d int
	rows.Next()
	rows.Scan(&d)

	// var like dto.LikesTable
	// result, err := like.ReturnIds(rows)
	fmt.Println(d)
	// var user dto.UserTable
	// ids, err := user.ReturnAll(rows)
	// if err != nil {
	// 	log.Fatal(err)
	// 	return 0, err
	// }

	// fmt.Print(ids[0].Email)
	// var nonGmailUserIDs []int
	// for _, user := range ids {
	// 	if !strings.HasSuffix(user.Email, "example.com") {
	// 		nonGmailUserIDs = append(nonGmailUserIDs, user.Id)
	// 	}
	// }

	// fmt.Print(nonGmailUserIDs)

	return d, nil
}
