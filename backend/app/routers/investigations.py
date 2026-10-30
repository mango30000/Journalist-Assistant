from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import InvestigationCreate, InvestigationResponse
from app.crud.crud import (
    create_investigation, get_investigations,
    get_investigation, update_investigation, delete_investigation
)

router = APIRouter(prefix="/investigations", tags=["Расследуемые дела"])

@router.post("/", response_model=InvestigationResponse, status_code=status.HTTP_201_CREATED)
def create(data: InvestigationCreate, db: Session = Depends(get_db)):
    return create_investigation(db, data)

@router.get("/", response_model=list[InvestigationResponse])
def list_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_investigations(db, skip, limit)

@router.get("/{id}", response_model=InvestigationResponse)
def read(id: int, db: Session = Depends(get_db)):
    obj = get_investigation(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return obj

@router.put("/{id}", response_model=InvestigationResponse)
def update(id: int, data: InvestigationCreate, db: Session = Depends(get_db)):
    obj = update_investigation(db, id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return obj

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(id: int, db: Session = Depends(get_db)):
    obj = delete_investigation(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Расследование не найдено")