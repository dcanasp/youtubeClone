package services

import (
	"fmt"
	"log"

	myDB "metaData/pkg/db"
	"metaData/pkg/dto"
)

func CheckComments(videoId int) ([]dto.CommentsJoinUser, error) {
	db := myDB.DB

	rows, err := db.Query(`select * from "comments" JOIN users ON "comments".user_id = users.id where video_id = $1`, videoId)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
		var x []dto.CommentsJoinUser
		return x, err
	}
	defer rows.Close()
	var comment dto.CommentsJoinUser
	result, err := comment.JoinedReturnAll(rows)
	if err != nil {
		var x []dto.CommentsJoinUser
		return x, err
	}

	return result, nil
}

func AddComment(userId int, videoId int, content string) error {
	db := myDB.DB

	_, err := db.Query(`insert into COMMENTS (user_id,video_id,content) values($1,$2,$3)`, userId, videoId, content)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
		return err
	}

	return nil
}

func DeleteComment(userId int, commentId int) error {
	db := myDB.DB

	tx, err := db.Begin()
	if err != nil {
		log.Fatalf("Error starting transaction: %v\n", err)
		return err
	}

	// Use the transaction (tx) to execute queries
	FindRows, errFind := tx.Query(`SELECT user_id from comments where id = $1;`, commentId)
	if errFind != nil {
		tx.Rollback() // Rollback in case of error
		fmt.Printf("Error executing query: %v\n", errFind)
		return errFind
	}

	var d int
	if FindRows.Next() {
		err := FindRows.Scan(&d)
		if err != nil {
			tx.Rollback() // Rollback in case of error
			fmt.Printf("Error scanning rows: %v\n", err)
			return err
		}
	} else {
		FindRows.Close()
		if d != userId {
			tx.Rollback() // Rollback as user ID does not match
			return fmt.Errorf("comment Not found")
		}

	}

	FindRows.Close()
	if d != userId {
		tx.Rollback() // Rollback as user ID does not match
		return fmt.Errorf("user ID does not match")
	}

	_, errDelete := tx.Exec(`DELETE FROM COMMENTS WHERE id = $1;`, commentId)
	if errDelete != nil {
		tx.Rollback() // Rollback in case of error
		fmt.Printf("Error executing delete query: %v\n", errDelete)
		return errDelete
	}

	// Commit the transaction if everything is successful
	err = tx.Commit()
	if err != nil {
		fmt.Printf("Error committing transaction: %v\n", err)
		return err
	}
	//db. End transaction

	return nil
}
