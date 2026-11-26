from fastapi import APIRouter

from app.routers import connections, events, evidence, investigations, sources

api_router = APIRouter()

api_router.include_router(investigations.router)
api_router.include_router(sources.router)
api_router.include_router(connections.router)
api_router.include_router(events.router)
api_router.include_router(evidence.router)