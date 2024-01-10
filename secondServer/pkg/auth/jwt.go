package auth

import (
	"fmt"
	"os"
	"strings"

	"github.com/golang-jwt/jwt"
)

type CustomClaims struct {
	Payload struct {
		Username string `json:"username"`
		UserId   int    `json:"userId"`
	} `json:"payload"`
	jwt.StandardClaims
}

func ValidateJWT(tokenString string) (CustomClaims, error) {
	var claims CustomClaims
	// Remove the Bearer prefix, if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	// Parse and validate the token
	token, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWTsecret")), nil
	})

	if err != nil {
		return claims, fmt.Errorf("invalid token: %w", err)
	}

	if !token.Valid {
		return claims, fmt.Errorf("invalid token")
	}

	return claims, nil
}
