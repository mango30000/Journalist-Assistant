from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.schemas import EvidenceCreate, EvidenceResponse
from app.crud import crud

router = APIRouter(prefix="/evidence", tags=["Пакет доказательств"])

@router.post("/", response_model=EvidenceResponse, status_code=status.HTTP_201_CREATED)
def create_evidence(data: EvidenceCreate, db: Session = Depends(get_db)):
    investigation = crud.get_investigation(db, data.investigation_id)
    if not investigation:
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return crud.create_evidence(db, data)

@router.get("/", response_model=List[EvidenceResponse])
def list_evidence(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_evidence_list(db, skip, limit)

@router.get("/investigation/{investigation_id}", response_model=List[EvidenceResponse])
def list_evidence_by_investigation(investigation_id: int, db: Session = Depends(get_db)):
    return crud.get_evidence_by_investigation(db, investigation_id)

@router.get("/{evidence_id}", response_model=EvidenceResponse)
def read_evidence(evidence_id: int, db: Session = Depends(get_db)):
    obj = crud.get_evidence(db, evidence_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Доказательство не найдено")
    return obj

@router.put("/{evidence_id}", response_model=EvidenceResponse)
def update_evidence(evidence_id: int, data: EvidenceCreate, db: Session = Depends(get_db)):
    obj = crud.update_evidence(db, evidence_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Доказательство не найдено")
    return obj

@router.delete("/{evidence_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_evidence(evidence_id: int, db: Session = Depends(get_db)):
    obj = crud.delete_evidence(db, evidence_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Доказательство не найдено")