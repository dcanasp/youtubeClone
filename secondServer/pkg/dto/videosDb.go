package dto

import (
	"database/sql"
	"log"
	"time"
)

type ProcessingStatusType string

const (
	Pending    ProcessingStatusType = "pending"
	Processing ProcessingStatusType = "processing"
	Completed  ProcessingStatusType = "completed"
	null       ProcessingStatusType = "null"
)

type VideosTable struct {
	Id               int
	UserId           string
	title            string
	Description      string
	Tags             string
	Views            int
	UploadDate       time.Time //timestamptz
	ProcessingStatus ProcessingStatusType
	FileUrl          string
	ThumbnailUrl     string
	Uuid             string
}

// This doesn't have to be a method, methods are for when you modify something
func (p VideosTable) ReturnIds(rows *sql.Rows) ([]int, error) {
	var result []int
	for rows.Next() {
		err := rows.Scan(&p.Id, &p.UserId, &p.title, &p.Description, &p.Tags, &p.Views, &p.UploadDate, &p.ProcessingStatus, &p.FileUrl, &p.ThumbnailUrl, &p.Uuid)
		if err != nil {
			log.Print(err)
		}
		result = append(result, p.Id)
	}

	var err error = nil
	return result, err
}

func (p VideosTable) ReturnAll(rows *sql.Rows) (VideosTable, error) {

	for rows.Next() {
		err := rows.Scan(&p.Id, &p.UserId, &p.title, &p.Description, &p.Tags, &p.Views, &p.UploadDate, &p.ProcessingStatus, &p.FileUrl, &p.ThumbnailUrl, &p.Uuid)
		if err != nil {
			log.Print(err)
		}
	}
	var err error = nil
	return p, err
}
