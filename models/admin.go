package models

import "golang.org/x/crypto/bcrypt"

type Admin struct {
	Id       uint   `json:"id" gorm:"AUTO_INCREMENT;PRIMARY_KEY;not null"`
	Login    string `json:login`
	Password []byte `json:"-"`
}

func (admin *Admin) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	admin.Password = hashedPassword
}

func (admin *Admin) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(admin.Password, []byte(password))
}