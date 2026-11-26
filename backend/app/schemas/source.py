from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models.models import TrustLevel


class SourceCreate(BaseModel):
    name: str = Field(..., min_length=1)
    trust_level: TrustLevel = TrustLevel.UNVERIFIED
    description: Optional[str] = None
    investigation_id: int


class SourceResponse(SourceCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)