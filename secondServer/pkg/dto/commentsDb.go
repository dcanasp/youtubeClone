package dto

import (
	"database/sql"
	"log"
)

type CommentsTable struct {
	IdComments int
	UserId     string
	VideoId    string
	Content    string
	Date       sql.NullTime //TODO: it's not that, it's not null
}

type CommentsJoinUser struct {
	CommentsTable
	UserTable
}

// This doesn't have to be a method, methods are for when you modify something
func (p CommentsTable) ReturnIds(rows *sql.Rows) ([]int, error) {
	var result []int
	for rows.Next() {
		err := rows.Scan(&p.IdComments, &p.UserId, &p.VideoId, &p.Content, &p.Date)
		if err != nil {
			log.Print(err)
		}
		result = append(result, p.IdComments)
	}

	var err error = nil
	return result, err
}

func (p *CommentsTable) ReturnAll(rows *sql.Rows) ([]CommentsTable, error) {
	var result []CommentsTable
	for rows.Next() {
		err := rows.Scan(&p.IdComments, &p.UserId, &p.VideoId, &p.Content, &p.Date)
		if err != nil {
			log.Print(err)
		}
		result = append(result, *p)
	}
	var err error = nil
	return result, err
}

func (p *CommentsJoinUser) JoinedReturnAll(rows *sql.Rows) ([]CommentsJoinUser, error) {
	var result []CommentsJoinUser
	for rows.Next() {
		err := rows.Scan(&p.IdComments, &p.UserId, &p.VideoId, &p.Content, &p.Date, &p.IdUser, &p.Username, &p.Email, &p.password, &p.Bio, &p.Profile_picture_url)
		if err != nil {
			log.Print(err)
		}
		result = append(result, *p)

	}
	var err error = nil
	return result, err
}

type CommentResponse struct {
	Success  bool      `json:"success"`
	Comments []Comment `json:"comments"`
}

type Comment struct {
	Id             int    `json:"id"`
	Username       string `json:"username"`
	Date           string `json:"date"` // Assuming date is formatted as a string
	UserProfilePic string `json:"userProfilePic"`
	Content        string `json:"content"`
}
