package services

import (
	"log"

	myDB "metaData/pkg/db"
)

func AddSubscriber(userId int, chanelId int) error {
	db := myDB.DB

	_, err := db.Query(`insert into subscriptions (subscriber_id,channel_id) values ($1,$2);`, userId, chanelId)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
		return err
	}

	return nil
}

func DeleteSubscriber(userId int, chanelId int) error {
	db := myDB.DB

	_, err := db.Query(`delete from subscriptions where subscriber_id = $1 and channel_id = $2;`, userId, chanelId)
	if err != nil {
		log.Fatalf("Error executing query: %v\n", err)
		return err
	}
	return nil
}
