package dto

import (
	"database/sql"
	"log"
)

type LikeDislikeType string

const (
	Like    LikeDislikeType = "like"
	Dislike LikeDislikeType = "dislike"
)

// LikesTable represents a row in the likes table.
type LikesTable struct {
	Id      int
	UserId  string
	VideoId string
	Type    LikeDislikeType
}

// This doesn't have to be a method, methods are for when you modify something
func (p LikesTable) ReturnIds(rows *sql.Rows) ([]int, error) {
	var result []int
	for rows.Next() {
		err := rows.Scan(&p.Id, &p.UserId, &p.VideoId, &p.Type)
		if err != nil {
			log.Print(err)
		}
		result = append(result, p.Id)
	}

	var err error = nil
	return result, err
}

func (p *LikesTable) ReturnAll(rows *sql.Rows) ([]LikesTable, error) {
	var result []LikesTable
	for rows.Next() {
		err := rows.Scan(&p.Id, &p.UserId, &p.VideoId, &p.Type)
		if err != nil {
			log.Print(err)
		}
		result = append(result, *p)
	}
	var err error = nil
	return result, err
}
