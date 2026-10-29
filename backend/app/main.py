from fastapi import FastAPI
from app.database import engine, Base
from app.routers import investigations, sources, connections, events, evidence

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Journalist Assistant API")

app.include_router(investigations.router)
app.include_router(sources.router)
app.include_router(connections.router)
app.include_router(events.router)
app.include_router(evidence.router)

@app.get("/")
def root():
    return {"message": "Journalist Assistant API"}