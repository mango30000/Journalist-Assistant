from typing import Generic, Type, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.models import models
from app import schemas

ModelType = TypeVar("ModelType")
SchemaType = TypeVar("SchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, SchemaType]):
    """Общие операции для любой модели: код пишется один раз."""

    # поле для сортировки по умолчанию (переопределяется в наследниках)
    order_by = None

    def __init__(self, model: Type[ModelType]):
        self.model = model

    def create(self, db: Session, data: SchemaType) -> ModelType:
        obj = self.model(**data.model_dump())
        db.add(obj)
        db.commit()
        db.refresh(obj)  # нужен, чтобы получить id и значения по умолчанию
        return obj

    def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> list[ModelType]:
        query = db.query(self.model)
        if self.order_by is not None:
            query = query.order_by(self.order_by)
        return query.offset(skip).limit(limit).all()

    def get(self, db: Session, id: int) -> ModelType | None:
        return db.query(self.model).filter(self.model.id == id).first()

    def update(self, db: Session, id: int, data: SchemaType) -> ModelType | None:
        obj = self.get(db, id)
        if obj is None:  # нужно, чтобы роутер мог вернуть 404
            return None
        for key, value in data.model_dump().items():
            setattr(obj, key, value)
        db.commit()
        db.refresh(obj)
        return obj

    def delete(self, db: Session, id: int) -> ModelType | None:
        obj = self.get(db, id)
        if obj is None:
            return None
        db.delete(obj)
        db.commit()
        return obj


class CRUDChild(CRUDBase[ModelType, SchemaType]):
    """Для сущностей, привязанных к расследованию (есть investigation_id)."""

    def get_by_investigation(self, db: Session, investigation_id: int) -> list[ModelType]:
        query = db.query(self.model).filter(self.model.investigation_id == investigation_id)
        if self.order_by is not None:
            query = query.order_by(self.order_by)
        return query.all()


class CRUDEvent(CRUDChild[models.Event, schemas.EventCreate]):
    order_by = models.Event.event_date


# Готовые объекты, которые импортируются в роутерах
investigation = CRUDBase[models.Investigation, schemas.InvestigationCreate](models.Investigation)
source = CRUDChild[models.Source, schemas.SourceCreate](models.Source)
connection = CRUDBase[models.Connection, schemas.ConnectionCreate](models.Connection)
event = CRUDEvent(models.Event)
evidence = CRUDChild[models.Evidence, schemas.EvidenceCreate](models.Evidence)

# Использование в роутере:
#   from app import crud
#   crud.source.get(db, 1)
#   crud.event.get_by_investigation(db, investigation_id)