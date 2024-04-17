export interface Location {
  place_id:     number
  licence:      string
  osm_type:     string
  osm_id:       number
  lat:          string
  lon:          string
  class:        string
  type:         string
  place_rank:   number
  importance:   number
  addresstype:  string
  name:         string
  display_name: string
  boundingbox:  string[]
}

export interface Place {
  name:         string
  address:      string
  phone:        string
  rate:         string
  features:     string
  price_range:  string
  link:         string
  photo:        string
}
