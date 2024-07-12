package main

import (
	"github.com/FantomStudy/GoCamp/database"
	"github.com/FantomStudy/GoCamp/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

// Для включения сервера \xampp\xampp_start.exe
// Для выключения сервера \xampp\xampp_stop.exe

func main()  {
	database.Connect()
	err:=godotenv.Load()
	if err != nil{
		log.Fatal("Error loading .env files")
	}
	port:=os.Getenv("PORT")
	app:= fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173", // Разрешенные домены
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS", // Разрешенные методы
		AllowHeaders: "Content-Type, Authorization",}))
	routes.Setup(app)
	app.Listen(":"+port)
}