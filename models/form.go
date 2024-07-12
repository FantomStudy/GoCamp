package models

type Form struct {
	Id          uint   `json:"id" gorm:"AUTO_INCREMENT;PRIMARY_KEY;not null"`
	FirstName   string `json:firstName`
	LastName    string `json:lastName`
	DateOfBirth string `json:dateOfBirth`
	Phone       string `json:"phone"`
	Email       string `json:email`
}