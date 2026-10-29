from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum
from datetime import datetime

class TrustLevel(str, enum.Enum):
    HIGH = "высокий"
    MEDIUM = "средний"
    LOW = "низкий"
    UNVERIFIED = "непроверенный"

class Investigation(Base):
    __tablename__ = "investigations"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="в процессе")
    created_at = Column(DateTime, default=datetime.utcnow)

    sources = relationship("Source", back_populates="investigation", cascade="all, delete-orphan")
    events = relationship("Event", back_populates="investigation", cascade="all, delete-orphan")
    evidence = relationship("Evidence", back_populates="investigation", cascade="all, delete-orphan")

class Source(Base):
    __tablename__ = "sources"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    trust_level = Column(Enum(TrustLevel), default=TrustLevel.UNVERIFIED)
    description = Column(Text)
    investigation_id = Column(Integer, ForeignKey("investigations.id"))

    investigation = relationship("Investigation", back_populates="sources")
    connections_from = relationship("Connection", foreign_keys="Connection.source_id", back_populates="source")
    connections_to = relationship("Connection", foreign_keys="Connection.target_id", back_populates="target")

class Connection(Base):
    __tablename__ = "connections"
    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("sources.id"))
    target_id = Column(Integer, ForeignKey("sources.id"))
    description = Column(Text)

    source = relationship("Source", foreign_keys=[source_id], back_populates="connections_from")
    target = relationship("Source", foreign_keys=[target_id], back_populates="connections_to")

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    event_date = Column(DateTime, nullable=False)
    investigation_id = Column(Integer, ForeignKey("investigations.id"))

    investigation = relationship("Investigation", back_populates="events")

class Evidence(Base):
    __tablename__ = "evidence"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    document_type = Column(String)
    content = Column(Text)
    investigation_id = Column(Integer, ForeignKey("investigations.id"))

    investigation = relationship("Investigation", back_populates="evidence")