from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class EvidenceCreate(BaseModel):
    title: str = Field(..., min_length=1)
    document_type: str = Field(..., min_length=1)
    content: Optional[str] = None
    investigation_id: int


class EvidenceResponse(EvidenceCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)