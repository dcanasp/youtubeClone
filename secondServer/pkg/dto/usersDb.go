package dto

import (
	"database/sql"
	"log"
)

type UserTable struct {
	IdUser              int
	Username            string
	Email               string
	password            string //No body else will be able to access this password because is in lowercase
	Bio                 sql.NullString
	Profile_picture_url sql.NullString
}

// This doesn't have to be a method, methods are for when you modify something
func (p UserTable) ReturnIds(rows *sql.Rows) ([]int, error) {
	var result []int
	for rows.Next() {
		err := rows.Scan(&p.IdUser, &p.Username, &p.Email, &p.password, &p.Bio, &p.Profile_picture_url)
		if err != nil {
			log.Print(err)
		}
		result = append(result, p.IdUser)
	}

	var err error = nil
	return result, err
}

func (p *UserTable) ReturnAll(rows *sql.Rows) ([]UserTable, error) {
	var result []UserTable
	for rows.Next() {
		err := rows.Scan(&p.IdUser, &p.Username, &p.Email, &p.password, &p.Bio, &p.Profile_picture_url)
		if err != nil {
			log.Print(err)
		}
		result = append(result, *p)
	}
	var err error = nil
	return result, err
}
