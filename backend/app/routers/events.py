from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.schemas import EventCreate, EventResponse
from app.crud import crud

router = APIRouter(prefix="/events", tags=["Хронология событий"])

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    investigation = crud.get_investigation(db, data.investigation_id)
    if not investigation:
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return crud.create_event(db, data)

@router.get("/", response_model=List[EventResponse])
def list_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_events(db, skip, limit)

@router.get("/investigation/{investigation_id}", response_model=List[EventResponse])
def list_events_by_investigation(investigation_id: int, db: Session = Depends(get_db)):
    return crud.get_events_by_investigation(db, investigation_id)

@router.get("/{event_id}", response_model=EventResponse)
def read_event(event_id: int, db: Session = Depends(get_db)):
    obj = crud.get_event(db, event_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Событие не найдено")
    return obj

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: int, data: EventCreate, db: Session = Depends(get_db)):
    obj = crud.update_event(db, event_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Событие не найдено")
    return obj

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    obj = crud.delete_event(db, event_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Событие не найдено")