from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.schemas import SourceCreate, SourceResponse
from app.crud import crud

router = APIRouter(prefix="/sources", tags=["Источники"])

@router.post("/", response_model=SourceResponse, status_code=status.HTTP_201_CREATED)
def create_source(data: SourceCreate, db: Session = Depends(get_db)):
    investigation = crud.get_investigation(db, data.investigation_id)
    if not investigation:
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return crud.create_source(db, data)

@router.get("/", response_model=List[SourceResponse])
def list_sources(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_sources(db, skip, limit)

@router.get("/investigation/{investigation_id}", response_model=List[SourceResponse])
def list_sources_by_investigation(investigation_id: int, db: Session = Depends(get_db)):
    return crud.get_sources_by_investigation(db, investigation_id)

@router.get("/{source_id}", response_model=SourceResponse)
def read_source(source_id: int, db: Session = Depends(get_db)):
    obj = crud.get_source(db, source_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Источник не найден")
    return obj

@router.put("/{source_id}", response_model=SourceResponse)
def update_source(source_id: int, data: SourceCreate, db: Session = Depends(get_db)):
    obj = crud.update_source(db, source_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Источник не найден")
    return obj

@router.delete("/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_source(source_id: int, db: Session = Depends(get_db)):
    obj = crud.delete_source(db, source_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Источник не найден")