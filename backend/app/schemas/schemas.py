from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from app.models.models import TrustLevel

class InvestigationCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    status: str = "в процессе"

class InvestigationResponse(InvestigationCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class SourceCreate(BaseModel):
    name: str = Field(..., min_length=1)
    trust_level: TrustLevel = TrustLevel.UNVERIFIED
    description: Optional[str] = None
    investigation_id: int

class SourceResponse(SourceCreate):
    id: int
    class Config:
        from_attributes = True

class ConnectionCreate(BaseModel):
    source_id: int
    target_id: int
    description: Optional[str] = None

class ConnectionResponse(ConnectionCreate):
    id: int
    class Config:
        from_attributes = True

class EventCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    event_date: datetime
    investigation_id: int

class EventResponse(EventCreate):
    id: int
    class Config:
        from_attributes = True

class EvidenceCreate(BaseModel):
    title: str = Field(..., min_length=1)
    item_type: str = Field(..., min_length=1)
    content: Optional[str] = None
    investigation_id: int

class EvidenceResponse(EvidenceCreate):
    id: int
    class Config:
        from_attributes = True
