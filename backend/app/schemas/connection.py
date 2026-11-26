from typing import Optional

from pydantic import BaseModel, ConfigDict


class ConnectionCreate(BaseModel):
    source_id: int
    target_id: int
    description: Optional[str] = None


class ConnectionResponse(ConnectionCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)