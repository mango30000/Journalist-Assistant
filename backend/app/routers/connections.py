from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.schemas import ConnectionCreate, ConnectionResponse
from app.crud import crud

router = APIRouter(prefix="/connections", tags=["Карта связей"])

@router.post("/", response_model=ConnectionResponse, status_code=status.HTTP_201_CREATED)
def create_connection(data: ConnectionCreate, db: Session = Depends(get_db)):
    # Проверка оба источника есть
    source = crud.get_source(db, data.source_id)
    target = crud.get_source(db, data.target_id)
    if not source:
        raise HTTPException(status_code=404, detail="Исходный источник не найден")
    if not target:
        raise HTTPException(status_code=404, detail="Целевой источник не найден")
    if data.source_id == data.target_id:
        raise HTTPException(status_code=400, detail="Нельзя связать источник сам с собой")
    return crud.create_connection(db, data)

@router.get("/", response_model=List[ConnectionResponse])
def list_connections(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return crud.get_connections(db, skip, limit)

@router.get("/{connection_id}", response_model=ConnectionResponse)
def read_connection(connection_id: int, db: Session = Depends(get_db)):
    obj = crud.get_connection(db, connection_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Связь не найдена")
    return obj

@router.put("/{connection_id}", response_model=ConnectionResponse)
def update_connection(connection_id: int, data: ConnectionCreate, db: Session = Depends(get_db)):
    obj = crud.update_connection(db, connection_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Связь не найдена")
    return obj

@router.delete("/{connection_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_connection(connection_id: int, db: Session = Depends(get_db)):
    obj = crud.delete_connection(db, connection_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Связь не найдена")

