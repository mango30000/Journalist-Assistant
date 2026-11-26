from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.connection import ConnectionCreate, ConnectionResponse
from app.crud import crud

router = APIRouter(prefix="/connections", tags=["Карта связей"])

@router.post("/", response_model=ConnectionResponse, status_code=status.HTTP_201_CREATED)
def create_connection(data: ConnectionCreate, db: Session = Depends(get_db)):
    # Сначала дешёвая проверка, не требующая запросов к БД
    if data.source_id == data.target_id:
        raise HTTPException(status_code=400, detail="Нельзя связать источник сам с собой")
    # Проверка, что оба источника существуют
    if not crud.source.get(db, data.source_id):
        raise HTTPException(status_code=404, detail="Исходный источник не найден")
    if not crud.source.get(db, data.target_id):
        raise HTTPException(status_code=404, detail="Целевой источник не найден")
    return crud.connection.create(db, data)

@router.get("/", response_model=List[ConnectionResponse])
def list_connections(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return crud.connection.get_all(db, skip, limit)

@router.get("/{connection_id}", response_model=ConnectionResponse)
def read_connection(connection_id: int, db: Session = Depends(get_db)):
    obj = crud.connection.get(db, connection_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Связь не найдена")
    return obj

@router.put("/{connection_id}", response_model=ConnectionResponse)
def update_connection(connection_id: int, data: ConnectionCreate, db: Session = Depends(get_db)):
    obj = crud.connection.update(db, connection_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Связь не найдена")
    return obj

@router.delete("/{connection_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_connection(connection_id: int, db: Session = Depends(get_db)):
    obj = crud.connection.delete(db, connection_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Связь не найдена")