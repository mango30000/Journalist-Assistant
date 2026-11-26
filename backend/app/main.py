from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api import api_router
from app.database import Base, engine
from app.models import models  # noqa: F401  (нужен, чтобы таблицы попали в Base.metadata)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Запуск: создаём таблицы
    Base.metadata.create_all(bind=engine)
    yield
    # Остановка: закрываем соединения с БД
    engine.dispose()


app = FastAPI(title="Journalist Assistant API", lifespan=lifespan)

app.include_router(api_router)


@app.get("/health", tags=["Служебное"])
def health():
    return {"status": "ok"}