from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models.models import InvestigationStatus


class InvestigationCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    status: InvestigationStatus = InvestigationStatus.IN_PROGRESS


class InvestigationResponse(InvestigationCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)