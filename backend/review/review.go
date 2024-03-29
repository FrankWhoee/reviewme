package review

import (
	"regexp"
	"time"

	"github.com/mitchellh/mapstructure"
)

type Review struct {
	Email  string
	Title  string
	Text   string
	Rating int
	Timestamp time.Time
}

func (r Review) Map() *map[string]interface{} {
	var reviewMap *map[string]interface{} = new(map[string]interface{})

	mapstructure.Decode(r, &reviewMap)
	return reviewMap
}

func FromMap(m map[string]interface{}) *Review {
	var review *Review = new(Review)
	mapstructure.Decode(m,review)
	return review
}

func (r Review) IsValid() (bool,string) {

	if r.Rating < 0 || r.Rating > 5 {
		return false, "Rating"
	}
	
	var validEmail = regexp.MustCompile(`[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+`)
	if !validEmail.MatchString(r.Email) {
		return false, "Email"
	}

	return true, ""
}


