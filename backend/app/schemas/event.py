from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class EventCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    event_date: datetime
    investigation_id: int


class EventResponse(EventCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)