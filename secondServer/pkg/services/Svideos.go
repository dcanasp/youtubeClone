package services

import (
	"log"

	myDB "metaData/pkg/db"
	"metaData/pkg/dto"
)

func Stream(uuid string) (dto.VideosTable, error) {
	db := myDB.DB

	rows, err := db.Query(`select * from videos where uuid = $1;`, uuid)

	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
		var x dto.VideosTable
		return x, err
	}
	defer rows.Close()
	var video dto.VideosTable
	result, err := video.ReturnAll(rows)
	if err != nil {
		var x dto.VideosTable
		return x, err
	}

	return result, nil

}
