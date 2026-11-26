from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.event import EventCreate, EventResponse
from app.crud import crud

router = APIRouter(prefix="/events", tags=["Хронология событий"])

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    if not crud.investigation.get(db, data.investigation_id):
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return crud.event.create(db, data)

@router.get("/", response_model=List[EventResponse])
def list_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.event.get_all(db, skip, limit)

@router.get("/investigation/{investigation_id}", response_model=List[EventResponse])
def list_events_by_investigation(investigation_id: int, db: Session = Depends(get_db)):
    return crud.event.get_by_investigation(db, investigation_id)

@router.get("/{event_id}", response_model=EventResponse)
def read_event(event_id: int, db: Session = Depends(get_db)):
    obj = crud.event.get(db, event_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Событие не найдено")
    return obj

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: int, data: EventCreate, db: Session = Depends(get_db)):
    obj = crud.event.update(db, event_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Событие не найдено")
    return obj

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    obj = crud.event.delete(db, event_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Событие не найдено")