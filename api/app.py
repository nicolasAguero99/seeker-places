from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scraping import web_scraping

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allow_headers=["*"],
)

class Location(BaseModel):
  location: str
  placesLength: int

@app.get("/")
async def root():
  return {"message": "Hello World"}

@app.post("/search-places")
async def get_info_place(location: Location):
  return web_scraping(location.location, location.placesLength)