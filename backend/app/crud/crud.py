from sqlalchemy.orm import Session
from app.models.models import Investigation, Source, Connection, Event, Evidence
from app.schemas.schemas import (
    InvestigationCreate, SourceCreate, ConnectionCreate, EventCreate, EvidenceCreate
)

def create_investigation(db: Session, data: InvestigationCreate):
    obj = Investigation(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_investigations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Investigation).offset(skip).limit(limit).all()

def get_investigation(db: Session, id: int):
    return db.query(Investigation).filter(Investigation.id == id).first()

def update_investigation(db: Session, id: int, data: InvestigationCreate):
    obj = db.query(Investigation).filter(Investigation.id == id).first()
    if not obj:
        return None
    for k, v in data.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

def delete_investigation(db: Session, id: int):
    obj = db.query(Investigation).filter(Investigation.id == id).first()
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj

def create_source(db: Session, data: SourceCreate):
    obj = Source(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_sources(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Source).offset(skip).limit(limit).all()

def get_source(db: Session, id: int):
    return db.query(Source).filter(Source.id == id).first()

def get_sources_by_investigation(db: Session, investigation_id: int):
    return db.query(Source).filter(Source.investigation_id == investigation_id).all()

def update_source(db: Session, id: int, data: SourceCreate):
    obj = db.query(Source).filter(Source.id == id).first()
    if not obj:
        return None
    for k, v in data.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

def delete_source(db: Session, id: int):
    obj = db.query(Source).filter(Source.id == id).first()
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj

def create_connection(db: Session, data: ConnectionCreate):
    obj = Connection(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_connections(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Connection).offset(skip).limit(limit).all()

def get_connection(db: Session, id: int):
    return db.query(Connection).filter(Connection.id == id).first()

def update_connection(db: Session, id: int, data: ConnectionCreate):
    obj = db.query(Connection).filter(Connection.id == id).first()
    if not obj:
        return None
    for k, v in data.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

def delete_connection(db: Session, id: int):
    obj = db.query(Connection).filter(Connection.id == id).first()
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj

def create_event(db: Session, data: EventCreate):
    obj = Event(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Event).order_by(Event.event_date).offset(skip).limit(limit).all()

def get_event(db: Session, id: int):
    return db.query(Event).filter(Event.id == id).first()

def get_events_by_investigation(db: Session, investigation_id: int):
    return db.query(Event).filter(Event.investigation_id == investigation_id).order_by(Event.event_date).all()

def update_event(db: Session, id: int, data: EventCreate):
    obj = db.query(Event).filter(Event.id == id).first()
    if not obj:
        return None
    for k, v in data.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

def delete_event(db: Session, id: int):
    obj = db.query(Event).filter(Event.id == id).first()
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj

def create_evidence(db: Session, data: EvidenceCreate):
    obj = Evidence(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def get_evidence_list(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Evidence).offset(skip).limit(limit).all()

def get_evidence(db: Session, id: int):
    return db.query(Evidence).filter(Evidence.id == id).first()

def get_evidence_by_investigation(db: Session, investigation_id: int):
    return db.query(Evidence).filter(Evidence.investigation_id == investigation_id).all()

def update_evidence(db: Session, id: int, data: EvidenceCreate):
    obj = db.query(Evidence).filter(Evidence.id == id).first()
    if not obj:
        return None
    for k, v in data.model_dump().items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

def delete_evidence(db: Session, id: int):
    obj = db.query(Evidence).filter(Evidence.id == id).first()
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj