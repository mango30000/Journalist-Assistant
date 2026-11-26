from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.evidence import EvidenceCreate, EvidenceResponse
from app.crud import crud

router = APIRouter(prefix="/evidence", tags=["Пакет доказательств"])

@router.post("/", response_model=EvidenceResponse, status_code=status.HTTP_201_CREATED)
def create_evidence(data: EvidenceCreate, db: Session = Depends(get_db)):
    if not crud.investigation.get(db, data.investigation_id):
        raise HTTPException(status_code=404, detail="Расследование не найдено")
    return crud.evidence.create(db, data)

@router.get("/", response_model=List[EvidenceResponse])
def list_evidence(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.evidence.get_all(db, skip, limit)

@router.get("/investigation/{investigation_id}", response_model=List[EvidenceResponse])
def list_evidence_by_investigation(investigation_id: int, db: Session = Depends(get_db)):
    return crud.evidence.get_by_investigation(db, investigation_id)

@router.get("/{evidence_id}", response_model=EvidenceResponse)
def read_evidence(evidence_id: int, db: Session = Depends(get_db)):
    obj = crud.evidence.get(db, evidence_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Доказательство не найдено")
    return obj

@router.put("/{evidence_id}", response_model=EvidenceResponse)
def update_evidence(evidence_id: int, data: EvidenceCreate, db: Session = Depends(get_db)):
    obj = crud.evidence.update(db, evidence_id, data)
    if not obj:
        raise HTTPException(status_code=404, detail="Доказательство не найдено")
    return obj

@router.delete("/{evidence_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_evidence(evidence_id: int, db: Session = Depends(get_db)):
    obj = crud.evidence.delete(db, evidence_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Доказательство не найдено")